const fs = require("fs");
const chalk = require("chalk")

let input = fs.readFileSync("input.txt", "utf-8");

input = input
  .split("\n")
  .filter(s => s.indexOf("ECHO") >= 0)
  .map(s => s.substring(6, s.length))
  .map(s => s.split(",").map(s => s.trim()));

// input = input
//   .filter(i => i[0] === '"squareProfile"')
//   .map(i => parseInt(i[1]))
//   .reduce((acc, val) => (acc += val), 0);
// console.log((input / 1000) * (179 / 2));

console.log(chalk.cyan("squareProfile"))
console.log("Assuming length of 200cm")
let length = 2000;
let count = 0;
let current = 0;
input
  .filter(i => i[0] === '"squareProfile"')
  .map(i => parseInt(i[1]))
  .forEach(i => {
    if(i + current < length)
      current += i;
    else {
      count++;
      current = i;
    }
  })
console.log(`Squareprofiles required: ${chalk.green(count)}`)

console.log(chalk.cyan("angle"))
console.log("Assuming length of 200cm")
length = 2000;
count = 0;
current = 0;
input
  .filter(i => i[0] === '"angle"')
  .map(i => parseInt(i[1]))
  .forEach(i => {
    if(i + current < length)
      current += i;
    else {
      count++;
      current = i;
    }
  })
console.log(`angles required: ${chalk.green(count)}`)


console.log(chalk.cyan("Oak"))
console.log("Assuming length of 200cm")
length = 2000;
count = 0;
current = 0;
input
  .filter(i => i[0] === '"oak"')
  .map(i => Math.max(parseInt(i[1]), parseInt(i[2])))
  .forEach(i => {
    if(i + current < length)
      current += i;
    else {
      count++;
      current = i;
    }
  })
console.log(`oak planks required: ${chalk.green(count)}`)



console.log(chalk.cyan("panel"))
console.log("Assuming length of 220cm")
length = 2200;
count = 0;
current = 0;
input
  .filter(i => i[0] === '"panel"')
  .map(i => Math.max(parseInt(i[1]), parseInt(i[2])))
  .forEach(i => {
    if(i + current < length)
      current += i;
    else {
      count++;
      current = i;
    }
  })
console.log(`panel planks required: ${chalk.green(count)}`)
