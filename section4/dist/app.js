"use strict";
// const userName = "Max";
// let age = 30;
// age = 29;
// let result;
// function add(a: number, b: number) {
//   result = a + b;
//   return result;
// }
// if (age > 20) {
//   let isAdult = true;
// }
// console.log(isAdult);
// const add = (a: number, b: number = 1) => a + b;
// const printOutput: (output: string | number) => void = (output) => {
//   console.log(output);
// };
// console.log(add(2));
const button = document.querySelector("button");
if (button) {
    button.addEventListener("click", (event) => {
        console.log(event);
    });
}
// スプレッド演算子
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const person = {
    firstName: "Max",
    age: 30,
};
// const copiedPerson = {
//   ...person,
// };
// レストパラメータ
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);
// 分割代入
const hobby1 = hobbies[0];
const hobby2 = hobbies[1];
const [hobby3, hobby4, ...remainingHObbies] = hobbies;
console.log(hobbies, hobby3, hobby4);
const { firstName: userName, age } = person;
console.log(userName, age, person);
