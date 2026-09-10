# Estrutura do Projeto — C&M Automação e Elétrica

Este documento explica em detalhes a estrutura, cada arquivo e onde fazer alterações no dia a dia.

## 1. Estrutura das pastas

```text
site-eletricista/
│
├── index.html              → Página principal do site
├── README.md               → Guia rápido (instalação, deploy, edição)
├── .gitignore              → Arquivos que o Git não deve rastrear
│
├── assets/                 → Recursos do site
│   ├── css/
│   │   └── style.css       → Todo o CSS (leiaute + responsividade)
│   ├── js/
│   │   ├── config.js       → Dados editáveis da empresa
│   │   └── script.js       → Comportamentos do site
│   ├── images/
│   │   ├── logo/           → Logo e favicon
│   │   ├── hero/           → Imagem do banner principal
│   │   ├── servicos/       → Imagens dos serviços
│   │   └── portfolio/      → Fotos de obras (subpastas por obra)
│   └── icons/              → Ícones adicionais (não obrigatório)
│
└── docs/
    └── estrutura-projeto.md → Este documento
```

## 2. Responsabilidade de cada arquivo

| Arquivo | O que faz |
|---|---|
| `index.html` | Estrutura/semântica de toda a página (cabeçalho, seções, rodapé). |
| `assets/css/style.css` | Aparência, cores, espaçamentos, animações e responsividade. |
| `assets/js/config.js` | ***Único lugar*** para nome, WhatsApp, cidade e mensagens. |
| `assets/js/script.js` | Menu mobile, galeria 3D de obras, links de WhatsApp e preenchimento de textos. |
| `assets/images/*` | Imagens locais do site. |

## 3. Onde alterar informações da empresa

Arquivo: `assets/js/config.js`

```javascript
const CONFIG = {
  empresa: "C&M Automação e Elétrica",
  logoNome: "C&M ELETRICA",
  whatsapp: "554190000000",
  cidade: "Curitiba",
  atendimento: "Curitiba e Região Metropolitana",
  horario: "Atendimento 24 horas",
  mensagemPadrao: "...",
  mensagemResidencial: "...",
  mensagemPredial: "...",
  mensagemComercial: "...",
  mensagemIndustrial: "..."
};
```

Tudo que depende desses dados é preenchido automaticamente pelo `script.js` ao carregar a página (título, cabeçalho, rodapé, mensagens do WhatsApp, área de atendimento e ano atual).

## 4. Onde adicionar imagens

- **Logo / favicon:** `assets/images/logo/`
- **Banner do topo (hero):** `assets/images/hero/` — a imagem `hero-placeholder.svg` pode ser trocada ou referenciada no CSS (`style.css`, seção `.hero`).
- **Serviços:** `assets/images/servicos/`
- **Obras/portfólio:** `assets/images/portfolio/obra-NN/` — uma subpasta por obra.

### Como adicionar uma nova obra e suas fotos

As obras são controladas pelo array `PORTFOLIO` em `assets/js/config.js`.

1. Crie a pasta `assets/images/portfolio/obra-04/` e coloque as fotos (ex.: `imagem-01.jpg`, `imagem-02.jpg`).
2. Adicione um novo item no array `PORTFOLIO` (em `config.js`):

```javascript
{
  tag: "Comercial",                                  // categoria exibida no cartão
  titulo: "Título da Obra",
  descricao: "Descrição curta da obra.",
  imagem: "assets/images/portfolio/obra-04/imagem-01.jpg",  // capa do cartão 3D
  imagens: [                                          // fotos do lightbox ao clicar
    "assets/images/portfolio/obra-04/imagem-01.jpg",
    "assets/images/portfolio/obra-04/imagem-02.jpg"
  ],
  categoria: "Comercial"                              // mensagem usada no WhatsApp
}
```

3. O cartão usa `imagem` como capa. Ao clicar, abre a galeria (lightbox) com as fotos de `imagens` (setas, miniaturas e contador). Sem o campo `imagens`, o lightbox mostra apenas a capa.
4. O nome da `tag`/`categoria` é utilizado apenas para exibição e mensagem. Se adicionar uma categoria nova, inclua também `mensagemNovaCategoria` no `CONFIG`.

> **Imagens de teste:** hoje o portfólio usa fotos do Unsplash (links externos). Para o site definitivo, troque os campos `imagem`/`imagens` pelos caminhos locais das fotos reais (ex.: `assets/images/portfolio/obra-01/imagem-01.jpg`) e, se desejar, remova os arquivos ilustrativos `.svg` de `assets/images/portfolio/`.

## 5. Onde alterar serviços

### Categorias principais (cards)

No `index.html`, seção `#servicos`:

```html
<article class="pillar-card"> ... </article>
```

Cada card tem: ícone (`data-lucide`), título `<h3>`, descrição `<p>`, lista `<ul>` e botão de orçamento.

O botão chama `enviarOrcamento('Categoria')` — a categoria precisa existir como `mensagemCategoria` no `config.js`.

### Especialidades (lista técnica)

No `index.html`, seção `#especialidades`:

```html
<div class="service-item">
  <i data-lucide="check-circle-2" aria-hidden="true"></i>
  <span>Nome do serviço</span>
</div>
```

### Ícones disponíveis

O site usa [Lucide Icons](https://lucide.dev/icons). Substitua `data-lucide="home"` por outro nome de ícone válido, ex.: `zap`, `building-2`, `store`, `factory`, `shield-check`, `clock`, `map-pin`, `message-circle`, `arrow-right`, `phone-call`, `award`, `check-circle-2`, `briefcase`, `calculator`, `building`, `file-text`, `timer`, `menu`, `x`, `chevron-left`, `chevron-right`, `message-square`.

## 6. Onde alterar textos

- Textos estruturais (títulos, descrições): diretamente no `index.html`.
- Texto do WhatsApp: `config.js` (`mensagemPadrao`, `mensagemResidencial`, etc.).
- Título da página, área de atendimento, horário e ano: preenchidos a partir de `config.js`.

## 7. Onde configurar o WhatsApp

Único lugar: `assets/js/config.js`, campo `whatsapp`.

Formato: `55` + DDD + número, **somente dígitos**. Ex.: `554190000000`.

O `script.js` monta as URLs `https://api.whatsapp.com/send?phone=...&text=...` automaticamente para:

- Botão flutuante (canto inferior direito)
- Cabeçalho (`Solicitar Orçamento`)
- Cards de serviços
- CTA final
- Rodapé

## 8. Como criar uma nova obra no portfólio

Resumo dos passos:

1. Crie `assets/images/portfolio/obra-NN/` e copie as fotos da obra (ex.: `imagem-01.jpg`...).
2. Adicione um item ao array `PORTFOLIO` em `assets/js/config.js` (consulte a seção 4).
3. `imagem` define a capa do cartão 3D; `imagens` define as fotos do lightbox aberto ao clicar no cartão.
4. Interações: setas/lateral, passar o mouse centraliza o cartão; clique abre a galeria da obra. (Esc, setas do teclado e swipe fecham/navegam a galeria.)

## 9. CSS — pontos de atenção

- Cores em `:root` (topo do `style.css`).
- Cabeçalho fixo: altura `--header-height` (muda para 64px no mobile).
- `section { scroll-margin-top }` compensa o menu fixo ao navegar por âncoras.
- Responsividade: media queries em `@media (max-width: 1024px)`, `900px`, `768px`, `400px`.
- Acessibilidade: foco visível (`:focus-visible`), texto alternativo e suporte a `prefers-reduced-motion`.

## 10. JavaScript — comportamento

| Função | Local | O que faz |
|---|---|---|
| `gerarUrlWhatsApp(mensagem)` | `script.js` | Cria a URL do WhatsApp. |
| `enviarOrcamento(categoria)` | `script.js` | Abre o WhatsApp com mensagem padrão ou por categoria. |
| `montarCoverflow()` | `script.js` | Renderiza e anima a galeria 3D de obras (autoplay, setas, dots, toque, teclado) e o lightbox de fotos (`abrirLightbox`/`fecharLightbox`). |
| `aplicarConfiguracao()` | `script.js` | Preenche título, nome, rodapé, horário e ano. |
| `inicializarMenuMobile()` | `script.js` | Abre/fecha menu no mobile e trata tecla Esc. |

## 11. Como testar localmente

```bash
python -m http.server 8000
# ou
npx serve .
```

Abra `http://localhost:8000`.

## 12. Checklist de manutenção

Ao alterar algo, verifique:

- [ ] Links de âncora (`#servicos`, `#especialidades`, `#obras`, `#atendimento`) continuam funcionando
- [ ] Imagens têm `alt`
- [ ] Galeria 3D (Coverflow) navega pelas obras (setas, dots, toque)
- [ ] Clique no cartão abre a galeria de fotos da obra; Esc/setas fecham e navegam
- [ ] Menu mobile abre e fecha (e com a tecla Esc)
- [ ] Botões de WhatsApp abrem com a mensagem correta
- [ ] Responsividade em celular (nada ultrapassa a tela)