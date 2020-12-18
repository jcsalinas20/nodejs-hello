const express = require("express")
const bodyParser = require("body-parser")
const app = express()
let http = require('http');
let fs = require('fs');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    )
    next();
})

app.get("/", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
})

app.post("/hola", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'bacon'
    });
    res.write("Hola " + req.body.name);
    res.end();
})

app.listen("1337", async () => {
    console.log("API REST corriendo en el puerto 1337")
})