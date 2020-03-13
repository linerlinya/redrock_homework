const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const uploadFile = require('./uploadFile');
let newFile = [];
module.exports = function(req,res){
    if(req.method.toUpperCase()==='GET'){
        let {search,pathname} = url.parse(req.url);
        if(pathname==='/favicon.ico'){
            res.end();
        }else if(pathname==='/'&&search===null||pathname==='/index'){
            res.writeHead(200,'OK',{
                'Content-Type': 'text/html'
            })
            fs.createReadStream('./static/main/index.html').pipe(res);
        }else if(search==='?name=findNewFile'){
            if(newFile.length===0){
                res.writeHead(404);
                res.end('no new');
            }else{
                res.writeHead(200,'OK');
                res.end(newFile.join(','));
                newFile = [];
            }
        }else if(pathname.slice(0,9)==='/resource'){
            let fileName = pathname.slice(10);
            let filePath = path.join(__dirname,'static','load',fileName);
            res.writeHead(200,'OK');
            fs.createReadStream(filePath).pipe(res);
        }else{
            res.writeHead(404);
            res.end();
        }
    }else if(req.method.toUpperCase()==='POST'){
        let temp = uploadFile(req,res,newFile);
    }
}