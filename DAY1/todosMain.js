const {readFile, writeFile} = require("./todoFileManager");

let json;
const run = async () => {
    const data = await readFile();
    console.log(data.toString());

    json = JSON.parse(data.toString());

    json.push({
        "title": "todo1",
        "description": "Push to Git"
    });

    writeFile(json);

};

run();

