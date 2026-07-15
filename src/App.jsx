import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Menu, Moon, RefreshCw, Search, Sparkles, Sun, X } from 'lucide-react';

const tickerItems = ['Mercado da bola agita os bastidores antes da próxima rodada', 'Palmeiras e Flamengo fazem duelo direto pela liderança', 'Seleção brasileira prepara novidades para a próxima convocação'];
const games = [
  ['2º TEMPO • 72\'','Palmeiras','P','green','2 × 1','Flamengo','F','red','Brasileirão • Allianz Parque',true],
  ['HOJE • 21:30','Grêmio','G','blue','— × —','Corinthians','C','black','Copa do Brasil • Arena do Grêmio'],
  ['AMANHÃ • 19:00','São Paulo','S','red','— × —','Cruzeiro','C','blue','Brasileirão • MorumBIS'],
];
const articles = [
  ['nacional','Mercado da bola','visual-red','R$','Diretoria acelera conversas e prepara proposta por artilheiro','Clube quer fechar o negócio antes da reapresentação do elenco.','Há 32 min','4 min de leitura','mercado'],
  ['internacional','Futebol europeu','visual-blue','UCL','Nova geração assume protagonismo nos gigantes da Europa','Jovens talentos ganham espaço e mudam a dinâmica dos principais elencos.','Há 1 hora','6 min de leitura','internacional'],
  ['nacional','Análise tática','visual-green','4-3-3','Por que os laterais voltaram a decidir jogos no Brasil','Movimentações por dentro criam superioridade e confundem a marcação rival.','Há 2 horas','8 min de leitura','analises'],
  ['nacional','Seleção brasileira','visual-gold','10','Comissão técnica acompanha dez nomes para a próxima convocação','Lista preliminar tem novidades e reforça a disputa por posições.','Há 3 horas','5 min de leitura'],
];
const seriesStandings = {
  'Série A': ['Palmeiras','Flamengo','Cruzeiro','Botafogo','Bahia','Corinthians','Fluminense','Internacional','São Paulo','Atlético-MG','Grêmio','Fortaleza','Vasco','Bragantino','Ceará','Santos','Vitória','Juventude','Sport','Mirassol'],
  'Série B': ['Coritiba','Goiás','Athletico-PR','Novorizontino','Cuiabá','Vila Nova','Avaí','Criciúma','América-MG','Atlético-GO','Remo','Chapecoense','CRB','Operário-PR','Ferroviária','Volta Redonda','Paysandu','Amazonas','Botafogo-SP','Athletic'],
};

function tableRows(division) {
  return seriesStandings[division].map((team, index) => ({ team, color: ['green','red','blue','black'][index % 4], points: Math.max(12, 40 - index * 2), games: 17, balance: 18 - index * 2 }));
}

function Brand({ footer = false }) { return <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#" aria-label="Futebol 360 - página inicial">{!footer && <span className="brand-ball">●</span>}<span>FUTEBOL</span><strong>360</strong></a>; }

function Header({ dark, setDark, notify }) {
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false);
  const input = useRef(null);
  useEffect(() => { if (search) input.current?.focus(); }, [search]);
  const submit = e => { e.preventDefault(); const value = input.current.value.trim(); if (value) notify(`Buscando notícias sobre “${value}”`); };
  return <header className="site-header">
    <div className="topbar"><div className="container topbar-inner"><span>QUARTA, 15 DE JULHO</span><div className="top-links"><span>São Paulo 21°</span><span>•</span><a href="#newsletter">Newsletter</a></div></div></div>
    <div className="brandbar container"><button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Fechar menu' : 'Abrir menu'}>{menu ? <X /> : <Menu />}</button><Brand /><div className="header-actions"><button className="icon-button" onClick={() => setSearch(!search)} aria-label="Buscar"><Search /></button><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Alternar tema">{dark ? <Sun /> : <Moon />}</button></div></div>
    <nav className={`main-nav ${menu ? 'open' : ''}`}><div className="container nav-inner"><a className="active" href="#destaques">Início</a><a href="#ultimas">Últimas</a><a href="#mercado">Mercado da bola</a><a href="#brasileirao">Brasileirão</a><a href="#internacional">Internacional</a><a href="#analises">Análises</a></div></nav>
    {search && <div className="search-panel"><form className="container search-form" onSubmit={submit}><label className="sr-only" htmlFor="searchInput">Buscar notícias</label><input ref={input} id="searchInput" type="search" placeholder="Busque por clube, campeonato ou jogador..." /><button>Buscar</button></form></div>}
  </header>;
}

function Ticker() {
  const [index, setIndex] = useState(0), move = step => setIndex((index + step + tickerItems.length) % tickerItems.length);
  return <section className="ticker"><div className="container ticker-inner"><strong>AGORA</strong><p>{tickerItems[index]}</p><div className="ticker-controls"><button onClick={() => move(-1)} aria-label="Anterior"><ChevronLeft /></button><button onClick={() => move(1)} aria-label="Próxima"><ChevronRight /></button></div></div></section>;
}

function Hero() { return <section className="hero container" id="destaques">
  <article className="lead-story"><img src="/assets/hero-futebol.png" alt="Jogador se prepara para cobrar uma falta em estádio lotado" /><div className="lead-overlay"><span className="tag tag-red">Libertadores</span><h1>Noite de decisão: tudo o que você precisa saber antes do grande jogo</h1><p>Escalações, desfalques e os duelos que podem definir a classificação.</p><div className="story-meta"><span>Por Redação Futebol 360</span><span>Há 18 min</span></div></div></article>
  <div className="side-stories"><article className="story-block yellow-story"><span className="tag">Mercado</span><div><h2>Gigantes brasileiros disputam meia destaque da temporada</h2><p>Negociação pode movimentar a janela nos próximos dias.</p></div><span className="story-index">01</span></article><article className="story-block stats-story"><span className="tag">Análise</span><div className="mini-pitch"><i/><i/><i/><i/><i/></div><div><h2>A pressão alta que mudou o campeonato</h2><p>Entenda o ajuste tático que virou tendência.</p></div><span className="story-index">02</span></article></div>
  </section>; }

function Scores() { return <section className="score-band"><div className="container"><div className="section-heading compact"><div><span>AO VIVO</span><h2>Jogos de hoje</h2></div><a href="#brasileirao">Ver todos →</a></div><div className="score-grid">{games.map(([status,home,hk,hc,score,away,ak,ac,info,live]) => <article className="score-card" key={home}><div className={`score-status ${live ? 'live' : ''}`}>{status}</div><div className="teams"><span><b className={`crest ${hc}`}>{hk}</b>{home}</span><strong>{score}</strong><span><b className={`crest ${ac}`}>{ak}</b>{away}</span></div><small>{info}</small></article>)}</div></div></section>; }

function News({ notify }) {
  const [filter, setFilter] = useState('all'), [items, setItems] = useState([]), [loading, setLoading] = useState(true), [updatedAt, setUpdatedAt] = useState(null);
  const loadNews = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Feed indisponível');
      const data = await response.json();
      setItems(data.items || []); setUpdatedAt(new Date());
      if (!silent) notify('Últimas notícias atualizadas.');
    } catch { if (!silent) notify('Usando notícias locais. A fonte externa está indisponível.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadNews(true); const interval = setInterval(() => loadNews(true), 5 * 60 * 1000); return () => clearInterval(interval); }, []);
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#internacional') setFilter('internacional');
      if (hash === '#mercado') setFilter('mercado');
      if (hash === '#analises') setFilter('analises');
      if (['#mercado', '#analises', '#internacional'].includes(hash)) {
        document.getElementById('ultimas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);
  const matchesLocal = article => filter === 'all' || article[0] === filter || (filter === 'mercado' && article[1] === 'Mercado da bola') || (filter === 'analises' && article[1] === 'AnÃ¡lise tÃ¡tica');
  const remote = items.filter(item => filter === 'all' || item.category === filter);
  const local = articles.filter(matchesLocal);
  return <div className="news-feed"><div className="section-heading news-heading"><div><span>{items.length ? 'ATUALIZAÇÃO AUTOMÁTICA' : 'EM DESTAQUE'}</span><h2>Últimas notícias</h2>{updatedAt && <small>Atualizado às {updatedAt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</small>}</div><div className="news-actions"><div className="filters">{[['all','Todas'],['nacional','Nacional'],['internacional','Europa']].map(([key,label]) => <button className={filter === key ? 'active' : ''} onClick={() => setFilter(key)} key={key}>{label}</button>)}</div><button className="refresh-button" onClick={() => loadNews()} disabled={loading} title="Atualizar notícias"><RefreshCw className={loading ? 'spinning' : ''}/></button></div></div>
    <div>{remote.length ? remote.map((item,index) => <a className="news-item remote-news" href={item.url} target="_blank" rel="noreferrer" key={item.id}><div className={`news-visual ${['visual-red','visual-blue','visual-green','visual-gold'][index%4]}`}><span>360</span></div><div><span className="category">{item.source}</span><h3>{item.title}</h3><p>Confira a cobertura completa desta notícia na fonte original.</p><div className="story-meta dark"><span>{new Date(item.publishedAt).toLocaleString('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span><span className="source-link">Abrir notícia <ExternalLink/></span></div></div></a>) : local.map(([category,label,color,mark,title,text,time,read,id]) => <article className="news-item" id={id} key={title}><div className={`news-visual ${color}`}><span>{mark}</span></div><div><span className="category">{label}</span><h3>{title}</h3><p>{text}</p><div className="story-meta dark"><span>{time}</span><span>{read}</span></div></div></article>)}</div>
  </div>;
}

function StandingsTable({ division, complete = false }) {
  const rows = tableRows(division).slice(0, complete ? 20 : 6);
  return <table><thead><tr><th>#</th><th>Clube</th><th>PTS</th><th>J</th><th>SG</th></tr></thead><tbody>{rows.map(({team,color,points,games,balance}, i) => <tr key={team}><td><span className={`position position-${i < 4 ? 'liberta' : i > 15 ? 'relegation' : 'middle'}`}>{i+1}</span></td><td><b className={`dot ${color}`}/>{team}</td><td><strong>{points}</strong></td><td>{games}</td><td>{balance > 0 ? `+${balance}` : balance}</td></tr>)}</tbody></table>;
}

function StandingsModal({ division, setDivision, close }) {
  return <LiveStandingsModal close={close}/>;
  /* Legacy local modal retained below for fallback reference. */
  useEffect(() => { const handler = e => e.key === 'Escape' && close(); document.addEventListener('keydown',handler); return () => document.removeEventListener('keydown',handler); }, [close]);
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}><section className="standings-modal" role="dialog" aria-modal="true" aria-labelledby="standingsTitle"><div className="modal-header"><div><span>CLASSIFICAÇÃO COMPLETA</span><h2 id="standingsTitle">Brasileirão {division}</h2></div><button className="icon-button" onClick={close} aria-label="Fechar"><X/></button></div><div className="division-tabs">{Object.keys(seriesStandings).map(name => <button className={division === name ? 'active' : ''} onClick={() => setDivision(name)} key={name}>{name}</button>)}</div><div className="modal-table"><StandingsTable division={division} complete/></div><div className="table-legend"><span><i className="legend-liberta"/>Libertadores</span><span><i className="legend-relegation"/>Rebaixamento</span><small>Dados demonstrativos preparados para integração com API oficial.</small></div></section></div>;
}

const competitions = [
  { key: 'serieA', label: 'Série A', group: 'Brasil' }, { key: 'serieB', label: 'Série B', group: 'Brasil' },
  { key: 'serieC', label: 'Série C', group: 'Brasil' }, { key: 'serieD', label: 'Série D', group: 'Brasil' },
  { key: 'premier', label: 'Premier League', group: 'Europa' }, { key: 'laliga', label: 'LaLiga', group: 'Europa' },
  { key: 'serieAIt', label: 'Serie A', group: 'Europa' }, { key: 'bundesliga', label: 'Bundesliga', group: 'Europa' }, { key: 'ligue1', label: 'Ligue 1', group: 'Europa' },
];
const fallbackCompetitionTeams = { serieA: ['Palmeiras','Flamengo','Cruzeiro','Botafogo','Bahia','Corinthians','Fluminense','Internacional'], serieB: ['Coritiba','Goiás','Athletico-PR','Novorizontino','Cuiabá','Vila Nova','Avaí','Criciúma'], serieC: ['Náutico','Brusque','Santa Cruz','Ypiranga-RS','Paysandu','Londrina','Ituano','ABC'], serieD: ['Retrô','Manauara','ASA','Inter de Limeira','Sergipe','Porto Velho','Treze','Maringá'], premier: ['Liverpool','Arsenal','Manchester City','Chelsea','Manchester United','Tottenham','Newcastle','Aston Villa'], laliga: ['Barcelona','Real Madrid','Atlético de Madrid','Athletic Bilbao','Villarreal','Real Betis','Sevilla','Valencia'], serieAIt: ['Inter','Napoli','Juventus','Milan','Roma','Lazio','Atalanta','Fiorentina'], bundesliga: ['Bayern München','Bayer Leverkusen','Borussia Dortmund','RB Leipzig','Eintracht Frankfurt','Stuttgart','Freiburg','Union Berlin'], ligue1: ['Paris Saint-Germain','Marseille','Monaco','Lyon','Lille','Nice','Rennes','Lens'] };
function fallbackRows(key) { return (fallbackCompetitionTeams[key] || []).map((team, index) => ({ position: index + 1, team, points: 36 - index * 3, games: 17, wins: 10 - Math.floor(index / 3), draws: 6 - Math.floor(index / 4), losses: index % 4, balance: 14 - index * 2 })); }

function LiveStandingsModal({ close }) {
  const [competition, setCompetition] = useState('serieA');
  const [data, setData] = useState({ rows: [], league: 'Brasileirão Série A' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/standings?league=${competition}`).then(response => response.json()).then(result => { if (active) setData(result); }).catch(() => { if (active) setData({ rows: [], league: 'Tabela indisponível', error: 'Não foi possível conectar à fonte oficial.' }); }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [competition]);
  return <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && close()}><section className="standings-modal live-standings-modal" role="dialog" aria-modal="true" aria-labelledby="liveStandingsTitle"><div className="modal-header"><div><span>PAINEL DE COMPETIÇÕES</span><h2 id="liveStandingsTitle">{data.league}</h2><small>{data.updatedAt ? `Atualizado em ${new Date(data.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : 'Dados ao vivo'}</small></div><button className="icon-button" onClick={close} aria-label="Fechar"><X /></button></div><div className="competition-select"><label htmlFor="competition">Competição</label><select id="competition" value={competition} onChange={event => setCompetition(event.target.value)}>{['Brasil','Europa'].map(group => <optgroup label={group} key={group}>{competitions.filter(item => item.group === group).map(item => <option value={item.key} key={item.key}>{item.label}</option>)}</optgroup>)}</select></div><div className="modal-table">{loading ? <div className="table-loading">Atualizando tabela...</div> : data.rows.length ? <table><thead><tr><th>#</th><th>Clube</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>{data.rows.map(row => <tr key={row.team}><td><span className={`position position-${row.position <= 4 ? 'liberta' : row.position > data.rows.length - 4 ? 'relegation' : 'middle'}`}>{row.position}</span></td><td>{row.logo && <img className="team-logo" src={row.logo} alt=""/>}{row.team}</td><td><strong>{row.points}</strong></td><td>{row.games}</td><td>{row.wins}</td><td>{row.draws}</td><td>{row.losses}</td><td>{row.balance > 0 ? `+${row.balance}` : row.balance}</td></tr>)}</tbody></table> : <div className="table-loading">A fonte ao vivo está indisponível. Tente atualizar em alguns instantes.</div>}</div><div className="table-legend"><span><i className="legend-liberta"/>Zona continental</span><span><i className="legend-relegation"/>Zona de rebaixamento</span><small>Fonte: ESPN Soccer API • cache de 10 minutos</small></div></section></div>;
}

function Sidebar({ notify, openStandings, division, setDivision }) {
  const submit = e => { e.preventDefault(); e.currentTarget.reset(); notify('Inscrição confirmada. Bem-vindo ao giro!'); };
  return <aside className="sidebar" id="brasileirao"><section className="table-widget"><div className="widget-header"><div><span>CLASSIFICAÇÃO</span><h2>Brasileirão</h2></div><select aria-label="Campeonato" value={division} onChange={e => setDivision(e.target.value)}><option>Série A</option><option>Série B</option></select></div><StandingsTable division={division}/><button className="table-link" onClick={openStandings}>Classificação completa →</button></section><section className="newsletter" id="newsletter"><Sparkles className="newsletter-icon"/><p>O futebol não para.</p><h2>Receba o giro da rodada.</h2><form onSubmit={submit}><label className="sr-only" htmlFor="emailInput">Seu e-mail</label><input id="emailInput" type="email" placeholder="seu@email.com" required/><button>Inscrever</button></form><small>Notícias essenciais, sem enrolação. Cancele quando quiser.</small></section></aside>;
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('f360-theme') === 'dark'), [toast, setToast] = useState('');
  const [division, setDivision] = useState('Série A'), [standingsOpen, setStandingsOpen] = useState(false);
  const timer = useRef();
  useEffect(() => { document.body.classList.toggle('dark', dark); localStorage.setItem('f360-theme', dark ? 'dark' : 'light'); }, [dark]);
  const notify = message => { clearTimeout(timer.current); setToast(message); timer.current = setTimeout(() => setToast(''), 2800); };
  return <><Header dark={dark} setDark={setDark} notify={notify}/><main><Ticker/><Hero/><Scores/><section className="content-grid container" id="ultimas"><News notify={notify}/><Sidebar notify={notify} division={division} setDivision={setDivision} openStandings={() => setStandingsOpen(true)}/></section></main><footer><div className="container footer-inner"><Brand footer/><p>O jogo por todos os ângulos.</p><div><a href="#">Sobre</a><a href="#">Contato</a><a href="#">Privacidade</a></div></div></footer>{standingsOpen && <StandingsModal division={division} setDivision={setDivision} close={() => setStandingsOpen(false)}/>}<div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div></>;
}
