const http = require('http');
const luyou = require('./connact');
let server = http.createServer();

server.on('request',(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    luyou(req,res);
})
server.listen(3000);