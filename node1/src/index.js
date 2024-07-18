const http = require ("http");
const fs = require("fs");
const link =  require("./utils/util.js");
const dotenv = require ("dotenv");
dotenv.config({path: `.env.${process.env.NODE_ENV}`});


const PORT = process.env.PORT ?? 7777;

let caminho = process.argv[2];
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    let paginaAtual = req.url;
    if(paginaAtual === "/"){
        fs.readdir(`${caminho}`, (err, files) => {
            if(err){
                console.log(err)
            }
            else{
                files.forEach(file => {
                    const createdLink = link.createLink(file)
                    res.write(createdLink);
                    
                })
                res.end();
            }
        })
    }else{
        res.write('<a href="/">voltar</a><br>')
        const urls = req.url.split("/")
        const urlValido = urls[1] == "favicon.ico" ? "": urls[1];
        if(urlValido){
            const conteudo = fs.readFileSync(`${caminho}/${urlValido}`,"utf-8");
            res.write(conteudo)
            res.end();
        }
        

    }
    
    
})

server.listen(PORT, (err) => {
    console.log(`Servidor ON, PORTA ${PORT}`)
    if(err){
        console.log(err)
    }
})