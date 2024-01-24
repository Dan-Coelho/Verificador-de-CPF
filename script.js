"use strict";

const form = document.querySelector("#form");
const resposta = document.querySelector(".resposta");

let verificador1;
let verificador2;
const setFirstDigit = (num) => {
  num === 0 || num === 1 ? (verificador1 = 0) : (verificador1 = 11 - num);
};
const setSecondDigit = (num) => {
  num === 0 || num === 1 ? (verificador2 = 0) : (verificador2 = 11 - num);
};
const reduceArray = (arr1, arr2) => {
  return arr1
    .map((item, index) => {
      return item * arr2[index];
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);
};
const handleChange = (event) => {
  event.preventDefault();
  const cpf = form.querySelector("#cpf");
  const seqCpf = [...cpf.value];
  cpf.value = "";
  console.log(seqCpf);
  const x = seqCpf.slice(0, 9);
  const y = seqCpf.slice(1, 10);
  console.log(x);
  console.log(y);
  const mult = [10, 9, 8, 7, 6, 5, 4, 3, 2];

  const resto1 = reduceArray(x, mult) % 11;
  console.log(resto1);

  const resto2 = reduceArray(y, mult) % 11;
  console.log(resto2);
  /*const xmapreduce = x
    .map((item, index) => {
      return item * mult[index];
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);
  const resto1 = xmapreduce % 11;

  const ymapreduce = y
    .map((item, index) => {
      return item * mult[index];
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0);

  const resto2 = ymapreduce % 11;*/
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
  //x.reduce((acc, cur) => {
  // return acc +
  //}, 0);
};
form.addEventListener("submit", handleChange);
