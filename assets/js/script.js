/* ==========================================================================
   C&M Automação e Elétrica — Funcionalidades principais
   ========================================================================== */

/* --------------------------------------------------------------------------
   WHATSAPP CENTRALIZADO
   -------------------------------------------------------------------------- */

// Gera a URL do WhatsApp com a mensagem informada
function gerarUrlWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem);
  return `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${texto}`;
}

// Abre o WhatsApp com a mensagem da categoria selecionada
function enviarOrcamento(categoria) {
  let mensagem = CONFIG.mensagemPadrao;

  if (categoria) {
    const chave = "mensagem" + categoria.charAt(0).toUpperCase() + categoria.slice(1);
    if (CONFIG[chave]) {
      mensagem = CONFIG[chave];
    }
  }

  window.open(gerarUrlWhatsApp(mensagem), "_blank", "noopener");
}

/* --------------------------------------------------------------------------
   GALERIA 3D (COVERFLOW) — OBRAS REALIZADAS
   -------------------------------------------------------------------------- */

function montarCoverflow() {
  const stage = document.getElementById("coverflow-stage");
  if (!stage) return;

  const ambBg = document.getElementById("coverflow-bg");
  const dotsContainer = document.getElementById("coverflow-dots");
  const btnPrev = document.getElementById("coverflow-prev");
  const btnNext = document.getElementById("coverflow-next");

  const itens = PORTFOLIO || [];
  if (!itens.length) return;

  let indice = 0;
  let touchX = 0;

  // Cria os cartões
  itens.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "coverflow-card";
    card.dataset.index = i;
    card.setAttribute("role", "tabpanel");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.titulo;
    img.loading = "lazy";
    img.draggable = false;
    card.appendChild(img);

    const vignette = document.createElement("div");
    vignette.className = "coverflow-vignette";
    card.appendChild(vignette);

    const content = document.createElement("div");
    content.className = "coverflow-content";
    content.innerHTML =
      '<span class="coverflow-tag">' +
      item.tag +
      "</span>" +
      '<div class="coverflow-body">' +
      '<h3 class="coverflow-title">' +
      item.titulo +
      "</h3>" +
      (item.descricao ? '<p class="coverflow-desc">' + item.descricao + "</p>" : "") +
      '<button class="coverflow-cta" data-categoria="' +
      (item.categoria || "") +
      '">Solicitar Orçamento</button>' +
      "</div>";
    card.appendChild(content);

    card.addEventListener("click", () => {
      if (indiceAtual(i) !== 0) irPara(i);
    });

    content.querySelector(".coverflow-cta").addEventListener("click", (e) => {
      e.stopPropagation();
      enviarOrcamento(e.currentTarget.dataset.categoria);
    });

    stage.appendChild(card);
  });

  const cards = Array.from(stage.children);

  // Dots de paginação
  itens.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "coverflow-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ir para obra " + (i + 1));
    dot.addEventListener("click", () => irPara(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function indiceAtual(i) {
    let d = (i - indice + itens.length) % itens.length;
    if (d > itens.length / 2) d -= itens.length;
    return d;
  }

  function atualizar() {
    const cardW = cards[0].offsetWidth || 310;
    const deslocamento = (fator, sinal) => Math.round(fator * cardW) * sinal;

    cards.forEach((card, i) => {
      const d = indiceAtual(i);
      const sinal = d < 0 ? -1 : 1;
      const abs = Math.abs(d);
      let transformo = "";
      let opacidade = 0;
      let z = 1;
      let filtro = "brightness(0.4) blur(2px)";
      let centro = false;

      if (d === 0) {
        transformo = "translateX(0px) scale(1) rotateY(0deg)";
        opacidade = 1;
        z = 30;
        filtro = "brightness(1)";
        centro = true;
      } else if (abs === 1) {
        transformo =
          "translateX(" + deslocamento(0.62, sinal) + "px) scale(0.84) rotateY(" + -24 * sinal + "deg)";
        opacidade = 0.6;
        z = 20;
        filtro = "brightness(0.75)";
      } else if (abs === 2) {
        transformo =
          "translateX(" + deslocamento(1.05, sinal) + "px) scale(0.68) rotateY(" + -38 * sinal + "deg)";
        opacidade = 0.35;
        z = 10;
        filtro = "brightness(0.55) blur(1px)";
      } else {
        transformo =
          "translateX(" + deslocamento(1.35, sinal) + "px) scale(0.55) rotateY(" + -45 * sinal + "deg)";
        opacidade = 0;
      }

      card.style.transform = transformo;
      card.style.opacity = opacidade;
      card.style.zIndex = z;
      card.style.filter = filtro;
      card.setAttribute("aria-hidden", centro ? "false" : "true");
      card.classList.toggle("is-center", centro);
    });

    if (ambBg) ambBg.src = itens[indice].imagem;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === indice);
      dot.setAttribute("aria-selected", i === indice ? "true" : "false");
    });
  }

  function proximo() {
    indice = (indice + 1) % itens.length;
    atualizar();
  }

  function anterior() {
    indice = (indice - 1 + itens.length) % itens.length;
    atualizar();
  }

  function irPara(i) {
    indice = (i + itens.length) % itens.length;
    atualizar();
  }

  btnPrev.addEventListener("click", anterior);
  btnNext.addEventListener("click", proximo);

  // Navegação por teclado (setas) quando o foco está na galeria
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      anterior();
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      proximo();
      e.preventDefault();
    }
  });

  // Gestos de toque (swipe)
  stage.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.touches[0].clientX;
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].clientX - touchX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) proximo();
        else anterior();
      }
    },
    { passive: true }
  );

  // Autoplay (pausa ao passar o mouse; desligado se o usuário prefere menos movimento)
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;

  function pararAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function iniciarAutoplay() {
    pararAutoplay();
    if (reduzirMovimento || itens.length <= 1) return;
    timer = setInterval(proximo, 5000);
  }

  const cover = document.getElementById("coverflow");
  if (cover) {
    cover.addEventListener("mouseenter", pararAutoplay);
    cover.addEventListener("mouseleave", iniciarAutoplay);
    cover.addEventListener("focusin", pararAutoplay);
    cover.addEventListener("focusout", iniciarAutoplay);
  }

  atualizar();
  iniciarAutoplay();
  if (window.lucide) window.lucide.createIcons();
}

/* --------------------------------------------------------------------------
   PREENCHIMENTO AUTOMÁTICO COM BASE NA CONFIGURAÇÃO
   -------------------------------------------------------------------------- */

function aplicarConfiguracao() {
  // Nome da empresa
  const logoNome = document.getElementById("logo-nome");
  const footerNome = document.getElementById("footer-nome");
  const copyrightNome = document.getElementById("copyright-nome");
  if (logoNome) logoNome.textContent = CONFIG.logoNome;
  if (footerNome) footerNome.textContent = CONFIG.empresa;
  if (copyrightNome) copyrightNome.textContent = CONFIG.empresa;

  // Título da página
  document.title = `${CONFIG.empresa} | Eletricista em ${CONFIG.cidade}`;

  // Horário
  const badgeHorario = document.getElementById("badge-horario");
  if (badgeHorario) badgeHorario.textContent = CONFIG.horario;

  // Área de atendimento
  const coverageText = document.getElementById("coverage-text");
  if (coverageText) coverageText.textContent = `Atendimento em ${CONFIG.atendimento}`;

  // Rodapé — contato
  const footerWhatsapp = document.getElementById("footer-whatsapp");
  const linkWhatsapp = footerWhatsapp ? footerWhatsapp.querySelector("a") : null;
  if (linkWhatsapp) {
    linkWhatsapp.setAttribute("href", gerarUrlWhatsApp(CONFIG.mensagemPadrao));
  }

  // Ano atual
  const anoAtual = document.getElementById("ano-atual");
  if (anoAtual) anoAtual.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   MENU MOBILE
   -------------------------------------------------------------------------- */

function inicializarMenuMobile() {
  const botao = document.getElementById("mobileMenuBtn");
  const menu = document.querySelector(".nav-menu");
  const icone = botao ? botao.querySelector("i") : null;

  if (!botao || !menu) return;

  const fecharMenu = () => {
    menu.classList.remove("active");
    if (botao) {
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    }
    if (icone) {
      icone.dataset.lucide = "menu";
    }
    if (window.lucide) window.lucide.createIcons();
  };

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("active");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    if (icone) {
      icone.dataset.lucide = aberto ? "x" : "menu";
    }
    if (window.lucide) window.lucide.createIcons();
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  // Fecha o menu ao pressionar Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      fecharMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   ANIMAÇÕES DE ENTRADA (REVEAL AO ROLAR)
   -------------------------------------------------------------------------- */

function iniciarReveal() {
  const seletores = [
    ".pillars-grid > *",
    ".why-grid > *",
    ".services-list-grid > *",
    ".section-title",
    ".coverage-box",
    ".coverflow",
    ".final-cta > .container > *"
  ];

  const alvos = document.querySelectorAll(seletores.join(","));
  if (!alvos.length || !("IntersectionObserver" in window)) return;

  alvos.forEach((el) => {
    el.classList.add("reveal");
    // Atraso escalonado suave entre os itens da mesma linha
    const indice = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.transitionDelay = `${(indice % 6) * 0.08}s`;
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  alvos.forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracao();

  montarCoverflow();

  iniciarReveal();

  inicializarMenuMobile();

  // Converte os ícones Lucide (se a biblioteca estiver carregada)
  if (window.lucide) window.lucide.createIcons();
});