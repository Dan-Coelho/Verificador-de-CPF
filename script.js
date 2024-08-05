"use strict";
//Seleção dos itens html
const form = document.querySelector("#form");
const resposta = document.querySelector(".resposta");
const zona_fiscal = document.querySelector(".z_fiscal");
//Criação dos verificadores para o 10 e 11 digitos do cpf
let verificador1;
let verificador2;
//Funções que recebe o resto da divisão e a partir dele atribui o valor dos verificadores
const setFirstDigit = (num) => {
  num === 0 || num === 1 ? (verificador1 = 0) : (verificador1 = 11 - num);
};
const setSecondDigit = (num) => {
  num === 0 || num === 1 ? (verificador2 = 0) : (verificador2 = 11 - num);
};

//Função para auxiliar no cálculo dos digitos verificadores
const reduceArray = (arr1, arr2) => {
  return arr1
    .map((item, index) => {
      return item * arr2[index];
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);
};
//Função que verifica o cpf digitado
//Esse é o nosso primeiro verificador, e ele usa a seguinte fórmula:

//Os nove primeiros números são ordenadamente multiplicados pela sequência 10, 9, 8, 7, 6, 5, 4, 3, 2 (o primeiro por 10, o segundo por 9, e assim sucessivamente))

//Em seguida, você soma os resultados e calcula o resto da divisão dessa soma por 11.
//O segundo verificador usa a mesma forma porém com os 9 números anteriores a ele
const handleChange = (event) => {
  event.preventDefault();
  const cpf = form.querySelector("#cpf");
  const seqCpf = [...cpf.value];
  console.log(seqCpf);
  cpf.value = "";
  const x = seqCpf.slice(0, 9);
  const y = seqCpf.slice(1, 10);
  console.log(x);
  console.log(y);
  const mult = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  const resto1 = reduceArray(x, mult) % 11;
  console.log(resto1);

  const resto2 = reduceArray(y, mult) % 11;
  console.log(resto2);

  setFirstDigit(resto1);
  setSecondDigit(resto2);

  if (verificador1 != seqCpf[9] || verificador2 != seqCpf[10]) {
    resposta.innerText = "CPF FALSO";
    resposta.classList.remove("verdadeiro");
    resposta.classList.add("falso");
  } else {
    resposta.innerText = "CPF VÁLIDO";
    resposta.classList.remove("falso");
    resposta.classList.add("verdadeiro");
  }
  console.log(seqCpf[8]);
  if (seqCpf[8] == 1) {
    zona_fiscal.innerText = "Zona Fiscal: DF, GO, MS, MT e TO";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 2) {
    zona_fiscal.innerText = "Zona Fiscal: AC, AM, AP, PA, RO e RR";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 3) {
    zona_fiscal.innerText = "Zona Fiscal: CE, MA e PI";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 4) {
    zona_fiscal.innerText = "Zona Fiscal: AL, PE, PB e RN";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 5) {
    zona_fiscal.innerText = "Zona Fiscal: BA e SE";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 6) {
    zona_fiscal.innerText = "Zona Fiscal: MG";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 7) {
    zona_fiscal.innerText = "Zona Fiscal: ES e RJ";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 8) {
    zona_fiscal.innerText = "Zona Fiscal: SP";
    zona_fiscal.classList.add("fiscal");
  } else if (seqCpf[8] == 9) {
    zona_fiscal.innerText = "Zona Fiscal: PR e SC";
    zona_fiscal.classList.add("fiscal");
  } else {
    zona_fiscal.innerText = "Zona Fiscal: RS";
    zona_fiscal.classList.add("fiscal");
  }
};
form.addEventListener("submit", handleChange);
