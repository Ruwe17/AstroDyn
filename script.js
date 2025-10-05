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
  backBtn.classList.add("hide-button");
  backBtn.classList.remove("show-button");
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
    // 1º CLIQUE: prepara o impacto (vira seta)
    craterasFixas.push({ row: fixedImpact.row, col: fixedImpact.col, meteor: active_meteor });
    
    drawScaledMap();
    drawCraterasFixas();
    
    impactBtn.classList.add('as-arrow');
    isPrepared = true;
    
    // ← PARA AQUI! Não navega ainda
    
  } else if (isPrepared && !inResults) {
    // 2º CLIQUE: agora sim, vai para resultados
    updateResultsText(); // ← atualiza os textos antes de mostrar
    
    screenResults.scrollIntoView({ behavior: "smooth" });
    body.classList.remove("no-scroll");
    inResults = true;
    backBtn.classList.remove("hide-button");
    backBtn.classList.add("show-button");
  }
});
// ===============================
// SISTEMA DE TEXTOS DE IMPACTO
// ===============================

// Lista de cenários (você vai preencher com seus textos)
const impactScenarios = {
  // 2 Mar = 0-0-2
  "0-0-2": {
    socioeconomico: "A destruição de duas células oceânicas impacta diretamente a economia das comunidades costeiras. A pesca, principal fonte de renda para muitas famílias, sofre uma queda abrupta devido à morte de peixes e à destruição de áreas de reprodução. Isso leva à diminuição da oferta de pescado nos mercados locais, elevando os preços e tornando o alimento menos acessível para a população. Pequenos pescadores, que dependem do mar para sua subsistência, podem ser forçados a buscar outras atividades ou migrar para áreas urbanas em busca de trabalho, pressionando ainda mais os serviços públicos dessas regiões. O turismo, especialmente o ecoturismo e atividades recreativas ligadas ao mar, também é prejudicado, resultando em perda de empregos e redução da arrecadação local.",
    ambiental: "O impacto de dois meteoros no oceano provoca a morte de diversas espécies marinhas, incluindo peixes, moluscos e corais, rompendo cadeias alimentares e reduzindo a biodiversidade. Áreas de recifes e bancos de algas, essenciais para a reprodução e alimentação de muitas espécies, podem ser destruídas ou severamente danificadas. A liberação de sedimentos e poluentes no impacto pode causar zonas mortas, onde a vida marinha não consegue se restabelecer por longos períodos. Além disso, a alteração das correntes locais pode afetar a distribuição de nutrientes, prejudicando ainda mais a recuperação dos ecossistemas marinhos.",
    geologico: "O impacto de meteoros no fundo do mar pode criar crateras e liberar grandes quantidades de sedimentos, alterando o relevo submarino. Essas mudanças podem modificar as correntes marítimas locais e afetar a dinâmica costeira, aumentando o risco de erosão em praias próximas. Em casos mais severos, a movimentação do fundo oceânico pode gerar pequenas ondas de choque ou até tsunamis de baixa intensidade, ameaçando áreas costeiras. A instabilidade geológica resultante pode dificultar a recuperação dos habitats marinhos e aumentar a vulnerabilidade da região a futuros eventos extremos."
  },

  // 1 Mar, 1 Campo = 0-1-1
  "0-1-1": {
    socioeconomico: "O impacto simultâneo no oceano e em uma área rural cria uma crise dupla para as comunidades locais. De um lado, pescadores perdem parte de sua renda devido à redução da pesca, enquanto agricultores veem suas plantações e pastagens destruídas, comprometendo a produção de alimentos. Essa combinação eleva os preços tanto do pescado quanto dos produtos agrícolas, afetando o abastecimento das cidades próximas. Famílias que dependem dessas atividades podem ser forçadas a migrar, aumentando o êxodo rural e pressionando áreas urbanas. A perda de renda e empregos pode gerar instabilidade social e aumentar a dependência de programas de assistência governamental.",
    ambiental: "A destruição de uma célula oceânica e uma rural provoca a perda de biodiversidade em dois ambientes distintos, mas interligados. No mar, a morte de espécies e a degradação de habitats afetam toda a cadeia alimentar marinha. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. A poluição gerada pelo impacto pode se espalhar por cursos d’água, conectando os danos ambientais do campo ao mar e dificultando a recuperação dos ecossistemas.",
    geologico: "O impacto no fundo do mar cria crateras e pode alterar o relevo submarino, enquanto no campo, o solo pode sofrer compactação, erosão e formação de depressões. Essas mudanças aumentam o risco de deslizamentos e dificultam o uso futuro da terra para agricultura. A instabilidade geológica pode afetar a qualidade da água e tornar a região mais vulnerável a eventos naturais extremos, como enchentes e tempestades."
  },

  // 2 Campo = 0-2-0
  "0-2-0": {
    socioeconomico: "A destruição de duas células rurais afeta diretamente cerca de 1.200 pessoas, principalmente pequenos agricultores e suas famílias. A perda de lavouras e pastagens compromete a produção de alimentos, elevando os preços e gerando insegurança alimentar nas cidades próximas. A renda das famílias rurais diminui drasticamente, podendo levar ao abandono de propriedades e ao aumento do êxodo rural. Com menos pessoas no campo, vilarejos podem ser esvaziados, prejudicando a economia local e dificultando a manutenção de serviços públicos, como escolas e postos de saúde.",
    ambiental: "O impacto em áreas rurais provoca a destruição de vegetação nativa e de culturas agrícolas, acelerando a erosão do solo e a perda de nutrientes essenciais. A contaminação de rios e nascentes por sedimentos e poluentes pode afetar a qualidade da água, prejudicando não só a fauna e flora locais, mas também comunidades que dependem desses recursos. A perda de áreas verdes reduz a capacidade de regeneração ambiental e pode comprometer a biodiversidade da região por muitos anos.",
    geologico: "O solo impactado pode apresentar compactação, erosão acelerada e formação de crateras, dificultando o uso agrícola futuro. A instabilidade geológica aumenta o risco de deslizamentos e pode alterar o curso de pequenos rios e córregos, mudando a dinâmica hidrológica da região. Essas mudanças tornam a recuperação ambiental e produtiva mais lenta e custosa."
  },

  // 1 Mar, 1 Urbano = 1-0-1
  "1-0-1": {
    socioeconomico: "O impacto simultâneo no oceano e em uma área urbana afeta tanto a economia costeira quanto a vida nas cidades. A pesca sofre perdas, reduzindo a oferta de alimentos e a renda de pescadores, enquanto a destruição de infraestrutura urbana interrompe serviços essenciais, como transporte, saúde e educação. Famílias urbanas podem ser forçadas a se deslocar, pressionando bairros vizinhos e aumentando a demanda por abrigos e assistência social. A economia local é duplamente afetada, com queda na arrecadação e aumento do desemprego.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e podem causar desequilíbrios ecológicos. Na cidade, a geração de resíduos e a contaminação de solo e água agravam a poluição urbana, afetando a saúde pública e o meio ambiente. A proximidade entre os ambientes pode facilitar a dispersão de poluentes do mar para áreas urbanas e vice-versa.",
    geologico: "O impacto no fundo do mar pode criar crateras e liberar sedimentos, alterando o relevo submarino e as correntes locais. Na área urbana, a formação de crateras pode comprometer a estabilidade de edifícios e vias, dificultando a reconstrução e aumentando o risco de novos desastres, como deslizamentos ou inundações."
  },

  // 1 Campo, 1 Urbano = 1-1-0
  "1-1-0": {
    socioeconomico: "A destruição de uma célula rural e uma urbana afeta tanto a produção de alimentos quanto o acesso a serviços essenciais. Agricultores perdem renda e podem abandonar suas terras, enquanto famílias urbanas enfrentam a interrupção de serviços de saúde, educação e transporte. O aumento dos preços dos alimentos e a migração de pessoas do campo para a cidade pressionam ainda mais a infraestrutura urbana, podendo gerar instabilidade social e econômica.",
    ambiental: "A degradação do solo rural e a poluição urbana afetam a qualidade ambiental da região como um todo. A perda de áreas verdes e a contaminação de rios e solos prejudicam a biodiversidade e dificultam a regeneração dos ecossistemas. A conexão entre campo e cidade pode facilitar a propagação de poluentes e agravar os impactos ambientais.",
    geologico: "Crateras em áreas urbanas e rurais modificam o relevo e podem aumentar o risco de deslizamentos, erosão e inundações. A instabilidade do solo dificulta a recuperação das áreas atingidas e pode comprometer o uso futuro para agricultura ou construção."
  },

  // 2 Urbano = 2-0-0
  "2-0-0": {
    socioeconomico: "A destruição de duas células urbanas afeta cerca de 20.000 pessoas, interrompendo o funcionamento de hospitais, escolas e comércios. Muitas famílias perdem suas casas e empregos, sendo forçadas a buscar abrigo em bairros vizinhos ou cidades próximas. O aumento da demanda por serviços públicos pode sobrecarregar a infraestrutura local, dificultando o atendimento das necessidades básicas da população. O desemprego e a queda na arrecadação de impostos agravam a crise econômica e social.",
    ambiental: "A destruição urbana gera grandes volumes de resíduos e poluição, contaminando o solo e a água. A perda de áreas verdes reduz a capacidade de absorção de água da chuva, aumentando o risco de enchentes e dificultando a regeneração ambiental. A poluição pode se espalhar para rios e lençóis freáticos, afetando a saúde pública e o meio ambiente.",
    geologico: "A formação de crateras e a instabilidade do solo podem comprometer a estrutura de edifícios remanescentes e dificultar a reconstrução. O relevo urbano pode ser alterado permanentemente, aumentando o risco de novos desastres naturais, como deslizamentos e inundações."
  },
  "0-0-4": {
    socioeconomico: "A destruição de quatro células oceânicas representa um golpe severo para a economia das comunidades costeiras. A pesca, principal fonte de renda e alimentação para muitas famílias, sofre uma queda acentuada, levando à escassez de pescado nos mercados e ao aumento dos preços. Pequenos pescadores e trabalhadores do setor podem perder seus empregos, intensificando o desemprego e a migração para áreas urbanas. O turismo, especialmente o ecoturismo e atividades recreativas ligadas ao mar, também é prejudicado, resultando em perda de receitas e diminuição da atividade econômica local.",
    ambiental: "O impacto de quatro meteoros no oceano provoca a morte de inúmeras espécies marinhas e a destruição de habitats críticos, como recifes de corais e bancos de algas. A biodiversidade sofre uma redução significativa, e cadeias alimentares inteiras podem ser desestabilizadas. A liberação de sedimentos e poluentes pode criar zonas mortas, onde a vida marinha não consegue se restabelecer facilmente. A recuperação desses ecossistemas pode levar décadas, e algumas espécies podem desaparecer localmente.",
    geologico: "Os impactos criam crateras no fundo do mar, alterando o relevo submarino e potencialmente mudando as correntes marítimas locais. A movimentação de sedimentos pode afetar a estabilidade de áreas costeiras, aumentando o risco de erosão e até de pequenos tsunamis. Essas alterações geológicas podem dificultar a regeneração dos habitats marinhos e aumentar a vulnerabilidade da região a futuros eventos extremos."
  },

  // 3 Mar, 1 Campo = 0-1-3
  "0-1-3": {
    socioeconomico: "A combinação de três impactos no oceano e um no campo gera uma crise complexa. A pesca sofre grandes perdas, prejudicando a renda de pescadores e a oferta de alimentos. No campo, agricultores perdem plantações e pastagens, comprometendo a produção agrícola e a subsistência de famílias rurais. O aumento dos preços de alimentos e pescado afeta o abastecimento das cidades, enquanto a perda de renda pode levar ao êxodo rural e à migração para áreas urbanas, pressionando ainda mais os serviços públicos.",
    ambiental: "A morte de espécies marinhas e a destruição de habitats oceânicos reduzem a biodiversidade e desestabilizam cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. A poluição gerada pelo impacto pode se espalhar por cursos d’água, conectando os danos ambientais do campo ao mar e dificultando a recuperação dos ecossistemas.",
    geologico: "Crateras no fundo do mar e no solo rural alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e a estabilidade das áreas costeiras."
  },

  // 2 Mar, 2 Campo = 0-2-2
  "0-2-2": {
    socioeconomico: "A destruição de duas células oceânicas e duas rurais afeta tanto a pesca quanto a produção agrícola. Famílias de pescadores e agricultores perdem renda, elevando os preços de alimentos e pescado nas cidades próximas. O desemprego pode aumentar, levando à migração para centros urbanos e pressionando a infraestrutura dessas regiões. Pequenas comunidades rurais e costeiras podem ser especialmente vulneráveis, enfrentando dificuldades para se recuperar economicamente.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. A poluição pode se espalhar entre os ambientes, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água.",
    geologico: "Crateras no fundo do mar e no solo rural alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e a estabilidade das áreas costeiras."
  },

  // 1 Mar, 3 Campo = 0-3-1
  "0-3-1": {
    socioeconomico: "O impacto em uma célula oceânica e três rurais afeta diretamente a renda de pescadores e agricultores. A produção de alimentos e pescado diminui, elevando preços e gerando insegurança alimentar nas cidades próximas. O desemprego pode aumentar, levando ao abandono de pequenas propriedades rurais e à migração para áreas urbanas, pressionando ainda mais os serviços públicos.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. A poluição pode se espalhar entre os ambientes, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água.",
    geologico: "Crateras no fundo do mar e no solo rural alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e a estabilidade das áreas costeiras."
  },

  // 4 Campo = 0-4-0
  "0-4-0": {
    socioeconomico: "A destruição de quatro células rurais afeta cerca de 2.400 pessoas, principalmente pequenos agricultores e suas famílias. A perda de lavouras e pastagens compromete a produção de alimentos, elevando os preços e gerando insegurança alimentar nas cidades próximas. A renda das famílias rurais diminui drasticamente, podendo levar ao abandono de propriedades e ao aumento do êxodo rural. Vilarejos podem ser esvaziados, prejudicando a economia local e dificultando a manutenção de serviços públicos.",
    ambiental: "O impacto em áreas rurais provoca a destruição de vegetação nativa e de culturas agrícolas, acelerando a erosão do solo e a perda de nutrientes essenciais. A contaminação de rios e nascentes por sedimentos e poluentes pode afetar a qualidade da água, prejudicando não só a fauna e flora locais, mas também comunidades que dependem desses recursos. A perda de áreas verdes reduz a capacidade de regeneração ambiental e pode comprometer a biodiversidade da região por muitos anos.",
    geologico: "O solo impactado pode apresentar compactação, erosão acelerada e formação de crateras, dificultando o uso agrícola futuro. A instabilidade geológica aumenta o risco de deslizamentos e pode alterar o curso de pequenos rios e córregos, mudando a dinâmica hidrológica da região. Essas mudanças tornam a recuperação ambiental e produtiva mais lenta e custosa."
  },

  // 3 Mar, 1 Urbano = 1-0-3
  "1-0-3": {
    socioeconomico: "A destruição de três células oceânicas e uma urbana afeta tanto a economia costeira quanto a vida nas cidades. A pesca sofre grandes perdas, reduzindo a oferta de alimentos e a renda de pescadores, enquanto a destruição de infraestrutura urbana interrompe serviços essenciais, como transporte, saúde e educação. Famílias urbanas podem ser forçadas a se deslocar, pressionando bairros vizinhos e aumentando a demanda por abrigos e assistência social. A economia local é duplamente afetada, com queda na arrecadação e aumento do desemprego.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e podem causar desequilíbrios ecológicos. Na cidade, a geração de resíduos e a contaminação de solo e água agravam a poluição urbana, afetando a saúde pública e o meio ambiente. A proximidade entre os ambientes pode facilitar a dispersão de poluentes do mar para áreas urbanas e vice-versa.",
    geologico: "O impacto no fundo do mar pode criar crateras e liberar sedimentos, alterando o relevo submarino e as correntes locais. Na área urbana, a formação de crateras pode comprometer a estabilidade de edifícios e vias, dificultando a reconstrução e aumentando o risco de novos desastres, como deslizamentos ou inundações."
  },
  // 2 mar, 1 campo, 1 urbano = 1-1-2
  "1-1-2": {
    socioeconomico: "A destruição de duas células oceânicas, uma rural e uma urbana cria uma crise multifacetada. A pesca sofre perdas significativas, reduzindo a renda de pescadores e a oferta de pescado, o que pode elevar os preços nos mercados locais. No campo, agricultores perdem plantações e pastagens, comprometendo a produção de alimentos e a subsistência de famílias rurais. Na cidade, cerca de 10.000 pessoas são afetadas pela destruição de infraestrutura, com interrupção de serviços essenciais e deslocamento de famílias. O desemprego aumenta tanto nas áreas costeiras quanto urbanas, e a pressão sobre serviços públicos e programas de assistência social cresce, especialmente nas cidades vizinhas que recebem migrantes.",
    ambiental: "O impacto no oceano provoca a morte de espécies marinhas e a degradação de habitats críticos, como recifes e bancos de algas, reduzindo a biodiversidade e afetando cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. Na área urbana, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A conexão entre os ambientes facilita a propagação de poluentes, dificultando a regeneração dos ecossistemas.",
    geologico: "Crateras no fundo do mar, no solo rural e na cidade alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
  },

  // 1 mar, 2 campo, 1 urbano = 1-2-1
  "1-2-1": {
    socioeconomico: "O impacto em uma célula oceânica, duas rurais e uma urbana afeta diferentes setores da economia local. A pesca sofre uma queda, prejudicando a renda de pescadores. No campo, cerca de 1.200 pessoas perdem parte de sua produção agrícola, elevando os preços dos alimentos e gerando insegurança alimentar. Na cidade, a destruição de infraestrutura interrompe serviços essenciais e pode forçar famílias a buscar abrigo em bairros vizinhos. O desemprego aumenta em todos os setores, e a migração de pessoas do campo e da costa para áreas urbanas pressiona ainda mais os serviços públicos.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. Na área urbana, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental. A poluição pode se espalhar entre os ambientes, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água.",
    geologico: "Crateras no fundo do mar, no solo rural e na cidade alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
  },

  // 1 mar, 1 campo, 2 urbano = 2-1-1
  "2-1-1": {
    socioeconomico: "A destruição de uma célula oceânica, uma rural e duas urbanas afeta cerca de 20.000 pessoas nas cidades, além de pescadores e agricultores. A pesca sofre perdas, reduzindo a oferta de alimentos e a renda de comunidades costeiras. No campo, a produção agrícola diminui, elevando preços e gerando insegurança alimentar. Nas áreas urbanas, a destruição de infraestrutura interrompe serviços essenciais, força o deslocamento de famílias e aumenta o desemprego. O impacto combinado pressiona a economia local e pode levar a migração em massa para cidades vizinhas.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A conexão entre os ambientes facilita a propagação de poluentes, dificultando a regeneração dos ecossistemas.",
    geologico: "Crateras no fundo do mar, no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
  },

  // 3 campo, 1 urbano = 1-3-0
  "1-3-0": {
    socioeconomico: "A destruição de três células rurais e uma urbana afeta diretamente cerca de 1.800 pessoas no campo e 10.000 na cidade. Agricultores perdem lavouras e pastagens, comprometendo a produção de alimentos e a renda das famílias rurais. O êxodo rural pode se intensificar, com pessoas migrando para áreas urbanas em busca de trabalho. Na cidade, a destruição de infraestrutura interrompe serviços essenciais, força o deslocamento de famílias e aumenta o desemprego. O impacto combinado pressiona a economia local e pode levar a migração em massa para cidades vizinhas.",
    ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais no campo. Na área urbana, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A perda de áreas verdes e a contaminação de recursos hídricos dificultam a regeneração dos ecossistemas e comprometem a qualidade de vida.",
    geologico: "Crateras no solo rural e na cidade alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção."
  },

  // 2 mar, 2 urbano = 2-0-2
  "2-0-2": {
    socioeconomico: "A destruição de duas células oceânicas e duas urbanas afeta tanto a economia costeira quanto a vida nas cidades. A pesca sofre perdas, reduzindo a oferta de alimentos e a renda de pescadores. Nas áreas urbanas, cerca de 20.000 pessoas são afetadas pela destruição de infraestrutura, com interrupção de serviços essenciais e deslocamento de famílias. O desemprego aumenta em ambos os setores, e a pressão sobre serviços públicos e programas de assistência social cresce, especialmente nas cidades vizinhas que recebem migrantes.",
    ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A proximidade entre os ambientes pode facilitar a dispersão de poluentes do mar para áreas urbanas e vice-versa.",
    geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
  },
  // 2 campo, 2 urbano = 2-2-0
"2-2-0": {
  socioeconomico: "A destruição de duas células rurais e duas urbanas afeta diretamente cerca de 1.200 pessoas no campo e 20.000 nas cidades. No campo, agricultores perdem lavouras e pastagens, comprometendo a produção de alimentos e a renda das famílias rurais. Isso pode elevar os preços dos alimentos e incentivar o êxodo rural, com pessoas migrando para áreas urbanas em busca de trabalho. Nas cidades, a destruição de infraestrutura essencial, como hospitais, escolas e comércios, interrompe serviços básicos e força o deslocamento de famílias, sobrecarregando bairros vizinhos e aumentando a demanda por assistência social. O desemprego cresce em ambos os setores, e a economia local sofre com a queda na arrecadação e o aumento da dependência de programas públicos.",
  ambiental: "No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas áreas urbanas, a geração de grandes volumes de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública e a qualidade de vida. A perda de áreas verdes urbanas reduz a capacidade de absorção de água da chuva, aumentando o risco de enchentes e dificultando a recuperação ambiental.",
  geologico: "Crateras formadas no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção, tornando a região mais vulnerável a eventos naturais extremos."
},

// 1 mar, 3 urbano = 3-0-1
"3-0-1": {
  socioeconomico: "O impacto em uma célula oceânica e três urbanas afeta tanto a economia costeira quanto a vida nas cidades. A pesca sofre perdas, reduzindo a oferta de alimentos e a renda de pescadores, o que pode elevar os preços do pescado e prejudicar a subsistência de comunidades costeiras. Nas áreas urbanas, cerca de 30.000 pessoas são afetadas pela destruição de infraestrutura, com interrupção de serviços essenciais, como transporte, saúde e educação. Muitas famílias podem ser forçadas a buscar abrigo em bairros vizinhos, sobrecarregando a infraestrutura local e aumentando a demanda por assistência social. O desemprego cresce, e a economia local sofre com a queda na arrecadação e o aumento da dependência de programas públicos.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A proximidade entre os ambientes pode facilitar a dispersão de poluentes do mar para áreas urbanas e vice-versa, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 4 urbano = 4-0-0
"4-0-0": {
  socioeconomico: "A destruição de quatro células urbanas afeta diretamente cerca de 40.000 pessoas, interrompendo o funcionamento de hospitais, escolas, comércios e redes de transporte. Muitas famílias perdem suas casas e empregos, sendo forçadas a buscar abrigo em bairros vizinhos ou cidades próximas. O aumento da demanda por serviços públicos pode sobrecarregar a infraestrutura local, dificultando o atendimento das necessidades básicas da população. O desemprego cresce, e a economia local sofre com a queda na arrecadação de impostos e o aumento da dependência de programas públicos. O trauma coletivo e a instabilidade social podem persistir por anos, exigindo políticas públicas de longo prazo para recuperação.",
  ambiental: "A destruição urbana gera grandes volumes de resíduos e poluição, contaminando o solo e a água. A perda de áreas verdes reduz a capacidade de absorção de água da chuva, aumentando o risco de enchentes e dificultando a regeneração ambiental. A poluição pode se espalhar para rios e lençóis freáticos, afetando a saúde pública e o meio ambiente. A recuperação ambiental é lenta, e áreas degradadas podem se tornar improdutivas por anos.",
  geologico: "A formação de crateras e a instabilidade do solo podem comprometer a estrutura de edifícios remanescentes e dificultar a reconstrução. O relevo urbano pode ser alterado permanentemente, aumentando o risco de novos desastres naturais, como deslizamentos e inundações. A instabilidade geológica pode tornar algumas áreas inabitáveis ou impróprias para reconstrução, exigindo adaptações permanentes na ocupação do território."
},
// 5 mar, 3 campo, 4 urbano = 4-3-5
"4-3-5": {
  socioeconomico: "A destruição de cinco células oceânicas, três rurais e quatro urbanas desencadeia uma crise regional. A pesca sofre um colapso, prejudicando a renda de pescadores e a oferta de pescado, o que eleva os preços e gera desemprego nas comunidades costeiras. No campo, cerca de 1.800 pessoas perdem suas lavouras e pastagens, comprometendo a produção de alimentos e forçando o êxodo rural. Nas cidades, 40.000 pessoas são afetadas pela destruição de infraestrutura, com interrupção de serviços essenciais, deslocamento de famílias e aumento do desemprego. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A conexão entre os ambientes facilita a propagação de poluentes, tornando a recuperação ambiental ainda mais desafiadora.",
  geologico: "Crateras no fundo do mar, no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 4 mar, 4 campo, 4 urbano = 4-4-4
"4-4-4": {
  socioeconomico: "O impacto equilibrado entre mar, campo e cidade afeta todos os setores da sociedade. A pesca e a produção agrícola sofrem quedas expressivas, elevando os preços dos alimentos e do pescado. Cerca de 2.400 pessoas no campo e 40.000 nas cidades perdem renda, moradia ou acesso a serviços essenciais. O desemprego cresce, e a migração de pessoas do campo e da costa para áreas urbanas pressiona ainda mais a infraestrutura das cidades, que já estão sobrecarregadas pela destruição de bairros inteiros.",
  ambiental: "A biodiversidade marinha e terrestre é severamente reduzida, com morte de espécies, destruição de habitats e contaminação de solos e águas. A erosão, a perda de áreas verdes e a poluição dificultam a regeneração dos ecossistemas. A poluição pode se espalhar entre os ambientes, comprometendo a qualidade da água e a saúde dos ecossistemas.",
  geologico: "Crateras e instabilidade do solo aparecem em todos os ambientes, aumentando o risco de deslizamentos, erosão e mudanças nos cursos d’água. A recuperação ambiental e produtiva torna-se lenta e custosa, e algumas áreas podem se tornar impróprias para uso por longos períodos."
},

// 3 mar, 5 campo, 4 urbano = 4-5-3
"4-5-3": {
  socioeconomico: "A destruição de três células oceânicas, cinco rurais e quatro urbanas afeta profundamente a economia regional. A pesca e a produção agrícola sofrem grandes perdas, elevando preços e gerando insegurança alimentar. Cerca de 3.000 pessoas no campo e 40.000 nas cidades são diretamente impactadas, com aumento do desemprego, migração e sobrecarga dos serviços públicos urbanos. O êxodo rural e costeiro pode transformar vilarejos e comunidades em áreas quase abandonadas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. A contaminação de rios e solos pode afetar a qualidade da água e a saúde pública. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 2 mar, 6 campo, 4 urbano = 4-6-2
"4-6-2": {
  socioeconomico: "A destruição de duas células oceânicas, seis rurais e quatro urbanas compromete a base econômica da região. A pesca e a produção agrícola sofrem quedas drásticas, elevando preços e gerando insegurança alimentar. Cerca de 3.600 pessoas no campo e 40.000 nas cidades são afetadas, com aumento do desemprego, migração e sobrecarga dos serviços públicos urbanos. O êxodo rural e costeiro pode transformar vilarejos e comunidades em áreas quase abandonadas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. A contaminação de rios e solos pode afetar a qualidade da água e a saúde pública. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 7 campo, 4 urbano = 4-7-1
"4-7-1": {
  socioeconomico: "A destruição de uma célula oceânica, sete rurais e quatro urbanas afeta profundamente a economia local. A pesca sofre perdas, mas o maior impacto recai sobre a produção agrícola, com cerca de 4.200 pessoas no campo perdendo renda e subsistência. Nas cidades, 40.000 pessoas são afetadas pela destruição de infraestrutura, com aumento do desemprego e migração. O êxodo rural pode esvaziar vilarejos e pressionar ainda mais os serviços urbanos.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. A contaminação de rios e solos pode afetar a qualidade da água e a saúde pública. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 8 campo, 4 urbano = 4-8-0
"4-8-0": {
  socioeconomico: "A destruição de oito células rurais e quatro urbanas compromete a produção agrícola de uma vasta região, afetando cerca de 4.800 pessoas no campo e 40.000 nas cidades. O abastecimento de alimentos é prejudicado, elevando preços e gerando insegurança alimentar. O desemprego cresce, e o êxodo rural pode esvaziar vilarejos, enquanto as cidades enfrentam sobrecarga dos serviços públicos e aumento da demanda por assistência social.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção."
},

// 7 mar, 5 urbano = 5-0-7
"5-0-7": {
  socioeconomico: "A destruição de sete células oceânicas e cinco urbanas afeta drasticamente a economia costeira e urbana. A pesca entra em colapso, prejudicando a renda de pescadores e a oferta de pescado, enquanto cerca de 50.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 6 mar, 1 campo, 5 urbano = 5-1-6
"5-1-6": {
  socioeconomico: "A destruição de seis células oceânicas, uma rural e cinco urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 50.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 5 mar, 2 campo, 5 urbano = 5-2-5
"5-2-5": {
  socioeconomico: "A destruição de cinco células oceânicas, duas rurais e cinco urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 50.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 4 mar, 3 campo, 5 urbano = 5-3-4
"5-3-4": {
  socioeconomico: "A destruição de quatro células oceânicas, três rurais e cinco urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 50.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 3 mar, 4 campo, 5 urbano = 5-4-3
"5-4-3": {
  socioeconomico: "A destruição de três células oceânicas, quatro rurais e cinco urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 50.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},
// 2 mar, 5 campo, 5 urbano = 5-5-2
"5-5-2": {
  socioeconomico: "A destruição de duas células oceânicas, cinco rurais e cinco urbanas provoca uma crise abrangente. A pesca sofre perdas, reduzindo a oferta de pescado e a renda de pescadores. No campo, cerca de 3.000 pessoas perdem lavouras e pastagens, comprometendo a produção de alimentos e forçando o êxodo rural. Nas cidades, 50.000 pessoas são afetadas pela destruição de infraestrutura, com interrupção de serviços essenciais, aumento do desemprego e deslocamento de famílias. O impacto combinado eleva preços, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. No campo, a erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública. A conexão entre os ambientes facilita a propagação de poluentes, dificultando a regeneração dos ecossistemas.",
  geologico: "Crateras no fundo do mar, no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 6 campo, 5 urbano = 5-6-1
"5-6-1": {
  socioeconomico: "O impacto em uma célula oceânica, seis rurais e cinco urbanas afeta profundamente a economia local. A pesca sofre perdas, mas o maior impacto recai sobre a produção agrícola, com cerca de 3.600 pessoas no campo perdendo renda e subsistência. Nas cidades, 50.000 pessoas enfrentam destruição de infraestrutura, desemprego e deslocamento. O êxodo rural pode esvaziar vilarejos e pressionar ainda mais os serviços urbanos, elevando preços e aumentando a dependência de programas públicos.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. A contaminação de rios e solos pode afetar a qualidade da água e a saúde pública. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 7 campo, 5 urbano = 5-7-0
"5-7-0": {
  socioeconomico: "A destruição de sete células rurais e cinco urbanas compromete a produção agrícola de uma vasta região, afetando cerca de 4.200 pessoas no campo e 50.000 nas cidades. O abastecimento de alimentos é prejudicado, elevando preços e gerando insegurança alimentar. O desemprego cresce, e o êxodo rural pode esvaziar vilarejos, enquanto as cidades enfrentam sobrecarga dos serviços públicos e aumento da demanda por assistência social.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção."
},

// 6 mar, 6 urbano = 6-0-6
"6-0-6": {
  socioeconomico: "A destruição de seis células oceânicas e seis urbanas afeta drasticamente a economia costeira e urbana. A pesca entra em colapso, prejudicando a renda de pescadores e a oferta de pescado, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 5 mar, 1 campo, 6 urbano = 6-1-5
"6-1-5": {
  socioeconomico: "A destruição de cinco células oceânicas, uma rural e seis urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 4 mar, 2 campo, 6 urbano = 6-2-4
"6-2-4": {
  socioeconomico: "A destruição de quatro células oceânicas, duas rurais e seis urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 3 mar, 3 campo, 6 urbano = 6-3-3
"6-3-3": {
  socioeconomico: "A destruição de três células oceânicas, três rurais e seis urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 2 mar, 4 campo, 6 urbano = 6-4-2
"6-4-2": {
  socioeconomico: "A destruição de duas células oceânicas, quatro rurais e seis urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 5 campo, 6 urbano = 6-5-1
"6-5-1": {
  socioeconomico: "A destruição de uma célula oceânica, cinco rurais e seis urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 60.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 6 campo, 6 urbano = 6-6-0
"6-6-0": {
  socioeconomico: "A destruição de seis células rurais e seis urbanas compromete a produção agrícola de uma vasta região, afetando cerca de 3.600 pessoas no campo e 60.000 nas cidades. O abastecimento de alimentos é prejudicado, elevando preços e gerando insegurança alimentar. O desemprego cresce, e o êxodo rural pode esvaziar vilarejos, enquanto as cidades enfrentam sobrecarga dos serviços públicos e aumento da demanda por assistência social.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção."
},
// 5 mar, 7 urbano = 7-0-5
"7-0-5": {
  socioeconomico: "A destruição de cinco células oceânicas e sete urbanas provoca uma crise aguda tanto nas cidades quanto nas comunidades costeiras. A pesca entra em colapso, prejudicando a renda de pescadores e a oferta de pescado, o que eleva os preços e gera desemprego nas regiões litorâneas. Nas áreas urbanas, cerca de 70.000 pessoas são afetadas pela destruição de bairros inteiros, hospitais, escolas e comércios. O desemprego dispara, há migração em massa e cidades vizinhas ficam sobrecarregadas. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à dependência de programas de assistência social.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas cidades, a geração de grandes volumes de resíduos, poluição do solo e da água, e perda de áreas verdes agravam a situação ambiental, podendo afetar a saúde pública e dificultar a regeneração dos ecossistemas urbanos e costeiros.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas costeiras, tornando algumas regiões inabitáveis ou impróprias para uso por longos períodos."
},

// 4 mar, 1 campo, 7 urbano = 7-1-4
"7-1-4": {
  socioeconomico: "A destruição de quatro células oceânicas, uma rural e sete urbanas afeta drasticamente a economia costeira, agrícola e urbana. A pesca sofre grandes perdas, enquanto agricultores perdem parte de sua produção e renda. Nas cidades, 70.000 pessoas enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado eleva preços, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental, podendo afetar a saúde pública e a qualidade de vida.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 3 mar, 2 campo, 7 urbano = 7-2-3
"7-2-3": {
  socioeconomico: "A destruição de três células oceânicas, duas rurais e sete urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 70.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 2 mar, 3 campo, 7 urbano = 7-3-2
"7-3-2": {
  socioeconomico: "A destruição de duas células oceânicas, três rurais e sete urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 70.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 4 campo, 7 urbano = 7-4-1
"7-4-1": {
  socioeconomico: "A destruição de uma célula oceânica, quatro rurais e sete urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 70.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 5 campo, 7 urbano = 7-5-0
"7-5-0": {
  socioeconomico: "A destruição de cinco células rurais e sete urbanas compromete a produção agrícola de uma vasta região, afetando cerca de 3.000 pessoas no campo e 70.000 nas cidades. O abastecimento de alimentos é prejudicado, elevando preços e gerando insegurança alimentar. O desemprego cresce, e o êxodo rural pode esvaziar vilarejos, enquanto as cidades enfrentam sobrecarga dos serviços públicos e aumento da demanda por assistência social.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura e construção."
},

// 4 mar, 8 urbano = 8-0-4
"8-0-4": {
  socioeconomico: "A destruição de quatro células oceânicas e oito urbanas afeta drasticamente a economia costeira e urbana. A pesca sofre grandes perdas, enquanto cerca de 80.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 3 mar, 1 campo, 8 urbano = 8-1-3
"8-1-3": {
  socioeconomico: "A destruição de três células oceânicas, uma rural e oito urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 80.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 2 mar, 2 campo, 8 urbano = 8-2-2
"8-2-2": {
  socioeconomico: "A destruição de duas células oceânicas, duas rurais e oito urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 80.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 3 campo, 8 urbano = 8-3-1
"8-3-1": {
  socioeconomico: "A destruição de uma célula oceânica, três rurais e oito urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 80.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},
// 12 mar, 0 campo, 0 urbano = 0-0-12
"0-0-12": {
  socioeconomico: "Os impactos foram majoritariamente oceânicos, com mínima interferência direta em áreas habitadas. No entanto, rotas marítimas e atividades pesqueiras sofreram interrupções temporárias, afetando o comércio e o abastecimento costeiro.",
  ambiental: "A destruição no oceano provocou desequilíbrios ecológicos locais, como mortandade de espécies marinhas e dispersão de sedimentos. A recuperação natural tende a ocorrer em médio prazo, dependendo da profundidade atingida.",
  geologico: "O impacto formou crateras submarinas e elevou colunas d’água que se dissiparam rapidamente. Pequenos tremores secundários foram registrados, mas sem grandes efeitos tectônicos."
},

// 11 mar, 1 campo, 0 urbano = 0-1-11
"0-1-11": {
  socioeconomico: "Com o dano chegando às áreas rurais, pequenas comunidades agrícolas foram afetadas. Houve perdas de colheitas e deslocamento de cerca de 600 pessoas, mas as estruturas urbanas permaneceram intactas.",
  ambiental: "Além dos efeitos oceânicos, a poeira e os destroços do impacto começaram a afetar ecossistemas terrestres próximos, reduzindo a fertilidade do solo e contaminando cursos d’água.",
  geologico: "A energia liberada provocou rachaduras superficiais nas regiões mais próximas à costa, ampliando o raio de instabilidade geológica."
},

// 10 mar, 2 campo, 0 urbano = 0-2-10
"0-2-10": {
  socioeconomico: "Duas áreas rurais foram destruídas, resultando em perdas econômicas e alimentares. Aproximadamente 1.200 habitantes precisaram ser realocados, e o fornecimento agrícola da região foi comprometido.",
  ambiental: "A mistura de detritos oceânicos e terrestres aumentou a turbidez da água e causou a morte de vegetação costeira. A fauna terrestre começou a migrar para áreas mais seguras.",
  geologico: "As ondas de choque afetaram camadas superficiais de solo, causando pequenos deslizamentos e instabilidades em encostas."
},

// 9 mar, 3 campo, 0 urbano = 0-3-9
"0-3-9": {
  socioeconomico: "Três células rurais destruídas significam mais de 1.800 habitantes afetados. A economia local sofreu um colapso temporário, especialmente no setor agropecuário.",
  ambiental: "A combinação de impactos marinhos e terrestres provocou poluição difusa e perda significativa de vegetação. Rios próximos registraram aumento de sedimentos e resíduos.",
  geologico: "O solo nas regiões próximas mostrou sinais de compactação e fissuras, o que pode alterar lençóis freáticos e a estabilidade de estruturas próximas."
},

// 8 mar, 4 campo, 0 urbano = 0-4-8
"0-4-8": {
  socioeconomico: "Com quatro áreas rurais atingidas, os efeitos sociais começaram a ser sentidos em regiões vizinhas. O êxodo rural aumentou e o abastecimento de alimentos foi severamente prejudicado.",
  ambiental: "As áreas verdes sofreram desmatamento forçado e incêndios secundários. O impacto alterou microclimas locais e comprometeu ecossistemas costeiros.",
  geologico: "Depósitos de impacto criaram elevações irregulares e deformações no relevo. Pequenos tremores foram registrados até dezenas de quilômetros de distância."
},

// 7 mar, 5 campo, 0 urbano = 0-5-7
"0-5-7": {
  socioeconomico: "A destruição de cinco áreas rurais deslocou cerca de 3.000 pessoas. As atividades econômicas agrícolas ficaram praticamente paralisadas, exigindo ajuda externa.",
  ambiental: "A mistura de poeira e salinidade reduziu a fertilidade do solo nas regiões adjacentes. A fauna local foi dispersa, e espécies aquáticas costeiras enfrentaram declínio acentuado.",
  geologico: "O impacto criou uma zona instável entre o oceano e o continente, com possibilidade de subsidência e erosão costeira acentuada."
},

// 6 mar, 6 campo, 0 urbano = 0-6-6
"0-6-6": {
  socioeconomico: "Metade da destruição afetou áreas rurais, levando à perda de cerca de 3.600 habitantes e comprometendo severamente a produção agrícola. A dependência de centros urbanos aumentou.",
  ambiental: "O desequilíbrio entre mar e terra causou amplificação dos danos: contaminação do solo, destruição de habitats e alterações químicas em lagos e rios.",
  geologico: "Crateras secundárias e deslocamentos de solo começaram a se conectar, formando uma zona contínua de instabilidade estrutural."
},

// 5 mar, 7 campo, 0 urbano = 0-7-5
"0-7-5": {
  socioeconomico: "O impacto devastou quase toda a região rural, afetando 4.200 habitantes e provocando colapso econômico. O preço dos alimentos disparou, e o desemprego aumentou drasticamente.",
  ambiental: "A paisagem rural foi praticamente eliminada. Espécies terrestres e aquáticas sofreram perdas irreversíveis. O solo tornou-se infértil em várias áreas.",
  geologico: "O relevo foi profundamente modificado, com crateras sobrepostas e deslocamentos de massa que ameaçam estruturas remanescentes."
},

// 4 mar, 8 campo, 0 urbano = 0-8-4
"0-8-4": {
  socioeconomico: "Mais de 4.800 pessoas foram diretamente afetadas. A destruição rural completa comprometeu o abastecimento alimentar regional e gerou fluxos migratórios em massa.",
  ambiental: "A ausência de vegetação e a contaminação da água provocaram colapso ecológico. A recuperação natural exigirá décadas.",
  geologico: "O impacto resultou em um campo de crateras interligadas, alterando a topografia e potencialmente criando novas depressões hidrológicas."
},

// 3 mar, 9 campo, 0 urbano = 0-9-3
"0-9-3": {
  socioeconomico: "Com quase toda a área rural devastada (5.400 habitantes afetados), a crise humanitária é severa. As cidades próximas enfrentam superlotação e escassez de recursos.",
  ambiental: "O ecossistema terrestre foi quase aniquilado. O solo tornou-se estéril, e a biodiversidade local colapsou. O mar adjacente ainda apresenta altos níveis de turbidez.",
  geologico: "A sucessão de impactos alterou de forma permanente o relevo. Novas falhas geológicas surgiram, podendo reconfigurar o curso de rios e a linha costeira."
},
// 4 campo, 8 urbano = 8-4-0
"8-4-0": {
  socioeconomico: "A destruição de quatro células rurais e oito urbanas afeta profundamente a produção de alimentos e a vida nas cidades. No campo, cerca de 2.400 pessoas perdem lavouras e pastagens, comprometendo a renda das famílias e elevando os preços dos alimentos nas cidades. O êxodo rural pode esvaziar vilarejos, enquanto nas áreas urbanas, 80.000 pessoas enfrentam destruição de bairros inteiros, hospitais, escolas e comércios. O desemprego dispara, há migração em massa e cidades vizinhas ficam sobrecarregadas. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à dependência de programas de assistência social.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas e comprometendo a qualidade da água. Nas cidades, a geração de grandes volumes de resíduos, poluição do solo e da água, e perda de áreas verdes agravam a situação ambiental, podendo afetar a saúde pública e dificultar a regeneração dos ecossistemas urbanos.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas agrícolas, tornando algumas regiões inabitáveis ou impróprias para uso por longos períodos."
},

// 3 mar, 9 urbano = 9-0-3
"9-0-3": {
  socioeconomico: "A destruição de três células oceânicas e nove urbanas provoca uma crise aguda tanto nas cidades quanto nas comunidades costeiras. A pesca sofre grandes perdas, prejudicando a renda de pescadores e a oferta de pescado, enquanto cerca de 90.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado eleva preços, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública e dificultar a regeneração dos ecossistemas urbanos e costeiros.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas costeiras."
},

// 2 mar, 1 campo, 9 urbano = 9-1-2
"9-1-2": {
  socioeconomico: "A destruição de duas células oceânicas, uma rural e nove urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 90.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 1 mar, 2 campo, 9 urbano = 9-2-1
"9-2-1": {
  socioeconomico: "A destruição de uma célula oceânica, duas rurais e nove urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 90.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 3 campo, 9 urbano = 9-3-0
"9-3-0": {
  socioeconomico: "A destruição de três células rurais e nove urbanas compromete a produção agrícola e a vida nas cidades. No campo, cerca de 1.800 pessoas perdem lavouras e pastagens, elevando os preços dos alimentos e incentivando o êxodo rural. Nas cidades, 90.000 pessoas enfrentam destruição de bairros inteiros, hospitais, escolas e comércios, com desemprego em massa e migração para cidades vizinhas. O impacto combinado pressiona a economia local e sobrecarrega serviços públicos.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas agrícolas."
},

// 2 mar, 10 urbano = 10-0-2
"10-0-2": {
  socioeconomico: "A destruição de duas células oceânicas e dez urbanas afeta drasticamente a economia costeira e urbana. A pesca sofre grandes perdas, enquanto cerca de 100.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 1 mar, 1 campo, 10 urbano = 10-1-1
"10-1-1": {
  socioeconomico: "A destruição de uma célula oceânica, uma rural e dez urbanas afeta a pesca, a produção agrícola e a vida nas cidades. A renda de pescadores e agricultores cai, enquanto cerca de 100.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas, a degradação de habitats oceânicos e a erosão do solo rural reduzem a biodiversidade e dificultam a regeneração dos ecossistemas. Nas cidades, a poluição e a perda de áreas verdes agravam o cenário ambiental.",
  geologico: "Crateras no mar, no campo e nas cidades alteram o relevo, aumentam o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para agricultura, construção e a estabilidade das áreas costeiras."
},

// 2 campo, 10 urbano = 10-2-0
"10-2-0": {
  socioeconomico: "A destruição de duas células rurais e dez urbanas compromete a produção agrícola e a vida nas cidades. No campo, cerca de 1.200 pessoas perdem lavouras e pastagens, elevando os preços dos alimentos e incentivando o êxodo rural. Nas cidades, 100.000 pessoas enfrentam destruição de bairros inteiros, hospitais, escolas e comércios, com desemprego em massa e migração para cidades vizinhas. O impacto combinado pressiona a economia local e sobrecarrega serviços públicos.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas agrícolas."
},

// 1 mar, 11 urbano = 11-0-1
"11-0-1": {
  socioeconomico: "A destruição de uma célula oceânica e onze urbanas afeta drasticamente a economia costeira e urbana. A pesca sofre perdas, enquanto cerca de 110.000 pessoas nas cidades enfrentam destruição de infraestrutura, desemprego e deslocamento. O impacto combinado pressiona a economia local, sobrecarrega serviços públicos e pode levar à migração em massa para regiões vizinhas.",
  ambiental: "A morte de espécies marinhas e a degradação de habitats oceânicos reduzem a biodiversidade e afetam cadeias alimentares. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no fundo do mar e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica dificulta a recuperação ambiental e pode comprometer o uso futuro da terra para construção e a estabilidade das áreas costeiras."
},

// 1 campo, 11 urbano = 11-1-0
"11-1-0": {
  socioeconomico: "A destruição de uma célula rural e onze urbanas compromete a produção agrícola e a vida nas cidades. No campo, cerca de 600 pessoas perdem lavouras e pastagens, elevando os preços dos alimentos e incentivando o êxodo rural. Nas cidades, 110.000 pessoas enfrentam destruição de bairros inteiros, hospitais, escolas e comércios, com desemprego em massa e migração para cidades vizinhas. O impacto combinado pressiona a economia local e sobrecarrega serviços públicos.",
  ambiental: "A erosão do solo, a perda de vegetação e a contaminação de rios prejudicam a fauna e a flora locais, dificultando a regeneração dos ecossistemas. Nas áreas urbanas, a geração de resíduos e a poluição do solo e da água agravam a situação ambiental, podendo afetar a saúde pública.",
  geologico: "Crateras no solo rural e nas cidades alteram o relevo e podem aumentar o risco de erosão, deslizamentos e mudanças nos cursos d’água. A instabilidade geológica pode comprometer a reconstrução urbana e a estabilidade das áreas agrícolas."
},

// 12 urbano = 12-0-0
"12-0-0": {
  socioeconomico: "A destruição de doze células urbanas afeta cerca de 120.000 pessoas, destruindo bairros inteiros, hospitais, escolas e centros comerciais. A cidade entra em colapso: há migração em massa, sobrecarga de cidades vizinhas, desemprego generalizado e queda brusca na arrecadação de impostos. A falta de saneamento básico e de serviços de saúde pode gerar epidemias, enquanto o trauma coletivo e a instabilidade econômica podem persistir por anos. A reconstrução exigirá grandes investimentos e planejamento, e a cidade pode nunca recuperar seu dinamismo original.",
  ambiental: "A destruição urbana gera grandes volumes de resíduos, poluição do solo e da água, e perda de áreas verdes. A contaminação pode se espalhar para rios e lençóis freáticos, prejudicando a saúde pública e o meio ambiente. A recuperação ambiental é lenta, e áreas degradadas podem se tornar improdutivas por anos.",
  geologico: "A formação de crateras e a instabilidade do solo podem comprometer a estrutura de edifícios remanescentes e dificultar a reconstrução. O relevo urbano pode ser alterado permanentemente, aumentando o risco de novos desastres naturais, como deslizamentos e inundações. A instabilidade geológica pode tornar algumas áreas inabitáveis ou impróprias para reconstrução, exigindo adaptações permanentes na ocupação do território."
},
// 2 mar, 10 campo, 0 urbano = 0-10-2
"0-10-2": {
  socioeconomico: "Aproximadamente 6.000 habitantes rurais foram afetados. A perda de produção agrícola local é significativa: colheitas e estoques foram destruídos, provocando escassez regional e aumento imediato do preço de alimentos. A logística de socorro precisa priorizar mantimentos e abrigo.",
  ambiental: "A combinação de impactos marinhos e terrestres gerou contaminação de cursos d’água e perda de habitat costeiro. Áreas agrícolas próximas sofreram redução de fertilidade por deposição de sedimentos e salinização.",
  geologico: "Impactos repetidos criaram zonas de solo instável e pequenas subsidências. Há potencial para erosão acelerada em encostas próximas e alteração temporária do regime de drenagem local."
},

// 1 mar, 11 campo, 0 urbano = 0-11-1
"0-11-1": {
  socioeconomico: "Cerca de 6.600 habitantes rurais foram diretamente afetados. A segurança alimentar regional está comprometida; mercados locais e cadeias de distribuição quebraram, gerando necessidade de apoio externo para sementes, alimento e reconstrução.",
  ambiental: "A maior proporção de área terrestre destruída intensifica dispersão de sedimentos e poluentes, com perda de vegetação nativa e redução imediata da biodiversidade local. Recuperação natural será lenta.",
  geologico: "Fissuras superficiais e compactação do solo tornam áreas agrícolas menos produtivas e mais propensas a deslizamentos em chuvas subsequentes."
},

// 12 campo, 0 urbano = 0-12-0
"0-12-0": {
  socioeconomico: "7.200 habitantes rurais afetados. Trata-se de devastação rural quase total na área de análise: colapso da produção local, desemprego maciço no setor agropecuário e necessidade de realocação populacional.",
  ambiental: "Extensa degradação de ecossistemas terrestres — perda de solo fértil, contaminação de aquíferos rasos e extinção local de espécies sensíveis. Restauração exigirá décadas e intervenção ativa (replantio, contenção de erosão).",
  geologico: "Alterações permanentes no relevo, com crateras e subsidência em série; mudanças no fluxo superficial de água que podem criar novas zonas alagadiças ou secas."
},

// 11 mar, 1 urbano, 0 campo = 1-0-11
"1-0-11": {
  socioeconomico: "10.000 habitantes urbanos diretamente impactados (infraestrutura crítica — habitação, hospitais, transporte — pode ter sido danificada). Interrupção de serviços urbanos (energia, água, comunicações) e impacto econômico elevado por perda de comércio e emprego.",
  ambiental: "Poluição por destroços urbanos (materiais de construção, combustíveis) se mistura ao ambiente marinho, afetando tanto ecossistemas costeiros quanto qualidade da água para consumo.",
  geologico: "O impacto em áreas próximas a costas urbanas pode provocar subsidência local e rachaduras em fundações, exigindo inspeções estruturais e reparos urgentes."
},

// 10 mar, 1 campo, 1 urbano = 1-1-10
"1-1-10": {
  socioeconomico: "600 rurais + 10.000 urbanos afetados. A combinação eleva a complexidade do socorro: reconciliação entre necessidades urbanas (infraestrutura crítica) e rurais (alimentos, abrigo). Perdas econômicas somadas são significativas.",
  ambiental: "Danos ao litoral e ao solo rural produzem contaminação cruzada (sedimentos e poluição urbana), ampliando a área de impacto ecológico.",
  geologico: "Falhas superficiais e áreas com risco de colapso sob construções rurais e urbanas; necessidade de triagem geotécnica de locais críticos."
},

// 9 mar, 2 campo, 1 urbano = 1-2-9
"1-2-9": {
  socioeconomico: "1.200 rurais + 10.000 urbanos afetados. Comunidades rurais perderam colheitas enquanto a cidade enfrenta danos em infraestrutura; pressão sobre centros urbanos vizinhos aumenta por fluxos migratórios e demanda por serviços.",
  ambiental: "Perda de habitat e aumento de turbidez marinha; áreas de estuário e manguezal podem sofrer mortalidade e reduzir serviços ecossistêmicos (filtragem de água, reprodução de peixes).",
  geologico: "Ondas de choque produziram rachaduras e erosão costeira; solos argilosos próximos a áreas urbanas podem apresentar instabilidade."
},

// 8 mar, 3 campo, 1 urbano = 1-3-8
"1-3-8": {
  socioeconomico: "1.800 rurais + 10.000 urbanos impactados. A recuperação exigirá assistência simultânea em saneamento urbano e recuperação agrícola; mercados e escolas poderão ficar interrompidos por semanas.",
  ambiental: "Fragmentação de habitats terrestres e marinhos; incêndios secundários em áreas secas e acúmulo de detritos que atrapalham a regeneração natural.",
  geologico: "Formação de depressões intercaladas que alteram escoamento superficial e aumentam risco de inundações locais em eventos futuros."
},

// 7 mar, 4 campo, 1 urbano = 1-4-7
"1-4-7": {
  socioeconomico: "2.400 rurais + 10.000 urbanos afetados. A escala de auxílio precisa ser maior: logística de transporte e distribuição de água potável torna-se crítica; serviços de saúde urbanos sobrecarregados.",
  ambiental: "Danos severos a manguezais e áreas agrícolas litorâneas; perda de estoques pesqueiros junto a degradação do solo agrícola por salinização.",
  geologico: "Instabilidade costeira aumentada, com risco de colapso de taludes e alteração da linha de costa em pontos críticos."
},

// 6 mar, 5 campo, 1 urbano = 1-5-6
"1-5-6": {
  socioeconomico: "3.000 rurais + 10.000 urbanos impactados. Abastecimento regional prejudicado; migração interna para áreas urbanas e aumento de conflitos por recursos escassos. Programas de assistência alimentarem precisam ser imediatos e prolongados.",
  ambiental: "Contaminação generalizada de solos e corpos d’água; eventos de mortalidade em cadeias alimentares aquáticas e terrestres.",
  geologico: "Crateras e subsidências começam a se conectar, criando corredores de instabilidade que complicam reconstrução e uso do solo."
},

// 5 mar, 6 campo, 1 urbano = 1-6-5
"1-6-5": {
  socioeconomico: "3.600 rurais + 10.000 urbanos afetados. Colapso parcial da economia local: cadeias de valor primárias (agricultura, pesca) comprometidas e alto custo de recuperação de infraestrutura urbana.",
  ambiental: "Degradação estendida de habitats; necessidade de ações de mitigação como contenção de sedimentos e limpeza costeira para evitar contaminação maior.",
  geologico: "Deformações no relevo e risco aumentado de deslocamento de massa em áreas previamente estáveis."
},

// 4 mar, 7 campo, 1 urbano = 1-7-4
"1-7-4": {
  socioeconomico: "4.200 rurais + 10.000 urbanos afetados. Grandes deslocamentos populacionais e forte pressão sobre abrigos urbanos; recuperação econômica exigirá reabilitação de infraestrutura agrícola e urbana.",
  ambiental: "Perda severa de biodiversidade local; alteração de ecossistemas costeiros e terrestres que reduzem serviços ambientais de suporte à agricultura e pesca.",
  geologico: "Campo de crateras interligadas pode alterar cursos d’água e criar novos pontos de erosão e acúmulo sedimentar."
},

// 3 mar, 8 campo, 1 urbano = 1-8-3
"1-8-3": {
  socioeconomico: "4.800 rurais + 10.000 urbanos afetados. Crise humanitária de maior escala: distribuição de recursos, saneamento e controle de doenças tornam-se prioridades. Planos de reassentamento podem ser necessários.",
  ambiental: "Danos quase generalizados na zona rural, com extensa perda de solo fértil e colapso local de populações de fauna; recuperação natural muito lenta.",
  geologico: "Alterações topográficas significativas, com risco de reconfiguração permanente de micro-bacias e redes de drenagem."
},

// 2 mar, 9 campo, 1 urbano = 1-9-2
"1-9-2": {
  socioeconomico: "5.400 rurais + 10.000 urbanos afetados. Sistema de produção regional praticamente paralisado; aumento de dependência de importações alimentares e necessidade de apoio financeiro de longa duração.",
  ambiental: "Contaminação de aquíferos e solos agrícolas por sedimentos e material orgânico em decomposição; perda de serviços ecossistêmicos críticos.",
  geologico: "Processos de subsidência e erosão combinados criam áreas inabitáveis e exigem estudos geotécnicos antes da reconstrução."
},

// 1 mar, 10 campo, 1 urbano = 1-10-1
"1-10-1": {
  socioeconomico: "6.000 rurais + 10.000 urbanos afetados. Impacto socioeconômico muito alto: além do choque inicial, há migração em massa para centros urbanos e pressão duradoura sobre empregos e serviços públicos.",
  ambiental: "Danos extensivos tanto em ecossistemas marinhos quanto terrestres; áreas agrícolas podem ficar improdutivas por muitos anos sem intervenção.",
  geologico: "Reconfiguração do relevo em grande escala; aumento de risco para infraestrutura linear (estradas, linhas de energia) que pode ficar inoperante por longos períodos."
},

// 11 campo, 1 urbano, 0 mar = 1-11-0
"1-11-0": {
  socioeconomico: "6.600 rurais + 10.000 urbanos afetados. Grande crise híbrida: destruição rural extensa com impacto urbano crítico. Políticas públicas de emergência precisam combinar reassentamento rural e reconstrução urbana urgente.",
  ambiental: "Colapso ecológico em larga escala: perda de serviços ambientais e contaminação persistente de solos e águas. Planos de restauração deverão ser multidisciplinares.",
  geologico: "Série de crateras e subsidências que podem alterar cursos d’água maiores e criar novas zonas de instabilidade geológica, exigindo mapeamento extensivo antes de qualquer reconstrução."
},
// 9 mar, 1 campo, 2 urbano = 2-1-9
"2-1-9": {
  socioeconomico: "600 rurais + 20.000 urbanos afetados. A combinação amplia demandas logísticas: ajuda emergencial urbana massiva somada a apoio alimentar e abrigo para a comunidade rural. Mercado local tensionado.",
  ambiental: "Contaminação cruzada entre detritos urbanos e sedimentos terrestres; impactos sobre manguezais e pequenos cursos d’água que ligam zonas rurais e marinhas.",
  geologico: "Ondas de choque e choque de pressão geram fissuras superficiais em áreas agrícolas e rachaduras em estruturas urbanas; risco de erosão costeira aumentado."
},

// 8 mar, 2 campo, 2 urbano = 2-2-8
"2-2-8": {
  socioeconomico: "1.200 rurais + 20.000 urbanos afetados. Perdas na produção agrícola local e danos urbanos nos serviços essenciais. Coordenação entre resposta rural e urbana é necessária para evitar colapso logístico.",
  ambiental: "Aumento da salinização do solo em áreas agrícolas próximas à costa; redes tróficas marinhas e terrestres sofrem queda de biodiversidade local.",
  geologico: "Pequenos deslizamentos em encostas agrícolas e áreas com infraestrutura urbana danificada; possível alteração temporária do fluxo de drenagem."
},

// 7 mar, 3 campo, 2 urbano = 2-3-7
"2-3-7": {
  socioeconomico: "1.800 rurais + 20.000 urbanos afetados. Cresce a pressão sobre abrigos urbanos e sistemas de saúde; interrupção prolongada nos mercados agrícolas provoca inflação local de alimentos.",
  ambiental: "Há incêndios secundários em áreas secas, degradação de manguezais e perda de habitat para espécies costeiras e terrestres.",
  geologico: "Formação de zonas de solo compactado e fissuras que reduzem a capacidade de suporte de fundações agrícolas e algumas estruturas urbanas."
},

// 6 mar, 4 campo, 2 urbano = 2-4-6
"2-4-6": {
  socioeconomico: "2.400 rurais + 20.000 urbanos afetados. Grande demanda por assistência alimentar e reconstrução urbana; trabalhadores rurais deslocados aumentam pressão sobre empregos urbanos.",
  ambiental: "Contaminação difusa de rios e aquíferos rasos por sedimentos e detritos; queda acentuada da produtividade agrícola por perda de solo fértil.",
  geologico: "Crateras e subsidências começam a se conectar, criando corredores de instabilidade que dificultam a reconstrução e o uso seguro do solo."
},

// 5 mar, 5 campo, 2 urbano = 2-5-5
"2-5-5": {
  socioeconomico: "3.000 rurais + 20.000 urbanos afetados. Colapso parcial das cadeias produtivas (agricultura + serviços urbanos); recuperação econômica depende de ajuda externa e programas de reativação.",
  ambiental: "Degradação extensiva de habitats costeiros e rurais; necessidade de medidas ativas de restauração (contenção de sedimentos, replantio).",
  geologico: "Processos erosivos intensificados e risco aumentado de deslocamentos de massa em áreas previamente estáveis."
},

// 4 mar, 6 campo, 2 urbano = 2-6-4
"2-6-4": {
  socioeconomico: "3.600 rurais + 20.000 urbanos afetados. Fortes fluxos migratórios rurais-urbanos; redes de abastecimento e serviços públicos ficam sobrecarregadas, exigindo planos de reassentamento temporário.",
  ambiental: "Perda de solos agrícolas e severa perturbação dos ecossistemas costeiros; poluição persistente de corpos d’água.",
  geologico: "Campo de crateras com subsidência localizada; reconstrução exige estudos geotécnicos antes de reabilitar terrenos agrícolas ou erigir estruturas."
},

// 3 mar, 7 campo, 2 urbano = 2-7-3
"2-7-3": {
  socioeconomico: "4.200 rurais + 20.000 urbanos afetados. Situação humanitária agravada: escassez de alimentos, alto desemprego rural e necessidade de saneamento emergencial em áreas urbanas.",
  ambiental: "Colapso de serviços ecossistêmicos locais (retenção de sedimentos, filtragem de água); recuperação natural lenta sem intervenção.",
  geologico: "Alterações topográficas que podem redesenhar micro-bacias e rotas de drenagem, aumentando risco de inundações posteriores."
},

// 2 mar, 8 campo, 2 urbano = 2-8-2
"2-8-2": {
  socioeconomico: "4.800 rurais + 20.000 urbanos afetados. Produção agrícola regional severamente comprometida; demanda por suporte financeiro e logístico de médio-longo prazo.",
  ambiental: "Extensa perda de habitat terrestre e impacto continuado nos estoques pesqueiros pela turvação costeira.",
  geologico: "Conexão de crateras e zonas de subsidência que tornam grandes áreas inseguras para uso agrícola e construção sem reforço."
},

// 1 mar, 9 campo, 2 urbano = 2-9-1
"2-9-1": {
  socioeconomico: "5.400 rurais + 20.000 urbanos afetados. Crise humanitária e econômica de grande escala; necessidade de políticas de reassentamento e reabilitação econômica robustas.",
  ambiental: "Danos quase generalizados em ecossistemas terrestres; aquíferos e solos muito comprometidos — restauração exigirá décadas.",
  geologico: "Reconfiguração significativa do relevo; áreas podem tornar-se inabitáveis sem grandes obras de engenharia."
},

// 10 campo, 2 urbano, 0 mar = 2-10-0
"2-10-0": {
  socioeconomico: "6.000 rurais + 20.000 urbanos afetados. Devastação rural generalizada combinada com impacto urbano substancial; recuperação regional exigirá investimentos prolongados e programas de segurança alimentar.",
  ambiental: "Colapso ecológico terrestre em escala regional; contaminação de água e perda massiva de biodiversidade.",
  geologico: "Paisagem profundamente modificada com múltiplas crateras e subsidências que alteram cursos d’água e padrões de erosão."
},

// 9 mar, 3 urbano, 0 campo = 3-0-9
"3-0-9": {
  socioeconomico: "30.000 habitantes urbanos afetados. Impacto urbano dominante: destruição de infraestrutura crítica, paralisação econômica ampla e necessidade imediata de abrigos, energia e água potável em larga escala.",
  ambiental: "Grandes volumes de detritos urbanos afetam o ambiente costeiro e marinho; risco elevado de contaminação química e biológica.",
  geologico: "Subsidência e fissuras generalizadas em áreas urbanas costeiras; muitos edifícios exigirão avaliação estrutural e possivelmente demolição."
},

// 8 mar, 1 campo, 3 urbano = 3-1-8
"3-1-8": {
  socioeconomico: "600 rurais + 30.000 urbanos afetados. A resposta precisa priorizar grandes centros urbanos (saúde, abrigo) enquanto cuida da produção alimentar da comunidade rural afetada.",
  ambiental: "Poluição urbana intensa somada a degradação de áreas rurais costeiras; impacto conjunto sobre peixes e serviços costeiros.",
  geologico: "Rachas e subsidência perto de áreas urbanas e pontos agrícolas costeiros; infraestrutura linear (estradas, rede elétrica) pode ficar comprometida."
},

// 7 mar, 2 campo, 3 urbano = 3-2-7
"3-2-7": {
  socioeconomico: "1.200 rurais + 30.000 urbanos afetados. Alta demanda por recursos urbanos e ajuda alimentar rural; mercados regionais e logísticas entram em colapso parcial.",
  ambiental: "Danos severos em manguezais e áreas agrícolas litorâneas; forte queda na reprodução de espécies marinhas que sustentam pesca local.",
  geologico: "Instabilidade de taludes e aumento do risco de erosão costeira com impacto direto em infraestruturas urbanas."
},

// 6 mar, 3 campo, 3 urbano = 3-3-6
"3-3-6": {
  socioeconomico: "1.800 rurais + 30.000 urbanos afetados. Grande pressão sobre serviços de saúde urbanos e distribuição de alimentos; programas de reassentamento e emprego são críticos para recuperação.",
  ambiental: "Perda combinada de habitats terrestres e marinhos com contaminação duradoura por resíduos urbanos; recuperação ecológica complexa.",
  geologico: "Conexão entre crateras e zonas de subsidência que aumentam a dificuldade de reconstrução e requerem mapeamento geotécnico detalhado."
},
// 5 mar, 4 campo, 3 urbano = 3-4-5
"3-4-5": {
  socioeconomico: "2.400 rurais + 30.000 urbanos afetados. Perdas significativas na produção agrícola e forte impacto urbano em infraestrutura e serviços essenciais; necessidade urgente de apoio logístico e alimentos.",
  ambiental: "Danos combinados em áreas rurais e costeiras urbanas; perda de biodiversidade e contaminação de solos e cursos d’água.",
  geologico: "Subsidência e fissuras em terrenos agrícolas e urbanos; erosão costeira acentuada em pontos críticos."
},

// 4 mar, 5 campo, 3 urbano = 3-5-4
"3-5-4": {
  socioeconomico: "3.000 rurais + 30.000 urbanos afetados. Produção agrícola severamente afetada, enquanto a cidade enfrenta interrupções prolongadas de serviços e comércio; realocação e assistência emergencial necessárias.",
  ambiental: "Ecossistemas costeiros e rurais degradados; contaminação difusa e perda de habitat para espécies terrestres e marinhas.",
  geologico: "Crateras interligadas e solo instável que dificultam reconstrução e uso seguro de áreas urbanas e agrícolas."
},

// 3 mar, 6 campo, 3 urbano = 3-6-3
"3-6-3": {
  socioeconomico: "3.600 rurais + 30.000 urbanos afetados. Colapso parcial das cadeias de produção e aumento da pressão sobre serviços urbanos; forte necessidade de programas de reassentamento.",
  ambiental: "Fragmentação de habitats, contaminação de solos e rios; queda acentuada da produtividade agrícola.",
  geologico: "Alterações topográficas significativas, com risco de deslizamentos e erosão, afetando áreas urbanas e rurais."
},

// 2 mar, 7 campo, 3 urbano = 3-7-2
"3-7-2": {
  socioeconomico: "4.200 rurais + 30.000 urbanos afetados. Crise humanitária de grande escala; escassez de alimentos, abrigos urbanos sobrecarregados e migração rural-urbana intensa.",
  ambiental: "Perda quase generalizada de vegetação e fauna terrestre; contaminação de cursos d’água; impacto prolongado sobre a pesca costeira.",
  geologico: "Campo de crateras interligadas com risco elevado de erosão e alterações permanentes de micro-bacias e drenagem."
},

// 1 mar, 8 campo, 3 urbano = 3-8-1
"3-8-1": {
  socioeconomico: "4.800 rurais + 30.000 urbanos afetados. Produção agrícola regional paralisada e cidades sobrecarregadas; recuperação depende de programas emergenciais e longo prazo.",
  ambiental: "Danos críticos a ecossistemas costeiros e terrestres; perda de solos férteis e serviços ambientais essenciais.",
  geologico: "Conexão de crateras e subsidências que tornam grandes áreas instáveis; risco de novas alterações topográficas permanentes."
},

// 9 campo, 3 urbano = 3-9-0
"3-9-0": {
  socioeconomico: "5.400 rurais + 30.000 urbanos afetados. Crise híbrida intensa: devastação rural quase total somada a grande impacto urbano; necessidade de reassentamento e reconstrução maciça.",
  ambiental: "Colapso ecológico extensivo; contaminação persistente de solos e cursos d’água; biodiversidade local drasticamente reduzida.",
  geologico: "Alteração permanente do relevo; novas falhas e crateras podem mudar cursos de rios e zonas costeiras."
},

// 8 mar, 4 urbano = 4-0-8
"4-0-8": {
  socioeconomico: "40.000 urbanos afetados. Impacto urbano dominante: infraestrutura crítica e comércio paralisados; alta necessidade de abrigos e restauração de serviços.",
  ambiental: "Danos em ecossistemas costeiros devido a detritos urbanos; poluição química e biológica significativa.",
  geologico: "Subsidência e fissuras generalizadas em áreas urbanas; avaliação estrutural e engenharia de reforço necessárias."
},

// 7 mar, 1 campo, 4 urbano = 4-1-7
"4-1-7": {
  socioeconomico: "600 rurais + 40.000 urbanos afetados. Forte impacto urbano com necessidade de priorizar serviços essenciais e saneamento; pequenas perdas rurais também precisam de assistência.",
  ambiental: "Poluição urbana intensa, contaminação de áreas agrícolas costeiras e impacto em habitats marinhos próximos.",
  geologico: "Instabilidade de solos agrícolas e urbanos; risco de erosão costeira e fissuras em fundações."
},

// 6 mar, 2 campo, 4 urbano = 4-2-6
"4-2-6": {
  socioeconomico: "1.200 rurais + 40.000 urbanos afetados. Pressão elevada sobre serviços urbanos; produção agrícola afetada; coordenação entre socorro urbano e rural é crucial.",
  ambiental: "Degradação de habitats terrestres e costeiros; contaminação de solos e cursos d’água.",
  geologico: "Conexão de crateras e subsidências que dificultam reconstrução e requerem estudos geotécnicos antes de reabilitação."
}
};

// ===============================
// FUNÇÃO QUE ANALISA OS BLOCOS DESTRUÍDOS
// ===============================
function getDestroyedCounts() {
  const counts = {
    urbano: 0,    // tipo 0
    rural: 0,     // tipo 1
    oceano: 0     // tipo 2
  };

  // Percorre todas as crateras fixas
  for (const crater of craterasFixas) {
    const meteorMatrix = meteorData[crater.meteor];
    const startR = crater.row;
    const startC = crater.col;

    // Verifica cada tile afetado pela cratera
    for (let i = 0; i < meteorMatrix.length; i++) {
      for (let j = 0; j < meteorMatrix[0].length; j++) {
        if (meteorMatrix[i][j] > 0) {
          const r = startR + i;
          const c = startC + j;

          // Verifica se está dentro dos limites
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const tileType = mapData[active_map][r][c];
            
            // Conta por tipo
            if (tileType === 0) counts.urbano++;
            else if (tileType === 1) counts.rural++;
            else if (tileType === 2) counts.oceano++;
          }
        }
      }
    }
  }

  return counts;
}

// ===============================
// FUNÇÃO QUE GERA A CHAVE DO CENÁRIO
// ===============================
function getScenarioKey(counts) {
  return `${counts.urbano}-${counts.rural}-${counts.oceano}`;
}


// ===============================
// FUNÇÃO QUE ATUALIZA OS TEXTOS NO HTML
// ===============================
function updateResultsText() {
  // Pega as contagens
  const counts = getDestroyedCounts();
  
  // Gera a chave do cenário
  const key = getScenarioKey(counts);
  
  // Busca o cenário correspondente
  const scenario = impactScenarios[key];
  
  // Seleciona os cards de resultado
  const cards = document.querySelectorAll('.result-card p');
  
  if (scenario) {
    // Se encontrou o cenário, preenche os textos
    cards[0].textContent = scenario.socioeconomico;
    cards[1].textContent = scenario.ambiental;
    cards[2].textContent = scenario.geologico;
  } else {
    // Se não encontrou, mostra mensagem padrão
    cards[0].textContent = `Cenário não catalogado. Tiles destruídos: ${counts.urbano} urbanos, ${counts.rural} rurais, ${counts.oceano} oceanos.`;
    cards[1].textContent = "Dados ambientais indisponíveis para esta combinação.";
    cards[2].textContent = "Dados geológicos indisponíveis para esta combinação.";
    
    console.warn(`Cenário "${key}" não encontrado na base de dados.`);
  }
  
  // Log para debug
  console.log("Cenário aplicado:", key);
  console.log("Contagens:", counts);
}

// ===============================
// MODIFICAR O BOTÃO DE IMPACTO
// ===============================
// Substitua a parte do evento do impactBtn que vai para resultados:


// quando redimensionar a janela → recalcula
window.addEventListener('resize', () => {
  if (impactCanvas.classList.contains('show-canvas')) drawScaledMap();
});

loadAll.then(() => {
  console.log("Sprites carregados com sucesso!");
  drawScaledMap()
});
