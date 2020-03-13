const formidable = require('formidable');
const path = require('path');
const fs= require('fs');
module.exports = function(req,res,file){
    let formData = formidable({
        multiples: true,
        uploadDir: './static/load',
        keepExtensions: true
    });
    formData.parse(req,(err,fields,files)=>{
        if(err){
            res.writeHead(404,'error');
            res.end('error','utf-8');
        }else{
            const oldPath = files.newFile.path;
            const newPath = path.join(__dirname,'static','load',files.newFile.name);
            fs.rename(oldPath,newPath,err=>{
                if(err){
                    res.writeHead(404,'error');
                    res.end('error','utf-8');
                }
            })
            res.writeHead(200,'OK',{
                'Content-Type': files.newFile.type,
            });
            file.push(files.newFile.name);
            res.end('upload success','utf-8');
        }
    })
}