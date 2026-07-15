import express from 'express';
import { XMLParser } from 'fast-xml-parser';

const app = express();
const parser = new XMLParser({ ignoreAttributes: false });
const port = process.env.PORT || 3001;
const feedUrl = 'https://news.google.com/rss/search?q=futebol+brasileiro&hl=pt-BR&gl=BR&ceid=BR:pt-419';
let cache = { expires: 0, items: [] };
const standingsSources = {
  serieA: { name: 'Brasileirão Série A', league: 71 }, serieB: { name: 'Brasileirão Série B', league: 72 },
  serieC: { name: 'Brasileirão Série C', league: 75 }, serieD: { name: 'Brasileirão Série D', league: 76 },
  premier: { name: 'Premier League', league: 39 }, laliga: { name: 'LaLiga', league: 140 },
  serieAIt: { name: 'Serie A', league: 135 }, bundesliga: { name: 'Bundesliga', league: 78 }, ligue1: { name: 'Ligue 1', league: 61 },
};
const standingsCache = new Map();

app.get('/api/news', async (_request, response) => {
  try {
    if (Date.now() < cache.expires && cache.items.length) return response.json({ items: cache.items, cached: true });
    const result = await fetch(feedUrl, { headers: { 'User-Agent': 'Futebol360/1.0' }, signal: AbortSignal.timeout(8000) });
    if (!result.ok) throw new Error(`Fonte respondeu com status ${result.status}`);
    const parsed = parser.parse(await result.text());
    const rawItems = parsed?.rss?.channel?.item ?? [];
    const items = rawItems.slice(0, 12).map((item, index) => ({
      id: item.guid?.['#text'] || item.link,
      title: item.title?.replace(/\s+-\s+[^-]+$/, '') || 'Notícia de futebol',
      source: item.source?.['#text'] || 'Google Notícias',
      url: item.link,
      publishedAt: item.pubDate,
      category: index % 3 === 1 ? 'internacional' : 'nacional',
    }));
    cache = { items, expires: Date.now() + 5 * 60 * 1000 };
    response.json({ items, cached: false });
  } catch (error) {
    response.status(503).json({ items: cache.items, error: 'Fonte de notícias temporariamente indisponível.' });
  }
});

app.get('/api/standings', async (request, response) => {
  const source = standingsSources[request.query.league] || standingsSources.serieA;
  const cached = standingsCache.get(request.query.league || 'serieA');
  if (cached && cached.expires > Date.now()) return response.json(cached.data);
  try {
    if (!process.env.FOOTBALL_API_KEY) return response.status(503).json({ league: source.name, rows: [], error: 'Configure FOOTBALL_API_KEY para dados oficiais.' });
    const season = process.env.FOOTBALL_SEASON || new Date().getFullYear();
    const result = await fetch(`https://v3.football.api-sports.io/standings?league=${source.league}&season=${season}`, { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY }, signal: AbortSignal.timeout(8000) });
    if (!result.ok) throw new Error(`Fonte respondeu com status ${result.status}`);
    const payload = await result.json();
    const entries = payload?.response?.[0]?.league?.standings?.[0] || [];
    const rows = entries.map((entry, index) => {
      return { position: entry.rank || index + 1, team: entry.team?.name || 'Clube', logo: entry.team?.logo, points: entry.points ?? 0, games: entry.all?.played ?? 0, balance: entry.goalsDiff ?? 0, wins: entry.all?.win ?? 0, draws: entry.all?.draw ?? 0, losses: entry.all?.lose ?? 0 };
    });
    const data = { league: source.name, updatedAt: new Date().toISOString(), rows };
    standingsCache.set(request.query.league || 'serieA', { expires: Date.now() + 10 * 60 * 1000, data });
    response.json(data);
  } catch (error) {
    response.status(503).json({ league: source.name, rows: [], error: `Não foi possível consultar a API-Football: ${error.message}` });
  }
});

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
const server = app.listen(port, '127.0.0.1', () => console.log(`API Futebol 360 em http://127.0.0.1:${port}`));
server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${port} já está em uso. Feche outra execução do projeto e tente npm run dev novamente.`);
    process.exit(1);
  }
  throw error;
});
