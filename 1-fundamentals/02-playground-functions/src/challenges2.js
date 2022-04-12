// Desafio 10
/*
Criar uma função que: Receba como parâmetro um array e um nome (string literal).
Essa função deve retornar um array contendo:
Um objeto com as Keys Tech: array [0] em diante e nome: "Nome que a função responde".
Seria interessante utilizar na função principal um array que puxa objetos pra dentro dele a cada ciclo for.
Estes objetos podem ser gerados por uma função anterior que vai diminuir e muito o nível de complexidade da primeira função.
*/
function objectGen(techName, nameU) {
  let generatedObj = { tech: techName, name: nameU };
  return generatedObj;
}

function techList(arr, nameU) {
  arr.sort();
  if (arr[0] === undefined) {
    return 'Vazio!';
  }
  let outputArr = [];
  for (let index of arr) {
    outputArr.push(objectGen(index, nameU));
  }
  return outputArr;
}

// Desafio 11
/*
  Escrever um função que recebe 11 números e retorna um número de telefone no formato (xx) xxxxx-xxxx
  Se a função receber um array com tamanho diferente de 11 deverá retornar  "Array com tamanho incorreto"
  Se algum número do array se repetir por mais de 3 vezes, for maior que 9 ou menor que 0 a função deverá retornar "Não é possível gerar um número de telefone com esses valores."
  */
function nAguentoMais(countNumbers, arr) {
  // Só um desabafo.
  for (let index2 in countNumbers) {
    if (countNumbers[index2] >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return arr;
}
/*
  Inspirado na primeira solução deste link:
  https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array
*/
function countNumbersCheck(arr) {
  let countNumbers = Object.create(null);
  for (let index of arr) {
    if (!countNumbers[index]) {
      countNumbers[index] = 1;
    } else {
      countNumbers[index] += 1;
    }
  }
  arr = nAguentoMais(countNumbers, arr);
  return arr;
}
function isValidPhoneNumbers(arr) {
  if (arr.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  for (let index of arr) {
    if (index > 9 || index < 0) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return countNumbersCheck(arr);
}

function returnValidNumber(arr) {
  let halfNumber1 = `(${arr[0]}${arr[1]}) ${arr[2]}${arr[3]}${arr[4]}${arr[5]}`;
  let halfNumber2 = `${arr[6]}-${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  return halfNumber1 + halfNumber2;
}

function generatePhoneNumber(arr) {
  let phoneNumber = isValidPhoneNumbers(arr);
  if (phoneNumber.length === 11) {
    phoneNumber = returnValidNumber(phoneNumber);
  }
  // Função que verifica se o array é falido.
  // Se o array for válido array entra em uma função que modifica seus valores e retorna um número de telefone válido.
  return phoneNumber;
}

// Desafio 12
/*
  Criar uma função que checa as condições de existência de um triângulo.
  A soma de dois lados tem que ser maior que o valor do terceiro.
  O módulo da diferença entre 2 lados tem que ser menor que o valor do terceiro.
*/
function sumSides(lineA, lineB, lineC) {
  if (lineA + lineB > lineC && lineA + lineC > lineB && lineC + lineB > lineA) {
    return true;
  }
  return false;
}

function diffSides(lineA, lineB, lineC) {
  let isValid1 = Math.abs(lineA - lineB) < lineC;
  if (isValid1 && Math.abs(lineA - lineC) < lineB && Math.abs(lineC - lineB) < lineA) {
    return true;
  }
  return false;
}

function triangleCheck(lineA, lineB, lineC) {
  let isValid1;
  let isValid2;
  isValid1 = sumSides(lineA, lineB, lineC);
  isValid2 = diffSides(lineA, lineB, lineC);
  return isValid1 && isValid2;
}

// Desafio 13
function hydrate(string) {
  let arr = string.split(' ');
  let waterCups = 0;
  for (let index of arr) {
  /*
  Utilizei parte da primeira solução deste link para resolver o erro do eslint:
  https://stackoverflow.com/questions/46677774/eslint-unexpected-use-of-isnan
  */
    if (!Number.isNaN(Number(index))) {
      waterCups += parseInt(index, 10);
    }
  }
  if (waterCups === 1) {
    return `${waterCups} copo de água`;
  }
  return `${waterCups} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
