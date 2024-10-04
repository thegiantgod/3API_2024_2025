// ESM
//import {add, divide} from "./math.js";
//import _default from "./default.js";

// CommonJS
const {add: somme, divide} = require("./math");
const _default = require("./default");

console.log(somme(_default[0], _default[1]));
console.log(divide(_default[0], _default[1]));
