const {add, divide} = require("./math");

const dooo = () => {
    let result;

    if (process.argv[2] !== "add" && process.argv[2] !== "divide") {
        console.log("Error, wrong function input");
        return
    }

    if (process.argv[2] === "add") result = add(parseInt(process.argv[3]), parseInt(process.argv[4]));
    if (process.argv[2] === "divide") result = divide(parseInt(process.argv[3]), parseInt(process.argv[4]));
    console.log(`Result is ${result} !`);
}

dooo();
