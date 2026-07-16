# Futebol 360

Portal esportivo em React + Express, com notícias, páginas de clubes, tabelas de campeonatos e painel editorial próprio.

## Executar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e configure:

   ```env
   PORT=3001
   ADMIN_TOKEN=uma-senha-longa-e-aleatoria
   FOOTBALL_API_KEY=sua-chave-da-api-esportiva
   FOOTBALL_SEASON=2026
   ```

3. Inicie o site e a API:

   ```bash
   npm run dev
   ```

4. Abra o site no endereço exibido pelo Vite. O painel editorial fica em `#admin` ou no link “Painel editorial” do rodapé.

## Painel editorial

O painel permite:

- criar e editar matérias;
- manter conteúdo como rascunho;
- publicar e retirar matérias do site;
- relacionar uma matéria a um clube;
- guardar a URL da fonte original;
- importar pautas externas como rascunho para revisão.

Em ambiente local, quando `ADMIN_TOKEN` não está configurado, o token temporário é `futebol360-admin`. Nunca use esse token em produção.

As matérias são persistidas em `data/content.json`. Faça backup desse arquivo. Para uma instalação com múltiplos editores ou grande volume, a evolução recomendada é migrar esse armazenamento para PostgreSQL.

## Atualizações automáticas

- O feed externo é atualizado em memória a cada 15 minutos.
- Classificações recebidas da API esportiva usam cache de 10 minutos.
- Sem uma chave esportiva válida, o frontend mantém tabelas demonstrativas completas.
- Pautas externas nunca são publicadas automaticamente: entram como rascunho e exigem revisão humana.

## Endpoints principais

- `GET /api/articles` — matérias publicadas.
- `GET /api/articles?club=palmeiras` — matérias publicadas de um clube.
- `GET /api/standings?league=serieA` — classificação esportiva.
- `GET /api/health` — estado dos serviços e configurações.
- `GET /api/admin/articles` — lista editorial protegida.
- `POST /api/admin/articles` — cria matéria.
- `PUT /api/admin/articles/:id` — atualiza matéria.
- `DELETE /api/admin/articles/:id` — exclui matéria.
- `POST /api/admin/import-feed` — importa novas pautas como rascunho.

As rotas `/api/admin/*` exigem `Authorization: Bearer <ADMIN_TOKEN>`.

## Publicação segura

- Use HTTPS em produção.
- Guarde `.env` somente no servidor ou no gerenciador de segredos da hospedagem.
- Escolha um `ADMIN_TOKEN` longo e exclusivo.
- Restrinja o acesso ao painel e mantenha backups de `data/content.json`.
- Não publique automaticamente textos gerados por IA sem revisão factual e editorial.

## Hermes Agent

O Hermes deve ser adicionado depois da publicação estável. O uso recomendado é monitorar saúde do site, verificar falhas de atualização, importar pautas e enviar alertas. Ele não deve receber permissão inicial para publicar matérias ou alterar dados esportivos diretamente.
