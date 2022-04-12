/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

let averageCalc = (array) => {
  let mean = 0;
  for (let index of array) {
    if (typeof (index) === 'string') {
      return undefined;
    }
    mean += index;
  }
  mean = Math.round(mean / array.length);
  return mean;
};

const average = (array) => {
  // Este código foi retirado daqui: https://www.quora.com/How-do-you-check-if-an-array-is-empty-in-JavaScript
  if (array && array.length) {
    return averageCalc(array);
  } 
    return undefined;
};

module.exports = average;
