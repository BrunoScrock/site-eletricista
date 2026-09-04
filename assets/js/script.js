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
   CARROSSEL DO PORTFÓLIO
   -------------------------------------------------------------------------- */

// Navega entre as imagens de um card de portfólio
function navigateCard(botao, direcao) {
  const container = botao.closest(".portfolio-img");
  const img = container.querySelector("img");
  const contador = container.querySelector(".image-counter");

  const imagens = JSON.parse(container.dataset.images);
  let indice = parseInt(container.dataset.index || "0", 10);

  if (imagens.length <= 1) return;

  indice = (indice + direcao + imagens.length) % imagens.length;
  container.dataset.index = indice;

  img.style.opacity = "0.3";
  setTimeout(() => {
    img.src = imagens[indice];
    img.style.opacity = "1";
  }, 120);

  if (contador) {
    contador.textContent = `${indice + 1}/${imagens.length}`;
  }
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
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracao();

  // Oculta setas/contador quando o card possui apenas 1 imagem
  document.querySelectorAll(".portfolio-img").forEach((container) => {
    const imagens = JSON.parse(container.dataset.images || "[]");
    if (imagens.length <= 1) {
      container.querySelectorAll(".carousel-btn, .image-counter").forEach((el) => {
        el.style.display = "none";
      });
    }
  });

  inicializarMenuMobile();

  // Converte os ícones Lucide (se a biblioteca estiver carregada)
  if (window.lucide) window.lucide.createIcons();
});