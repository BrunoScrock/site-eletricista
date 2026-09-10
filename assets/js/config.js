/* ==========================================================================
   CONFIGURAÇÃO CENTRALIZADA
   --------------------------------------------------------------------------
   Altere aqui as informações da empresa em um único lugar.
   ========================================================================== */

const CONFIG = {
  // Nome e atividade da empresa
  empresa: "Charles M.",
  logoNome: "Charles M.",

  // Telefone WhatsApp no formato internacional: 55 + DDD + número (somente dígitos)
  whatsapp: "554190000000",

  // Região de atendimento
  cidade: "Curitiba",
  atendimento: "Curitiba e Região Metropolitana",

  // Horário de funcionamento
  horario: "Atendimento 24 horas",

  // Mensagens padrão enviadas no WhatsApp
  mensagemPadrao: "Olá! Gostaria de solicitar um orçamento para um serviço elétrico.",
  mensagemResidencial: "Olá! Gostaria de solicitar um orçamento para um serviço elétrico residencial.",
  mensagemPredial: "Olá! Gostaria de solicitar um orçamento para um serviço elétrico predial.",
  mensagemComercial: "Olá! Gostaria de solicitar um orçamento para um serviço elétrico comercial.",
  mensagemIndustrial: "Olá! Gostaria de solicitar um orçamento para um serviço elétrico industrial."
};

/* ==========================================================================
   PORTFÓLIO — OBRAS REALIZADAS (galeria 3D + lightbox)
   --------------------------------------------------------------------------
   Para adicionar/alterar uma obra, edite um item abaixo:
   - tag: categoria exibida no cartão
   - titulo: nome da obra
   - descricao: resumo curto
   - imagem: foto principal (capa) usada no cartão 3D
   - imagens: lista de fotos exibidas ao clicar no cartão (a primeira pode
     repetir a capa). Se a obra tiver só uma foto, use apenas "imagem".
   - categoria: palavra-chave usada na mensagem do WhatsApp
   ========================================================================== */

const PORTFOLIO = [
  // IMAGENS DE TESTE (Unsplash). Substitua pelos caminhos das fotos reais,
  // ex.: "assets/images/portfolio/obra-01/imagem-01.jpg"
  {
    tag: "Industrial",
    titulo: "Montagem de Quadro de Comando",
    descricao: "Quadro de comando montado com organização, identificação e segurança.",
    imagem: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=70"
    ],
    categoria: "Industrial"
  },
  {
    tag: "Predial",
    titulo: "Readequação de Centro de Medição",
    descricao: "Readequação do centro de medição para atender às novas cargas do edifício.",
    imagem: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=70"
    ],
    categoria: "Predial"
  },
  {
    tag: "Residencial",
    titulo: "Instalação de Projeto Luminotécnico",
    descricao: "Instalação de iluminação integrada e eficiente para o ambiente.",
    imagem: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=70",
    imagens: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=70",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=70"
    ],
    categoria: "Residencial"
  }
];