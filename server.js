<<<<<<< HEAD
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
=======
>>>>>>> 6759e5a3b982e3b136a0d577f9682596deb0ad72
import express from 'express';
import { XMLParser } from 'fast-xml-parser';

const app = express();
const parser = new XMLParser({ ignoreAttributes: false });
const port = process.env.PORT || 3001;
<<<<<<< HEAD
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentFile = path.join(__dirname, 'data', 'content.json');
const feedUrl = 'https://news.google.com/rss/search?q=futebol+brasileiro&hl=pt-BR&gl=BR&ceid=BR:pt-419';
const adminToken = process.env.ADMIN_TOKEN || 'futebol360-admin';
const isDefaultAdminToken = !process.env.ADMIN_TOKEN;

app.use(express.json({ limit: '1mb' }));

let newsCache = { expires: 0, items: [] };
let contentWriteQueue = Promise.resolve();
const standingsCache = new Map();
=======
const feedUrl = 'https://news.google.com/rss/search?q=futebol+brasileiro&hl=pt-BR&gl=BR&ceid=BR:pt-419';
let cache = { expires: 0, items: [] };
>>>>>>> 6759e5a3b982e3b136a0d577f9682596deb0ad72
const standingsSources = {
  serieA: { name: 'Brasileirão Série A', league: 71 }, serieB: { name: 'Brasileirão Série B', league: 72 },
  serieC: { name: 'Brasileirão Série C', league: 75 }, serieD: { name: 'Brasileirão Série D', league: 76 },
  premier: { name: 'Premier League', league: 39 }, laliga: { name: 'LaLiga', league: 140 },
<<<<<<< HEAD
  serieAIt: { name: 'Serie A Italiana', league: 135 }, bundesliga: { name: 'Bundesliga', league: 78 }, ligue1: { name: 'Ligue 1', league: 61 },
};

async function readContent() {
  try {
    const payload = JSON.parse(await fs.readFile(contentFile, 'utf8'));
    return { articles: Array.isArray(payload.articles) ? payload.articles : [] };
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Falha ao ler conteúdo:', error.message);
    return { articles: [] };
  }
}

function writeContent(payload) {
  contentWriteQueue = contentWriteQueue.then(async () => {
    await fs.mkdir(path.dirname(contentFile), { recursive: true });
    const temporaryFile = `${contentFile}.tmp`;
    await fs.writeFile(temporaryFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    await fs.rename(temporaryFile, contentFile);
  });
  return contentWriteQueue;
}

function safeEqual(left, right) {
  const a = Buffer.from(left || '');
  const b = Buffer.from(right || '');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function requireAdmin(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '') || '';
  if (!safeEqual(token, adminToken)) return response.status(401).json({ error: 'Token administrativo inválido.' });
  next();
}

function normalizeArticle(input, existing = {}) {
  const now = new Date().toISOString();
  const title = String(input.title ?? existing.title ?? '').trim().slice(0, 180);
  const summary = String(input.summary ?? existing.summary ?? '').trim().slice(0, 500);
  const body = String(input.body ?? existing.body ?? '').trim().slice(0, 30000);
  const category = String(input.category ?? existing.category ?? 'Notícias').trim().slice(0, 60);
  const clubSlug = String(input.clubSlug ?? existing.clubSlug ?? '').trim().slice(0, 60);
  const status = input.status === 'published' ? 'published' : 'draft';
  if (!title) throw new Error('O título é obrigatório.');
  return {
    id: existing.id || crypto.randomUUID(), title, summary, body, category, clubSlug,
    status, sourceUrl: String(input.sourceUrl ?? existing.sourceUrl ?? '').trim().slice(0, 1000),
    createdAt: existing.createdAt || now, updatedAt: now,
    publishedAt: status === 'published' ? (existing.publishedAt || now) : null,
  };
}

async function fetchExternalNews(force = false) {
  if (!force && Date.now() < newsCache.expires && newsCache.items.length) return newsCache.items;
  const result = await fetch(feedUrl, { headers: { 'User-Agent': 'Futebol360/1.0' }, signal: AbortSignal.timeout(8000) });
  if (!result.ok) throw new Error(`Fonte respondeu com status ${result.status}`);
  const parsed = parser.parse(await result.text());
  const rawItems = parsed?.rss?.channel?.item ?? [];
  const items = rawItems.slice(0, 12).map((item, index) => ({
    id: item.guid?.['#text'] || item.link,
    title: item.title?.replace(/\s+-\s+[^-]+$/, '') || 'Notícia de futebol',
    source: item.source?.['#text'] || 'Google Notícias', url: item.link, publishedAt: item.pubDate,
    category: index % 3 === 1 ? 'internacional' : 'nacional',
  }));
  newsCache = { items, expires: Date.now() + 5 * 60 * 1000 };
  return items;
}

app.get('/api/config', (_request, response) => response.json({ adminConfigured: !isDefaultAdminToken, sportsApiConfigured: Boolean(process.env.FOOTBALL_API_KEY) }));

app.get('/api/articles', async (request, response) => {
  const { articles } = await readContent();
  const club = String(request.query.club || '');
  const items = articles.filter(article => article.status === 'published' && (!club || article.clubSlug === club)).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  response.json({ items });
});

app.get('/api/admin/articles', requireAdmin, async (_request, response) => {
  const { articles } = await readContent();
  response.json({ items: articles.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) });
});

app.post('/api/admin/articles', requireAdmin, async (request, response) => {
  try {
    const content = await readContent();
    const article = normalizeArticle(request.body);
    content.articles.unshift(article);
    await writeContent(content);
    response.status(201).json(article);
  } catch (error) { response.status(400).json({ error: error.message }); }
});

app.put('/api/admin/articles/:id', requireAdmin, async (request, response) => {
  try {
    const content = await readContent();
    const index = content.articles.findIndex(article => article.id === request.params.id);
    if (index < 0) return response.status(404).json({ error: 'Matéria não encontrada.' });
    content.articles[index] = normalizeArticle(request.body, content.articles[index]);
    await writeContent(content);
    response.json(content.articles[index]);
  } catch (error) { response.status(400).json({ error: error.message }); }
});

app.delete('/api/admin/articles/:id', requireAdmin, async (request, response) => {
  const content = await readContent();
  const before = content.articles.length;
  content.articles = content.articles.filter(article => article.id !== request.params.id);
  if (content.articles.length === before) return response.status(404).json({ error: 'Matéria não encontrada.' });
  await writeContent(content);
  response.status(204).end();
});

app.post('/api/admin/import-feed', requireAdmin, async (_request, response) => {
  try {
    const feedItems = await fetchExternalNews(true);
    const content = await readContent();
    const knownSources = new Set(content.articles.map(article => article.sourceUrl).filter(Boolean));
    const imported = feedItems.filter(item => !knownSources.has(item.url)).map(item => normalizeArticle({ title: item.title, summary: `Pauta importada de ${item.source}. Revise o texto e confirme as informações antes de publicar.`, category: item.category === 'internacional' ? 'Futebol internacional' : 'Futebol nacional', sourceUrl: item.url, status: 'draft' }));
    content.articles.unshift(...imported);
    await writeContent(content);
    response.json({ imported: imported.length, items: imported });
  } catch (error) { response.status(503).json({ error: `Não foi possível importar o feed: ${error.message}` }); }
});

app.get('/api/news', async (_request, response) => {
  try { response.json({ items: await fetchExternalNews(), cached: Date.now() < newsCache.expires }); }
  catch { response.status(503).json({ items: newsCache.items, error: 'Fonte de notícias temporariamente indisponível.' }); }
});

app.get('/api/standings', async (request, response) => {
  const key = request.query.league || 'serieA';
  const source = standingsSources[key] || standingsSources.serieA;
  const cached = standingsCache.get(key);
=======
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
>>>>>>> 6759e5a3b982e3b136a0d577f9682596deb0ad72
  if (cached && cached.expires > Date.now()) return response.json(cached.data);
  try {
    if (!process.env.FOOTBALL_API_KEY) return response.status(503).json({ league: source.name, rows: [], error: 'Configure FOOTBALL_API_KEY para dados oficiais.' });
    const season = process.env.FOOTBALL_SEASON || new Date().getFullYear();
    const result = await fetch(`https://v3.football.api-sports.io/standings?league=${source.league}&season=${season}`, { headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY }, signal: AbortSignal.timeout(8000) });
    if (!result.ok) throw new Error(`Fonte respondeu com status ${result.status}`);
    const payload = await result.json();
<<<<<<< HEAD
    const groups = payload?.response?.[0]?.league?.standings || [];
    const entries = groups.flat();
    const rows = entries.map((entry, index) => ({ position: entry.rank || index + 1, team: entry.team?.name || 'Clube', logo: entry.team?.logo, points: entry.points ?? 0, games: entry.all?.played ?? 0, balance: entry.goalsDiff ?? 0, wins: entry.all?.win ?? 0, draws: entry.all?.draw ?? 0, losses: entry.all?.lose ?? 0 }));
    const data = { league: source.name, updatedAt: new Date().toISOString(), rows };
    standingsCache.set(key, { expires: Date.now() + 10 * 60 * 1000, data });
    response.json(data);
  } catch (error) { response.status(503).json({ league: source.name, rows: [], error: `Não foi possível consultar a API esportiva: ${error.message}` }); }
});

app.get('/api/health', async (_request, response) => {
  const { articles } = await readContent();
  response.json({ status: 'ok', articles: articles.length, sportsApiConfigured: Boolean(process.env.FOOTBALL_API_KEY), adminTokenConfigured: !isDefaultAdminToken });
});

setInterval(() => fetchExternalNews(true).catch(() => {}), 15 * 60 * 1000).unref();

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`API Futebol 360 em http://127.0.0.1:${port}`);
  if (isDefaultAdminToken) console.warn('Aviso: configure ADMIN_TOKEN no arquivo .env antes de publicar o site.');
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE') { console.error(`A porta ${port} já está em uso.`); process.exit(1); }
=======
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
>>>>>>> 6759e5a3b982e3b136a0d577f9682596deb0ad72
  throw error;
});
