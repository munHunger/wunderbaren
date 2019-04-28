const fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");

input = input
  .split("\n")
  .filter(s => s.indexOf("ECHO") >= 0)
  .map(s => s.substring(6, s.length))
  .map(s => s.split(",").map(s => s.trim()));

input = input
  .filter(i => i[0] === '"squareProfile"')
  .map(i => parseInt(i[1]))
  .reduce((acc, val) => (acc += val), 0);
console.log((input / 1000) * (179 / 2));
