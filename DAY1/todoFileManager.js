const fs = require("fs/promises");

const readFile = async () => {
    try {
        const data = await fs.readFile("./todos.json", "utf8");
        return data;
      } catch (err) {
        console.error("Error reading the file:", err);
        return null;
      }
}

const writeFile = (data) => {
    try {
        fs.writeFile("./todos.json", JSON.stringify(data));
    } catch (err) {
        console.error("Error Writing the file:", err);
    }
}

module.exports = {
    readFile,
    writeFile
}