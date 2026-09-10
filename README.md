# C&M Automação e Elétrica — Site institucional

Site profissional para divulgação de serviços elétricos de um eletricista autônomo / empresa de serviços elétricos. Estático, rápido e compatível com hospedagem gratuita (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

## 1. Objetivo

Divulgar os serviços prestados, transmitir profissionalismo, apresentar obras realizadas e facilitar o contato e a solicitação de orçamento pelo WhatsApp.

## 2. Tecnologias utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — estilos, layout e responsividade
- **JavaScript puro (Vanilla JS)** — interações (menu mobile, galeria 3D de obras, WhatsApp)
- **Lucide Icons** — ícones via CDN
- **Fonte Inter** — via Google Fonts

Não usa framework, servidor ou banco de dados.

## 3. Estrutura de pastas

```text
site-eletricista/
│
├── index.html              → Página principal (estrutura completa)
├── README.md               → Este arquivo
├── .gitignore              → Arquivos ignorados pelo Git
│
├── assets/
│   ├── css/
│   │   └── style.css       → Todos os estilos e responsividade
│   ├── js/
│   │   ├── config.js       → Dados da empresa (WhatsApp, nome, cidade)
│   │   └── script.js       → Funcionalidades (menu, galeria 3D, WhatsApp)
│   ├── images/
│   │   ├── logo/           → Logo da empresa
│   │   ├── hero/           → Imagem/banner do topo
│   │   ├── servicos/       → Imagens/ícones dos serviços
│   │   └── portfolio/      → Fotos das obras (uma pasta por obra)
│   └── icons/              → Ícones personalizados (se necessário)
│
└── docs/
    └── estrutura-projeto.md → Documentação detalhada do projeto
```

## 4. Como executar localmente

Você só precisa de um navegador. Duas opções:

**Opção 1 — clicando no arquivo**

Abra o `index.html` diretamente (dê dois cliques). Funciona, mas o menu e a galeria 3D são testados apenas via servidor local.

**Opção 2 — servidor local (recomendado)**

Com Python instalado:

```bash
# Na pasta raiz do projeto
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

Com Node.js instalado (via npx):

```bash
npx serve .
```

> Recomendo o servidor local para testar a galeria 3D, o menu mobile e os links de WhatsApp com o comportamento real.

## 5. Como alterar o telefone (WhatsApp)

Edite `assets/js/config.js`:

```javascript
const CONFIG = {
  whatsapp: "55DDDNÚMEROAQUI", // formato: 55 + DDD + número, só dígitos
};
```

Exemplo: `554190000000`.

Todos os botões do site usam essa configuração.

## 6. Como alterar o nome da empresa

Edite `assets/js/config.js`:

```javascript
const CONFIG = {
  empresa: "C&M Automação e Elétrica", // nome completo (rodapé, título da página)
  logoNome: "C&M ELETRICA",            // nome curto no cabeçalho
};
```

O título da página, o cabeçalho e o rodapé se atualizam automaticamente.

## 7. Como adicionar novas imagens de obras

As obras da galeria 3D são controladas pelo array `PORTFOLIO` em `assets/js/config.js`. Cada item representa um cartão:

```javascript
{
  tag: "Comercial",
  titulo: "Título da Obra",
  descricao: "Descrição curta.",
  imagem: "assets/images/portfolio/obra-04/imagem-01.jpg",
  categoria: "Comercial"
}
```

Coloque as fotos em `assets/images/portfolio/obra-NN/`:

```text
assets/images/portfolio/
│
├── obra-01/
│   └── imagem-01.jpg
│
└── obra-02/
    └── imagem-01.jpg
```

Recomendações:

- Use imagens JPG ou WebP comprimidas (máximo ~200–400 KB cada).
- Mantenha a proporção aproximada 3:4 (cartão vertical da galeria) para boa exibição.
- Hoje o portfólio usa fotos de teste do Unsplash (links externos). Para o site definitivo, troque o campo `imagem` pelo caminho local da foto real e remova os `.svg` ilustrativos de `assets/images/portfolio/`.

## 8. Como adicionar novos serviços

Cada card de serviço (Residencial, Predial, Comercial, Industrial) fica no `index.html`, dentro da seção `#servicos`. Para editar ou adicionar itens:

1. Copie um bloco `<article class="pillar-card">...</article>`.
2. Altere o ícone (`data-lucide="..."`), título, textos e a lista de itens.
3. Opcionalmente adicione uma mensagem específica no `config.js` (`mensagemComercial`, etc.).

A lista de especialidades fica na seção `#especialidades` (itens `.service-item`).

## 9. Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `site-eletricista`).
2. Envie o projeto:

```bash
git init
git add .
git commit -m "feat: criação inicial do site"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/site-eletricista.git
git push -u origin main
```

3. No GitHub: **Settings → Pages** (ou *Environments → Pages*).
4. Em **Source**, escolha **Deploy from a branch** → branch `main` → pasta `/ (root)`.
5. Salve. Em alguns instantes o site fica disponível em:

```text
https://SEU_USUARIO.github.io/site-eletricista/
```

## 10. Como atualizar o site

Após alterar qualquer arquivo:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

O GitHub Pages atualiza automaticamente (leva 1–2 minutos).

## 11. Como fazer deploy em outras hospedagens gratuitas

- **Cloudflare Pages**: conecte o repositório no dashboard da Cloudflare e configure *build command* vazio e *output* = `/`.
- **Netlify**: *Add new site → Import an existing project* → escolha o repositório → *Deploy*.
- **Vercel**: *Add New → Project* → importe o repositório → *Deploy*.

Projetos estáticos sem build funcionam em qualquer uma delas sem configuração extra.

## 12. Futuras evoluções (não implementadas)

Formulário de orçamento, área administrativa, cadastro de serviços/obras, upload de imagens, depoimentos de clientes, blog, integração com Google Maps/Instagram, Google Analytics, Google Search Console, sistema de agendamento, banco de dados e backend.