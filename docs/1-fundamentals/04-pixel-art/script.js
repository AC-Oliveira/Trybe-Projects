/*
window.onload = function startSettings(){

}
 */
const pixelBoard = document.getElementById('pixel-board');

function randomColor() {
  const color1 = parseInt(Math.random() * 255, 10) + 1;
  const color2 = parseInt(Math.random() * 255, 10) + 1;
  const color3 = parseInt(Math.random() * 255, 10) + 1;

  return `rgb(${color1}, ${color2}, ${color3})`;
}

const color = document.querySelectorAll('.color');
for (let index1 = 0; index1 < color.length; index1 += 1) {
  if (index1 === 0) {
    color[index1].style.backgroundColor = '#000000';
  } else {
    const randomGeneratedColor = randomColor();
    color[index1].style.backgroundColor = randomGeneratedColor;
  }
}

const pixelList = document.querySelectorAll('.pixel');
pixelList.forEach((item) => {
  item.addEventListener('click', (event1) => {
    const solveEvent1 = event1.target;
    solveEvent1.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
  });
});

const selectedColor = document.querySelectorAll('.color');
selectedColor.forEach((item) => item.addEventListener('click', (event2) => {
  for (let index2 = 0; index2 < selectedColor.length; index2 += 1) {
    selectedColor[index2].classList.remove('selected');
  }
  const solveEvent2 = event2.target;
  solveEvent2.className += ' selected';
}));

const resetButton = document.querySelector('#clear-board');
resetButton.value = 'Limpar';
resetButton.innerHTML = 'Limpar';
resetButton.addEventListener('click', () => {
  pixelList.forEach((item3) => {
    const solveEvent3 = item3;
    solveEvent3.style.backgroundColor = '#FFFFFF';
  });
});

const vqvButton = document.getElementById('generate-board');
vqvButton.value = 'VQV';
vqvButton.innerHTML = 'VQV';
const inputBoardSizeRange = document.getElementById('board-size');
inputBoardSizeRange.min = '1';
inputBoardSizeRange.max = '50';

// Função que cria os pixels
function createPixels(pixelSize) {
  const createPixel = document.createElement('div');
  createPixel.className = 'pixel';
  createPixel.style.height = `${pixelSize}px`;
  createPixel.style.width = `${pixelSize}px`;
  createPixel.addEventListener('click', (event4) => {
    const solveEvent4 = event4.target;
    solveEvent4.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
  });
  pixelBoard.appendChild(createPixel);
}
// Função que preenche com pixels
function pixelsFill(numberN) {
  const pixelSize = 600 / numberN - 2;

  for (let index3 = 0; index3 < numberN ** 2; index3 += 1) {
    createPixels(pixelSize);
  }
}

//  Redimensiona o board e chama a função para preencher com pixels.
function boardResize(gradeNumber) {
  const borderSize = document.getElementById('pixel-board');
  borderSize.style.height = '600px';
  borderSize.style.width = '600px';
  pixelsFill(gradeNumber);
}
// Criação da função Clean Board que limpa o quadro de pixels e chama uma função para redimensionar a div que contém os pixels
function cleanBoard(pixelGradeNumber) {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((item) => {
    item.remove();
  });
  boardResize(pixelGradeNumber);
}

// Criação da função generateBoard. Que Cria uma grade NxN com o valor N dado.
function generateBoard(pixelGradeNumber) {
  cleanBoard(pixelGradeNumber);
}
// Adciona ao botão VQV o EventListener de click que aciona um bloco de funções responsáveis por retornar uma grade no tamanho desejado.
vqvButton.addEventListener('click', () => {
  let nValue = document.getElementById('board-size').value;
  if (nValue < 1) {
    return alert('Board inválido!');
  } if (nValue < 5) {
    nValue = 5;
  } else if (nValue > 50) {
    nValue = 50;
  }
  generateBoard(nValue);
});
