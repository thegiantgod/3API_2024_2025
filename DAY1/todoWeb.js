const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {


    //TODO Try and fix this code !
    let data;
    req.on("data", (dataEvent) =>  {
        data = dataEvent.toString();
        console.log(dataEvent.toString())
    });
    res.writeHead(200);
    res.end(`Got this request : ${data}`)
})

server.listen(port, () => console.log(`Listening on localhost:${port} !`));