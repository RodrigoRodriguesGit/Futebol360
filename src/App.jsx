import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Edit3, ExternalLink, FileText, LogOut, MapPin, Menu, Moon, Plus, RefreshCw, Save, Search, Sun, Trash2, Trophy, X } from 'lucide-react';

const tickerItems = ['Mercado da bola agita os bastidores antes da próxima rodada','Palmeiras e Flamengo fazem duelo direto pela liderança','Seleção brasileira prepara novidades para a próxima convocação'];
const games = [
  { competition:'Brasileirão Série A', time:'72 min', home:'Palmeiras', homeCode:'PAL', away:'Flamengo', awayCode:'FLA', score:'2 × 1', live:true },
  { competition:'Copa do Brasil', time:'Hoje, 21:30', home:'Grêmio', homeCode:'GRE', away:'Corinthians', awayCode:'COR' },
  { competition:'Brasileirão Série A', time:'Amanhã, 19:00', home:'São Paulo', homeCode:'SAO', away:'Cruzeiro', awayCode:'CRU' },
  { competition:'Copa Sul-Americana', time:'Amanhã, 21:30', home:'Bahia', homeCode:'BAH', away:'Vasco', awayCode:'VAS' },
];
const localNews = [
  { category:'Mercado da bola', title:'Diretoria acelera conversas e prepara proposta por artilheiro', text:'Clube quer fechar o negócio antes da reapresentação do elenco.', time:'Há 32 min', theme:'red', mark:'R$' },
  { category:'Futebol europeu', title:'Nova geração assume protagonismo nos gigantes da Europa', text:'Jovens talentos ganham espaço e mudam a dinâmica dos principais elencos.', time:'Há 1 hora', theme:'blue', mark:'UCL' },
  { category:'Análise tática', title:'Por que os laterais voltaram a decidir jogos no Brasil', text:'Movimentações por dentro criam superioridade e confundem a marcação rival.', time:'Há 2 horas', theme:'green', mark:'4-3-3' },
  { category:'Seleção brasileira', title:'Comissão técnica acompanha dez nomes para a próxima convocação', text:'Lista preliminar tem novidades e reforça a disputa por posições.', time:'Há 3 horas', theme:'gold', mark:'10' },
];
const competitions = [
  {key:'serieA',label:'Brasileirão Série A',group:'Brasil'}, {key:'serieB',label:'Brasileirão Série B',group:'Brasil'},
  {key:'serieC',label:'Brasileirão Série C',group:'Brasil'}, {key:'serieD',label:'Brasileirão Série D',group:'Brasil'},
  {key:'premier',label:'Premier League',group:'Europa'}, {key:'laliga',label:'LaLiga',group:'Europa'},
  {key:'serieAIt',label:'Serie A Italiana',group:'Europa'}, {key:'bundesliga',label:'Bundesliga',group:'Europa'}, {key:'ligue1',label:'Ligue 1',group:'Europa'},
];
const competitionTeams = {
  serieA:['Palmeiras','Flamengo','Cruzeiro','Botafogo','Bahia','Corinthians','Fluminense','Internacional','São Paulo','Atlético-MG','Grêmio','Fortaleza','Vasco','Bragantino','Ceará','Santos','Vitória','Juventude','Sport','Mirassol'],
  serieB:['Coritiba','Goiás','Athletico-PR','Novorizontino','Cuiabá','Vila Nova','Avaí','Criciúma','América-MG','Atlético-GO','Remo','Chapecoense','CRB','Operário-PR','Ferroviária','Volta Redonda','Paysandu','Amazonas','Botafogo-SP','Athletic'],
  serieC:['Náutico','Brusque','Santa Cruz','Ypiranga-RS','Londrina','Ituano','ABC','Maringá','Figueirense','Ponte Preta','Guarani','Retrô','São Bernardo','Caxias','Floresta','Confiança','Botafogo-PB','Tombense','CSA','Anápolis'],
  serieD:['ASA','Manauara','Inter de Limeira','Sergipe','Porto Velho','Treze','Água Santa','Ceilândia','Maranhão','Santa Catarina','América-RN','Altos','Mixto','Pouso Alegre','Tocantinópolis','Iguatu','Sousa','Cianorte','Joinville','Imperatriz'],
  premier:['Liverpool','Arsenal','Manchester City','Chelsea','Manchester United','Tottenham','Newcastle','Aston Villa','Brighton','Bournemouth','Fulham','Crystal Palace','Everton','West Ham','Brentford','Wolverhampton','Nottingham Forest','Leeds United','Burnley','Sunderland'],
  laliga:['Barcelona','Real Madrid','Atlético de Madrid','Athletic Bilbao','Villarreal','Real Betis','Sevilla','Valencia','Real Sociedad','Girona','Osasuna','Celta de Vigo','Getafe','Mallorca','Espanyol','Alavés','Rayo Vallecano','Levante','Elche','Real Oviedo'],
  serieAIt:['Inter de Milão','Napoli','Juventus','Milan','Roma','Lazio','Atalanta','Fiorentina','Bologna','Torino','Udinese','Genoa','Como','Parma','Cagliari','Verona','Lecce','Sassuolo','Pisa','Cremonese'],
  bundesliga:['Bayern de Munique','Bayer Leverkusen','Borussia Dortmund','RB Leipzig','Eintracht Frankfurt','Stuttgart','Freiburg','Union Berlin','Mainz 05','Werder Bremen','Augsburg','Wolfsburg','Borussia Mönchengladbach','Hoffenheim','Hamburgo','Colônia','Heidenheim','St. Pauli'],
  ligue1:['Paris Saint-Germain','Marseille','Monaco','Lyon','Lille','Nice','Rennes','Lens','Strasbourg','Toulouse','Auxerre','Brest','Nantes','Angers','Le Havre','Lorient','Paris FC','Metz'],
};
const fallbackTable = key => (competitionTeams[key]||competitionTeams.serieA).map((team,index)=>({position:index+1,team,points:Math.max(11,42-index*2),games:19,wins:Math.max(3,13-index),draws:3+(index%5),losses:Math.min(12,3+index),balance:20-index*2}));
const standings = competitionTeams.serieA;
const clubData = {
  palmeiras:{code:'PAL',name:'Palmeiras',fullName:'Sociedade Esportiva Palmeiras',color:'#146b37',founded:'1914',stadium:'Allianz Parque',city:'São Paulo, SP',titles:'12 Brasileiros',position:'1º',points:40,form:['V','V','E','V','D']},
  flamengo:{code:'FLA',name:'Flamengo',fullName:'Clube de Regatas do Flamengo',color:'#c91f2b',founded:'1895',stadium:'Maracanã',city:'Rio de Janeiro, RJ',titles:'8 Brasileiros',position:'2º',points:38,form:['V','E','V','V','V']},
  corinthians:{code:'COR',name:'Corinthians',fullName:'Sport Club Corinthians Paulista',color:'#232323',founded:'1910',stadium:'Neo Química Arena',city:'São Paulo, SP',titles:'7 Brasileiros',position:'6º',points:30,form:['E','V','D','V','E']},
  'sao-paulo':{code:'SAO',name:'São Paulo',fullName:'São Paulo Futebol Clube',color:'#d82935',founded:'1930',stadium:'MorumBIS',city:'São Paulo, SP',titles:'6 Brasileiros',position:'9º',points:24,form:['D','V','E','V','D']},
  vasco:{code:'VAS',name:'Vasco',fullName:'Club de Regatas Vasco da Gama',color:'#222',founded:'1898',stadium:'São Januário',city:'Rio de Janeiro, RJ',titles:'4 Brasileiros',position:'12º',points:21,form:['V','D','E','D','V']},
  botafogo:{code:'BOT',name:'Botafogo',fullName:'Botafogo de Futebol e Regatas',color:'#303030',founded:'1904',stadium:'Nilton Santos',city:'Rio de Janeiro, RJ',titles:'3 Brasileiros',position:'4º',points:34,form:['V','V','D','E','V']},
  gremio:{code:'GRE',name:'Grêmio',fullName:'Grêmio Foot-Ball Porto Alegrense',color:'#2a82b7',founded:'1903',stadium:'Arena do Grêmio',city:'Porto Alegre, RS',titles:'2 Brasileiros',position:'11º',points:22,form:['E','D','V','V','D']},
  cruzeiro:{code:'CRU',name:'Cruzeiro',fullName:'Cruzeiro Esporte Clube',color:'#2461aa',founded:'1921',stadium:'Mineirão',city:'Belo Horizonte, MG',titles:'4 Brasileiros',position:'3º',points:36,form:['V','V','V','E','D']},
  bahia:{code:'BAH',name:'Bahia',fullName:'Esporte Clube Bahia',color:'#2674ad',founded:'1931',stadium:'Arena Fonte Nova',city:'Salvador, BA',titles:'2 Brasileiros',position:'5º',points:32,form:['V','E','V','D','V']},
  santos:{code:'SAN',name:'Santos',fullName:'Santos Futebol Clube',color:'#3d3d3d',founded:'1912',stadium:'Vila Belmiro',city:'Santos, SP',titles:'8 Brasileiros',position:'10º',points:23,form:['D','E','V','D','V']},
};
const clubSlug = name => Object.keys(clubData).find(key => clubData[key].name === name);

function Brand(){return <a className="brand" href="#top" aria-label="Futebol 360, página inicial"><span>FUTEBOL</span><strong>360</strong><i>●</i></a>}

function Header({dark,setDark,onSearch}){
  const [menuOpen,setMenuOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false);
  const submit=e=>{e.preventDefault();const value=new FormData(e.currentTarget).get('q');onSearch(value);setSearchOpen(false)};
  return <header id="top"><div className="utility"><div className="container"><span>QUARTA, 15 DE JULHO</span><div><a href="#ultimas">Últimas notícias</a><a href="#newsletter">Newsletter</a></div></div></div><div className="header-main"><div className="container header-main-inner"><button className="icon-btn menu-btn" onClick={()=>setMenuOpen(v=>!v)} aria-label="Abrir menu">{menuOpen?<X/>:<Menu/>}</button><Brand/><div className="header-actions"><button className="icon-btn" onClick={()=>setSearchOpen(v=>!v)} aria-label="Buscar"><Search/></button><button className="icon-btn" onClick={()=>setDark(v=>!v)} aria-label="Alternar tema">{dark?<Sun/>:<Moon/>}</button></div></div></div><nav className={menuOpen?'nav-open':''}><div className="container nav-inner"><a href="#destaques">Destaques</a><a href="#jogos">Jogos de hoje</a><a href="#classificacao">Brasileirão</a><a href="#ultimas">Mercado da bola</a><a href="#ultimas">Futebol internacional</a><a className="nav-more" href="#footer">Mais <Menu/></a></div></nav>{searchOpen&&<form className="search-bar container" onSubmit={submit}><input name="q" autoFocus aria-label="Busca" placeholder="Busque por clube, jogador ou campeonato" required/><button>Buscar</button></form>}</header>
}

function ClubRail(){return <div className="club-rail"><div className="container club-scroll"><strong>MEU TIME</strong>{Object.entries(clubData).map(([slug,club])=><a href={`#time/${slug}`} key={slug} style={{'--club':club.color}} aria-label={`Ver página do ${club.name}`}><i>{club.code[0]}</i><span>{club.code}</span></a>)}</div></div>}

function Ticker(){const [index,setIndex]=useState(0),move=step=>setIndex(v=>(v+step+tickerItems.length)%tickerItems.length);return <div className="ticker"><div className="container ticker-inner"><strong>AGORA</strong><p>{tickerItems[index]}</p><div><button onClick={()=>move(-1)} aria-label="Anterior"><ChevronLeft/></button><button onClick={()=>move(1)} aria-label="Próxima"><ChevronRight/></button></div></div></div>}

function Hero(){return <section className="hero container" id="destaques"><div className="section-label"><span>DESTAQUES</span><a href="#ultimas">Ver últimas notícias →</a></div><div className="hero-grid"><article className="lead"><img src="/assets/hero-futebol.png" alt="Jogador se prepara para cobrar uma falta"/><div className="lead-copy"><span>Libertadores</span><h1>Noite de decisão: tudo o que você precisa saber antes do grande jogo</h1><p>Escalações, desfalques e os duelos que podem definir a classificação.</p></div></article><div className="hero-side"><article className="side-card side-green"><span>Mercado</span><h2>Gigantes brasileiros disputam meia destaque da temporada</h2><p>Negociação pode movimentar a janela nos próximos dias.</p></article><article className="side-card side-light"><span>Análise</span><h2>A pressão alta que mudou o campeonato</h2><p>Entenda o ajuste tático que virou tendência entre os grandes clubes.</p></article></div></div><div className="headline-strip"><a href="#ultimas"><b>Seleção</b> Comissão técnica prepara novidades para a próxima convocação</a><a href="#ultimas"><b>Europa</b> Janela internacional esquenta com grandes negociações</a><a href="#ultimas"><b>Brasileirão</b> Veja a classificação atualizada após a rodada</a></div></section>}

function Scores(){return <section className="scores" id="jogos"><div className="container"><div className="section-label white"><span>AGENDA</span><a href="#jogos">Todos os jogos →</a></div><div className="score-row">{games.map(game=><article className="game" key={game.home}><div className="game-top"><span>{game.competition}</span><b className={game.live?'live':''}>{game.time}</b></div><div className="game-clubs"><a href={`#time/${clubSlug(game.home)}`}><i>{game.homeCode[0]}</i>{game.home}</a><strong>{game.score||'– × –'}</strong><a href={`#time/${clubSlug(game.away)}`}><span>{game.away}</span><i>{game.awayCode[0]}</i></a></div></article>)}</div></div></section>}

function ClubNews({slug,name}){const [items,setItems]=useState([]);useEffect(()=>{fetch(`/api/articles?club=${slug}`).then(response=>response.json()).then(data=>setItems(data.items||[])).catch(()=>{})},[slug]);const news=items.length?items:localNews.slice(0,3);return <>{news.slice(0,4).map((item,index)=><a className="team-news" href={item.id?`#materia/${item.id}`:'#ultimas'} key={item.id||item.title}><b>0{index+1}</b><div><span>{item.category}</span><h3>{item.title.replace('Clube',name)}</h3><small>{item.publishedAt?new Date(item.publishedAt).toLocaleString('pt-BR'):item.time}</small></div></a>)}</>}

function TeamPage({slug}){
  const club=clubData[slug];
  if(!club)return <main className="empty-page container"><h1>Time não encontrado</h1><a href="#top">Voltar para o início</a></main>;
  const fixtures=games.filter(game=>game.home===club.name||game.away===club.name);
  return <main className="team-page" style={{'--team':club.color}}><section className="team-hero"><div className="container"><a className="back-link" href="#top"><ArrowLeft/> Voltar para a capa</a><div className="team-identity"><div className="team-crest">{club.code[0]}</div><div><span>{club.city}</span><h1>{club.name}</h1><p>{club.fullName}</p></div></div><nav className="team-tabs"><a href="#time-resumo">Visão geral</a><a href="#time-jogos">Jogos</a><a href="#time-noticias">Notícias</a><a href="#time-elenco">Elenco</a></nav></div></section><div className="container team-content"><section id="time-resumo"><div className="team-stats"><article><Trophy/><small>Brasileirão</small><strong>{club.position}</strong><span>{club.points} pontos</span></article><article><CalendarDays/><small>Fundação</small><strong>{club.founded}</strong><span>{club.titles}</span></article><article><MapPin/><small>Casa</small><strong>{club.stadium}</strong><span>{club.city}</span></article></div><section className="form-card"><div><small>ÚLTIMOS 5 JOGOS</small><h2>Momento do time</h2></div><div className="form-list">{club.form.map((result,index)=><i className={result==='V'?'win':result==='D'?'loss':'draw'} key={index}>{result}</i>)}</div></section></section><section className="team-section" id="time-jogos"><div className="content-title"><div><small>AGENDA</small><h2>Próximos jogos</h2></div></div>{fixtures.length?fixtures.map(game=><article className="team-fixture" key={game.home}><span>{game.time}<small>{game.competition}</small></span><strong>{game.home} <b>{game.score||'×'}</b> {game.away}</strong></article>):<p className="team-empty">A agenda deste time será atualizada em breve.</p>}</section><section className="team-section" id="time-noticias"><div className="content-title"><div><small>COBERTURA 360</small><h2>Notícias do {club.name}</h2></div></div><ClubNews slug={slug} name={club.name}/></section><section className="team-section squad" id="time-elenco"><div className="content-title"><div><small>PLANTEL</small><h2>Elenco principal</h2></div></div><div className="squad-grid">{['Goleiros','Defensores','Meio-campistas','Atacantes'].map((group,index)=><article key={group}><span>{String(index+1).padStart(2,'0')}</span><h3>{group}</h3><p>Informações do elenco serão sincronizadas com a fonte oficial.</p></article>)}</div></section></div></main>
}

function ArticlePage({id}){
  const [article,setArticle]=useState(null),[loading,setLoading]=useState(true);
  useEffect(()=>{fetch('/api/articles').then(response=>response.json()).then(data=>setArticle((data.items||[]).find(item=>item.id===id)||null)).finally(()=>setLoading(false))},[id]);
  if(loading)return <main className="article-page container"><p>Carregando matéria…</p></main>;
  if(!article)return <main className="empty-page container"><h1>Matéria não encontrada</h1><a href="#ultimas">Voltar para as notícias</a></main>;
  return <main className="article-page"><header><div className="container"><a className="article-back" href="#ultimas"><ArrowLeft/> Voltar para as notícias</a><span>{article.category}</span><h1>{article.title}</h1><p>{article.summary}</p><small>Publicado em {new Date(article.publishedAt).toLocaleString('pt-BR',{dateStyle:'long',timeStyle:'short'})}</small></div></header><article className="article-body container">{article.body.split(/\n+/).filter(Boolean).map((paragraph,index)=><p key={index}>{paragraph}</p>)}{article.sourceUrl&&<a className="article-source" href={article.sourceUrl} target="_blank" rel="noreferrer">Consultar fonte original <ExternalLink/></a>}</article></main>
}

const emptyArticle={title:'',summary:'',body:'',category:'Futebol nacional',clubSlug:'',status:'draft',sourceUrl:''};

function AdminPage({notify}){
  const [token,setToken]=useState(()=>sessionStorage.getItem('f360-admin-token')||''),[loginToken,setLoginToken]=useState(''),[articles,setArticles]=useState([]),[editing,setEditing]=useState({...emptyArticle}),[loading,setLoading]=useState(false),[error,setError]=useState(''),[config,setConfig]=useState(null);
  const request=async(url,options={})=>{const response=await fetch(url,{...options,headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`,...options.headers}});if(response.status===401){sessionStorage.removeItem('f360-admin-token');setToken('');throw new Error('Acesso não autorizado. Verifique o token.')};if(!response.ok){const payload=await response.json().catch(()=>({}));throw new Error(payload.error||'Não foi possível concluir a operação.')};return response.status===204?null:response.json()};
  const load=async()=>{setLoading(true);setError('');try{const data=await request('/api/admin/articles');setArticles(data.items||[])}catch(reason){setError(reason.message)}finally{setLoading(false)}};
  useEffect(()=>{fetch('/api/config').then(response=>response.json()).then(setConfig).catch(()=>{});if(token)load()},[token]);
  const login=e=>{e.preventDefault();const value=loginToken.trim();sessionStorage.setItem('f360-admin-token',value);setToken(value)};
  const logout=()=>{sessionStorage.removeItem('f360-admin-token');setToken('');setArticles([])};
  const save=async e=>{e.preventDefault();setLoading(true);setError('');try{const url=editing.id?`/api/admin/articles/${editing.id}`:'/api/admin/articles';const saved=await request(url,{method:editing.id?'PUT':'POST',body:JSON.stringify(editing)});setEditing(saved);notify(editing.status==='published'?'Matéria publicada.':'Rascunho salvo.');await load()}catch(reason){setError(reason.message)}finally{setLoading(false)}};
  const remove=async article=>{if(!window.confirm(`Excluir “${article.title}”?`))return;try{await request(`/api/admin/articles/${article.id}`,{method:'DELETE'});if(editing.id===article.id)setEditing({...emptyArticle});notify('Matéria excluída.');await load()}catch(reason){setError(reason.message)}};
  const importFeed=async()=>{setLoading(true);setError('');try{const data=await request('/api/admin/import-feed',{method:'POST'});notify(`${data.imported} pautas importadas como rascunho.`);await load()}catch(reason){setError(reason.message)}finally{setLoading(false)}};
  if(!token)return <main className="admin-login"><form onSubmit={login}><div className="admin-mark"><FileText/></div><small>FUTEBOL 360</small><h1>Painel editorial</h1><p>Entre com o token administrativo configurado no servidor.</p><input type="password" value={loginToken} onChange={e=>setLoginToken(e.target.value)} placeholder="Token administrativo" required/><button>Entrar</button>{config&&!config.adminConfigured&&<aside><b>Ambiente local:</b> use <code>futebol360-admin</code>. Configure <code>ADMIN_TOKEN</code> antes de publicar.</aside>}<a href="#top">← Voltar ao site</a></form></main>;
  return <main className="admin-page"><header><div><small>FUTEBOL 360</small><h1>Painel editorial</h1></div><div><button onClick={importFeed} disabled={loading}><RefreshCw/> Importar pautas</button><a href="#top">Ver site</a><button onClick={logout}><LogOut/> Sair</button></div></header>{error&&<div className="admin-error">{error}</div>}<div className="admin-layout"><aside className="admin-list"><div><h2>Matérias</h2><button onClick={()=>setEditing({...emptyArticle})}><Plus/> Nova</button></div>{loading&&!articles.length?<p>Carregando…</p>:articles.map(article=><article className={editing.id===article.id?'active':''} key={article.id} onClick={()=>setEditing(article)}><span className={article.status}>{article.status==='published'?'Publicada':'Rascunho'}</span><h3>{article.title}</h3><small>{new Date(article.updatedAt).toLocaleString('pt-BR')}</small><button onClick={e=>{e.stopPropagation();remove(article)}} aria-label="Excluir"><Trash2/></button></article>)}</aside><form className="admin-editor" onSubmit={save}><div className="editor-heading"><div><small>{editing.id?'EDITAR MATÉRIA':'NOVA MATÉRIA'}</small><h2>{editing.title||'Sem título'}</h2></div><button type="submit" disabled={loading}><Save/> Salvar</button></div><label>Título<input value={editing.title} onChange={e=>setEditing({...editing,title:e.target.value})} maxLength="180" required/></label><label>Resumo<textarea value={editing.summary} onChange={e=>setEditing({...editing,summary:e.target.value})} rows="3" maxLength="500"/></label><label>Conteúdo<textarea className="body-field" value={editing.body} onChange={e=>setEditing({...editing,body:e.target.value})} rows="14"/></label><div className="editor-grid"><label>Categoria<input value={editing.category} onChange={e=>setEditing({...editing,category:e.target.value})}/></label><label>Time relacionado<select value={editing.clubSlug} onChange={e=>setEditing({...editing,clubSlug:e.target.value})}><option value="">Nenhum</option>{Object.entries(clubData).map(([slug,club])=><option value={slug} key={slug}>{club.name}</option>)}</select></label></div><label>URL da fonte<input type="url" value={editing.sourceUrl} onChange={e=>setEditing({...editing,sourceUrl:e.target.value})} placeholder="https://..."/></label><fieldset><legend>Status da publicação</legend><label><input type="radio" name="status" checked={editing.status==='draft'} onChange={()=>setEditing({...editing,status:'draft'})}/> Rascunho</label><label><input type="radio" name="status" checked={editing.status==='published'} onChange={()=>setEditing({...editing,status:'published'})}/> Publicada</label></fieldset></form></div></main>
}

function StandingsModal({close}){
  const [competition,setCompetition]=useState('serieA'),[rows,setRows]=useState(fallbackTable('serieA')),[loading,setLoading]=useState(false),[live,setLive]=useState(false);
  useEffect(()=>{const handler=e=>e.key==='Escape'&&close();document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler)},[close]);
  useEffect(()=>{let active=true;setLoading(true);setRows(fallbackTable(competition));setLive(false);fetch(`/api/standings?league=${competition}`).then(response=>{if(!response.ok)throw new Error();return response.json()}).then(data=>{if(active&&data.rows?.length){setRows(data.rows);setLive(true)}}).catch(()=>{}).finally(()=>active&&setLoading(false));return()=>{active=false}},[competition]);
  const selected=competitions.find(item=>item.key===competition);
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="table-modal complete-table-modal" role="dialog" aria-modal="true" aria-labelledby="table-title"><div className="modal-title"><div><small>{selected.group} · {live?'DADOS DA API':'TABELA COMPLETA'}</small><h2 id="table-title">{selected.label}</h2></div><button onClick={close} aria-label="Fechar"><X/></button></div><div className="competition-picker"><label htmlFor="competition-select">Campeonato</label><select id="competition-select" value={competition} onChange={e=>setCompetition(e.target.value)}>{['Brasil','Europa'].map(group=><optgroup label={group} key={group}>{competitions.filter(item=>item.group===group).map(item=><option value={item.key} key={item.key}>{item.label}</option>)}</optgroup>)}</select><span>{loading?'Atualizando…':`${rows.length} clubes`}</span></div><div className="complete-table-scroll"><table><thead><tr><th>#</th><th>Clube</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>{rows.map((row,index)=>{const slug=clubSlug(row.team);return <tr key={row.team}><td><i className={index<4?'zone-green':index>=rows.length-4?'zone-red':''}>{row.position??index+1}</i></td><td>{row.logo&&<img src={row.logo} alt=""/>}{slug?<a href={`#time/${slug}`} onClick={close}>{row.team}</a>:row.team}</td><td><b>{row.points}</b></td><td>{row.games}</td><td>{row.wins}</td><td>{row.draws}</td><td>{row.losses}</td><td>{row.balance>0?`+${row.balance}`:row.balance}</td></tr>})}</tbody></table></div><div className="table-caption"><span><i className="caption-green"/>Zona continental</span><span><i className="caption-red"/>Zona de rebaixamento</span><small>{live?'Fonte de dados configurada no servidor.':'Dados demonstrativos completos; a API assume automaticamente quando configurada.'}</small></div></section></div>
}

function NewsFeed({notify,query=''}){
  const [items,setItems]=useState([]),[published,setPublished]=useState([]),[loading,setLoading]=useState(true);
  const load=async(showMessage=false)=>{setLoading(true);try{const response=await fetch('/api/news');if(!response.ok)throw new Error();const data=await response.json();setItems(data.items||[]);if(showMessage)notify('Notícias atualizadas.')}catch{if(showMessage)notify('A fonte externa está indisponível.')}finally{setLoading(false)}};
  useEffect(()=>{load();fetch('/api/articles').then(response=>response.json()).then(data=>setPublished(data.items||[])).catch(()=>{})},[]);
  const editorial=published.map((item,index)=>({...item,internal:true,text:item.summary,time:new Date(item.publishedAt).toLocaleString('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}),theme:['green','red','blue','gold'][index%4],mark:'360'}));
  const external=items.slice(0,12).map((item,index)=>({...item,category:item.source,text:'Confira a cobertura completa na fonte original.',time:new Date(item.publishedAt).toLocaleString('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}),theme:['red','blue','green','gold'][index%4],mark:'360'}));
  const allNews=editorial.length||external.length?[...editorial,...external]:localNews;
  const normalized=query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const news=normalized?allNews.filter(item=>`${item.title} ${item.category} ${item.text}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(normalized)):allNews.slice(0,6);
  return <section className="news-feed" id="ultimas"><div className="content-title"><div><small>{query?'RESULTADO DA BUSCA':'FUTEBOL 360'}</small><h2>{query?`Busca: ${query}`:'Últimas notícias'}</h2></div><button className="refresh" onClick={()=>load(true)} disabled={loading}><RefreshCw className={loading?'spinning':''}/> Atualizar</button></div>{news.length?news.map(item=>{const content=<><div className={`news-thumb ${item.theme}`}><span>{item.mark}</span></div><div className="news-copy"><span>{item.category}</span><h3>{item.title}</h3><p>{item.text}</p><small>{item.time}{item.url&&!item.internal&&<> · Abrir notícia <ExternalLink/></>}</small></div></>;return item.internal?<a className="news-card" href={`#materia/${item.id}`} key={item.id}>{content}</a>:item.url?<a className="news-card" href={item.url} target="_blank" rel="noreferrer" key={item.id}>{content}</a>:<article className="news-card" key={item.title}>{content}</article>}):<div className="search-empty"><Search/><h3>Nenhuma notícia encontrada</h3><p>Tente buscar outro clube, jogador ou campeonato.</p></div>}</section>
}

function Sidebar({notify,onOpenTable}){const submit=e=>{e.preventDefault();e.currentTarget.reset();notify('Inscrição confirmada. Bem-vindo ao giro!')};return <aside className="sidebar"><section className="standings" id="classificacao"><div className="widget-title"><div><small>CLASSIFICAÇÃO</small><h2>Brasileirão</h2></div><span>Série A</span></div><table><thead><tr><th>#</th><th>Clube</th><th>PTS</th><th>J</th></tr></thead><tbody>{standings.map((team,index)=>{const slug=clubSlug(team);return <tr key={team}><td><i className={index<4?'qualify':index>7?'danger':''}>{index+1}</i></td><td>{slug?<a href={`#time/${slug}`}>{team}</a>:team}</td><td><b>{40-index*2}</b></td><td>17</td></tr>})}</tbody></table><button className="full-table" onClick={onOpenTable}>Ver classificação completa →</button></section><section className="most-read"><div className="widget-title"><div><small>EM ALTA</small><h2>Mais lidas</h2></div></div>{localNews.slice(0,3).map((item,index)=><a href="#ultimas" key={item.title}><b>0{index+1}</b><span>{item.title}</span></a>)}</section><section className="newsletter" id="newsletter"><small>NEWSLETTER</small><h2>O futebol não para.</h2><p>Receba as principais notícias da rodada no seu e-mail.</p><form onSubmit={submit}><input type="email" placeholder="seu@email.com" required/><button>Quero receber</button></form></section></aside>}

function Footer(){return <footer id="footer"><div className="container footer-top"><Brand/><p>O jogo por todos os ângulos.</p><a href="#top">Voltar ao topo ↑</a></div><div className="container footer-links"><div><b>Futebol</b><a href="#ultimas">Brasileirão</a><a href="#ultimas">Copa do Brasil</a><a href="#ultimas">Libertadores</a></div><div><b>Futebol internacional</b><a href="#ultimas">Champions League</a><a href="#ultimas">Premier League</a><a href="#ultimas">La Liga</a></div><div><b>Futebol 360</b><a href="#top">Sobre</a><a href="mailto:contato@futebol360.com.br">Contato</a><a href="#admin">Painel editorial</a></div></div><div className="copyright container">© 2026 Futebol 360. Todos os direitos reservados.</div></footer>}

export default function App(){
  const getRoute=()=>window.location.hash.startsWith('#time/')?window.location.hash.replace('#time/',''):null;
  const getArticleRoute=()=>window.location.hash.startsWith('#materia/')?window.location.hash.replace('#materia/',''):null;
  const [dark,setDark]=useState(()=>localStorage.getItem('f360-theme')==='dark'),[toast,setToast]=useState(''),[teamRoute,setTeamRoute]=useState(getRoute),[articleRoute,setArticleRoute]=useState(getArticleRoute),[adminRoute,setAdminRoute]=useState(window.location.hash==='#admin'),[tableOpen,setTableOpen]=useState(false),[searchQuery,setSearchQuery]=useState('');
  const timer=useRef();
  useEffect(()=>{document.body.classList.toggle('dark',dark);localStorage.setItem('f360-theme',dark?'dark':'light')},[dark]);
  useEffect(()=>{const sync=()=>{const route=getRoute(),article=getArticleRoute(),admin=window.location.hash==='#admin';setTeamRoute(route);setArticleRoute(article);setAdminRoute(admin);setTableOpen(false);if(route||article||admin)window.scrollTo({top:0,behavior:'smooth'})};window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
  const notify=message=>{clearTimeout(timer.current);setToast(message);timer.current=setTimeout(()=>setToast(''),2800)};
  const search=value=>{const query=value.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');const match=Object.entries(clubData).find(([,club])=>club.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query)||club.code.toLowerCase()===query);if(match){window.location.hash=`time/${match[0]}`}else{setSearchQuery(value.trim());window.location.hash='ultimas';notify(`Resultados de notícias para “${value}”`)}};
  if(adminRoute)return <><AdminPage notify={notify}/><div className={`toast ${toast?'show':''}`} role="status">{toast}</div></>;
  return <><Header dark={dark} setDark={setDark} onSearch={search}/><ClubRail/>{teamRoute?<TeamPage slug={teamRoute}/>:articleRoute?<ArticlePage id={articleRoute}/>:<><Ticker/><main><Hero/><Scores/><div className="content-grid container"><NewsFeed notify={notify} query={searchQuery}/><Sidebar notify={notify} onOpenTable={()=>setTableOpen(true)}/></div></main></>}<Footer/>{tableOpen&&<StandingsModal close={()=>setTableOpen(false)}/>}<div className={`toast ${toast?'show':''}`} role="status">{toast}</div></>
=======
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
>>>>>>> 6759e5a3b982e3b136a0d577f9682596deb0ad72
}
