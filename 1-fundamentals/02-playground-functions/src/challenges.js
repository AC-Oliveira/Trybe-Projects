// Desafio 1
function compareTrue(value1, value2) {
  return value1 && value2;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split([' ']);
}

// Desafio 4
function concatName(arr) {
  let string = `${arr[arr.length - 1]}, ${arr[0]}`;
  return string;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = 3 * wins + 1 * ties;
  return points;
}

// Desafio 6
function higherObjectNumber(obj) {
  let highestNumber = parseInt(Object.keys(obj)[0], 10);
  for (let index2 in obj) {
    if (index2 > highestNumber) {
      highestNumber = index2;
    }
  }
  return obj[highestNumber];
}
// Inspirado em: https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array
function highestCount(arr) {
  let higherMatchNumber = Object.create(null);
  for (let index of arr) {
    if (!higherMatchNumber[index]) {
      higherMatchNumber[index] = 1;
    } else {
      higherMatchNumber[index] += 1;
    }
  }
  return higherObjectNumber(higherMatchNumber);
}

// Desafio 7
function catAndMouseDistance(mouse, cat1, cat2) {
  let distance1 = Math.abs(mouse - cat1);
  let distance2 = Math.abs(mouse - cat2);
  return [distance1, distance2];
}
function winner(distance) {
  if (distance[0] > distance[1]) {
    return 'cat2';
  }
  if (distance[0] < distance[1]) {
    return 'cat1';
  }
  return 'os gatos trombam e o rato foge';
}
function catAndMouse(mouse, cat1, cat2) {
  let distance = catAndMouseDistance(mouse, cat1, cat2);
  let whoWins = winner(distance);
  return whoWins;
}

// Desafio 8
function isDivBy(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return 'fizzBuzz';
  }
  if (number % 3 === 0) {
    return 'fizz';
  }
  if (number % 5 === 0) {
    return 'buzz';
  }
  return 'bug!';
}
function fizzBuzz(arr) {
  // seu código aqui
  /*
    Criar un novo Array para contar as palavras.
    Percorrer o Array dado
    Verificar se o array índice é dívsivel por 3, 3 e 5, 5, ou nenhum dos dois.
    Puxar um novo array para dentro do array criado com uma string baseada  na condição anterior.
    Retornar o novo array.
  */
  let arr2 = [];
  for (let index of arr) {
    arr2.push(isDivBy(index));
  }
  return arr2;
}

// Desafio 9
function encoding(encryptedWords) {
  let x;
  x = encryptedWords.replace(/a/g, '1');
  x = x.replace(/e/g, '2');
  x = x.replace(/i/g, '3');
  x = x.replace(/o/g, '4');
  x = x.replace(/u/g, '5');
  return x;
}
function encode(encryptedWords) {
  encryptedWords = encoding(encryptedWords);
  return encryptedWords;
}

function decoding(decryptedWords) {
  let y;
  y = decryptedWords.replace(/1/g, 'a');
  y = y.replace(/2/g, 'e');
  y = y.replace(/3/g, 'i');
  y = y.replace(/4/g, 'o');
  y = y.replace(/5/g, 'u');
  return y;
}
function decode(decryptedWords) {
  decryptedWords = decoding(decryptedWords);
  return decryptedWords;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
