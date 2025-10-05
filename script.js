// ===============================
// ELEMENTOS PRINCIPAIS
// ===============================
const body = document.body;
const impactBtn = document.getElementById('impactCta');
const backBtn = document.getElementById('backBtn');
const screenImpact = document.getElementById('screen-impact');
const screenResults = document.getElementById('screen-results');
const cidade = document.getElementById('cidade');
const litoral = document.getElementById('litoral');
const rural = document.getElementById('rural');
var active_local = cidade.id
const icarus = document.getElementById('icarus');
const phaethon = document.getElementById('phaethon');
const apophis = document.getElementById('apophis');
var active_caixa_meteor = icarus.id
const impactCenter = document.getElementById('impactCenter'); // se ainda existir
const impactCanvas = document.getElementById('impactCanvas'); // canvas central
const ctx = impactCanvas.getContext('2d');

var active_map = 0
var active_meteor = 0

let isPrepared = false;
let inResults = false;

// ===============================
// BOTÃO VOLTAR
// ===============================
backBtn.addEventListener('click', () => {
  screenImpact.scrollIntoView({ behavior: "smooth" });
  impactBtn.classList.remove('as-arrow');
  isPrepared = false;
  inResults = false;
  body.classList.add("no-scroll");
});

// ===============================
// SELEÇÃO DOS LOCAIS E DOS METEOROS
// ===============================
cidade.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_map = 0
    document.getElementById(active_local).classList.remove('active')
    cidade.classList.add('active')
    active_local = cidade.id
    drawScaledMap()
});

litoral.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_map = 1
    document.getElementById(active_local).classList.remove('active')
    litoral.classList.add('active')
    active_local = litoral.id
    drawScaledMap()
});

rural.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_map = 2
    document.getElementById(active_local).classList.remove('active')
    rural.classList.add('active')
    active_local = rural.id
    drawScaledMap()
});

icarus.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_meteor = 0
    document.getElementById(active_caixa_meteor).classList.remove('selected')
    icarus.classList.add('selected')
    active_caixa_meteor = icarus.id
    drawScaledMap()
});

phaethon.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_meteor = 1
    document.getElementById(active_caixa_meteor).classList.remove('selected')
    phaethon.classList.add('selected')
    active_caixa_meteor = phaethon.id
    drawScaledMap()
});

apophis.addEventListener('click', () => {
    fixedImpact = null; // guarda posição fixa [row, col]
    craterasFixas = [];
    impactBtn.classList.remove("show-button");
    impactBtn.classList.add("hide-button");
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
    active_meteor = 2
    document.getElementById(active_caixa_meteor).classList.remove('selected')
    apophis.classList.add('selected')
    active_caixa_meteor = apophis.id
    drawScaledMap()
});


// ===============================
// BLOQUEIO DE SCROLL MANUAL
// ===============================
window.addEventListener('wheel', e => e.preventDefault(), { passive: false });
window.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

// ===============================
// MAPA E CANVAS
// ===============================

const TILE = 28;
const mapData = [
    [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2],
        [2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
        [2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
        [2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2],
        [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2],
        [2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
        [2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2],
        [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ],
    [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
    ],
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2]
    ]
];

const meteorData =[
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    [
        [1, 1]
    ]
]

const spriteSrc = {
  0: 'sprites/urban.png',
  1: 'sprites/campo.png',
  2: 'sprites/ocean.png',
  3: 'sprites/cratera.png'
};

const images = {};
const loadAll = Promise.all(
  Object.entries(spriteSrc).map(([type, src]) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => { images[type] = img; resolve(); };
      img.onerror = () => reject(new Error(`Erro ao carregar ${src}`));
    })
  )
);

const rows = 25;
const cols = 25;
const MAP_WIDTH = cols * TILE;
const MAP_HEIGHT = rows * TILE;

function drawScaledMap() {
  impactCanvas.width = 700;
  impactCanvas.height = 700;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, impactCanvas.width, impactCanvas.height);

  const overlap = 0.75;
  const sizec = 700 / (overlap * (cols - 1) + 1);
  const sizer = 700 / (overlap * (rows - 1) + 1);
  const stepX = sizec * overlap;
  const stepY = sizer * overlap;

  // Contadores
  const totalByType = {};       // total de tiles de cada tipo
  const destroyedByType = {};   // quantos de cada tipo foram degradados
  let totalDegraded = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const originalType = mapData[active_map][r][c];
      totalByType[originalType] = (totalByType[originalType] || 0) + 1;

      let tileType = originalType;
      let degraded = false;

      // Verifica se o tile está dentro de alguma cratera
      for (const crater of craterasFixas) {
        const meteorMatrix = meteorData[crater.meteor];
        const startR = crater.row;
        const startC = crater.col;

        if (
          r >= startR &&
          r < startR + meteorMatrix.length &&
          c >= startC &&
          c < startC + meteorMatrix[0].length
        ) {
          const localR = r - startR;
          const localC = c - startC;
          if (meteorMatrix[localR][localC] > 0) {
            degraded = true;
            break;
          }
        }
      }

      if (degraded) {
        tileType = 3; // terreno degradado
        totalDegraded++;
        destroyedByType[originalType] = (destroyedByType[originalType] || 0) + 1;
      }

      // Desenha o tile (normal ou degradado)
      const img = images[tileType];
      const x = c * stepX;
      const y = r * stepY;
      ctx.drawImage(img, x, y, sizec, sizer);
    }
  }

  // Exibe o relatório no console
  console.clear();
  console.log("===== RELATÓRIO DO TERRENO =====");
  console.log("Total de tiles:", rows * cols);
  for (const type in totalByType) {
    const intact = totalByType[type] - (destroyedByType[type] || 0);
    const destroyed = destroyedByType[type] || 0;
    console.log(`Tipo ${type}: ${intact} intactos | ${destroyed} destruídos`);
  }
  console.log("--------------------------------");
  console.log("Total degradados:", totalDegraded);
  console.log("Crateras registradas:", craterasFixas.length);
  console.log("================================");

  // --- PRÉ-VISUALIZAÇÃO DO IMPACTO (antes do clique) ---
  if (rowHover >= 0 && colHover >= 0 && active_meteor !== null) {
    const meteorMatrix = meteorData[active_meteor];
    const overlap = 0.75;
    const sizec = 700 / (overlap * (cols - 1) + 1);
    const sizer = 700 / (overlap * (rows - 1) + 1);
    const stepX = sizec * overlap;
    const stepY = sizer * overlap;

    ctx.save();
    ctx.globalAlpha = 0.4; // transparência da prévia

    for (let i = 0; i < meteorMatrix.length; i++) {
      for (let j = 0; j < meteorMatrix[0].length; j++) {
        if (meteorMatrix[i][j] > 0) {
          const x = (colHover + j) * stepX;
          const y = (rowHover + i) * stepY;
          ctx.drawImage(images[3], x, y, sizec, sizer); // usa o tile degradado como prévia
        }
      } 
    }

    ctx.restore();
  }
}


  let rowHover = -1;
  let colHover = -1;
  let fixedImpact = null; // guarda posição fixa [row, col]
  let craterasFixas = [];
  
  impactCanvas.addEventListener("mousemove", (e) => {
    const rect = impactCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
  
    // Mesma escala da função drawScaledMap()
    const overlap = 0.75;
    const sizec = 700 / (overlap * (cols - 1) + 1);
    const sizer = 700 / (overlap * (rows - 1) + 1);
    const stepX = sizec * overlap;
    const stepY = sizer * overlap;
  
    // Calcula índices do tile sob o cursor
    const col = Math.floor(mouseX / stepX);
    const row = Math.floor(mouseY / stepY);
  
    // Ignora se fora dos limites
    if (col < 0 || row < 0 || col >= cols || row >= rows) return;
  
    // Só redesenha se mudou de tile
    if (row !== rowHover || col !== colHover) {
      rowHover = row;
      colHover = col;
      
      if (!fixedImpact) {
        // Redesenha o mapa base
        drawScaledMap();
    
        // Pega a matriz do meteoro atual
        const meteorMatrix = meteorData[active_meteor];
        const mRows = meteorMatrix.length;
        const mCols = meteorMatrix[0].length;
    
        // Desenha a área de colisão a partir do tile atual (sem centralizar)
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    
        for (let i = 0; i < mRows; i++) {
          for (let j = 0; j < mCols; j++) {
            const value = meteorMatrix[i][j];

            if (value > 0) { // só desenha se for parte real da colisão
              const targetRow = row + i;
              const targetCol = col + j;
    
              // Confere limites
              if (
                targetRow >= 0 && targetRow < rows &&
                targetCol >= 0 && targetCol < cols
              ) {
                const x = targetCol * stepX;
                const y = targetRow * stepY;
                ctx.fillRect(x, y, sizec, sizer);
              }
            }
          }
        }
      }
  
      ctx.restore();
    }
  });
  
  impactCanvas.addEventListener("mouseleave", () => {
    drawScaledMap();
    drawFixedImpact();
    rowHover = -1;
    colHover = -1;
  });

// Evento de clique: fixa a posição atual do hover
impactCanvas.addEventListener("click", () => {
  // Só fixa a posição do impacto
  if (rowHover >= 0 && colHover >= 0) {
    fixedImpact = { row: rowHover, col: colHover };
    drawScaledMap();
    drawFixedImpact();
  }
});


function drawCraterasFixas() {
  const overlap = 0.75;
  const sizec = 700 / (overlap * (cols - 1) + 1);
  const sizer = 700 / (overlap * (rows - 1) + 1);
  const stepX = sizec * overlap;
  const stepY = sizer * overlap;

  craterasFixas.forEach(({ row, col, meteor }) => {
    const meteorMatrix = meteorData[meteor];
    for (let i = 0; i < meteorMatrix.length; i++) {
      for (let j = 0; j < meteorMatrix[0].length; j++) {
        if (meteorMatrix[i][j] > 0) {
          const x = (col + j) * stepX;
          const y = (row + i) * stepY;
          const img = images[3];
          ctx.drawImage(img, x, y, sizec, sizer);
        }
      }
    }
  });
}

// Redesenha impacto fixo atual (pré-impacto)
function drawFixedImpact() {
  if (!fixedImpact) return;

  const overlap = 0.75;
  const sizec = 700 / (overlap * (cols - 1) + 1);
  const sizer = 700 / (overlap * (rows - 1) + 1);
  const stepX = sizec * overlap;
  const stepY = sizer * overlap;

  const meteorMatrix = meteorData[active_meteor];
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "rgba(255, 50, 50, 0.6)";

  for (let i = 0; i < meteorMatrix.length; i++) {
    for (let j = 0; j < meteorMatrix[0].length; j++) {
      if (meteorMatrix[i][j] > 0) {
        const x = (fixedImpact.col + j) * stepX;
        const y = (fixedImpact.row + i) * stepY;
        ctx.fillRect(x, y, sizec, sizer);
      }
    }
  }
  ctx.restore();

  impactBtn.classList.add("show-button");
  impactBtn.classList.remove("hide-button");
}

impactBtn.addEventListener('click', () => {
  if (!fixedImpact) return;

  if (!isPrepared) {
    // Cria nova cratera apenas aqui
    craterasFixas.push({ row: fixedImpact.row, col: fixedImpact.col, meteor: active_meteor });

    drawScaledMap();
    drawCraterasFixas();

    impactBtn.classList.add('as-arrow');
    isPrepared = true;
  } else if (!inResults) {
    screenResults.scrollIntoView({ behavior: "smooth" });
    body.classList.remove("no-scroll");
    inResults = true;
  } else {
    impactBtn.classList.remove('as-arrow');
    isPrepared = false;
    inResults = false;
  }
});

// quando redimensionar a janela → recalcula
window.addEventListener('resize', () => {
  if (impactCanvas.classList.contains('show-canvas')) drawScaledMap();
});

loadAll.then(() => {
  console.log("Sprites carregados com sucesso!");
  drawScaledMap()
});