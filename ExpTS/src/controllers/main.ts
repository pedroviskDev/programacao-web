import { Request, Response } from "express"

const hb1 = (req: Request, res: Response) => {
    res.render("main/hb1", {mensagem: "Olá"})
};

const hb2 = (req: Request, res: Response) => {
    res.render("main/hb2", {
        vencedorCaprichoso: true
    })
};

const hb3 = (req: Request, res: Response) => {
    const profs = [
        {name: "David Fernandes", room: 321},
        {name: "Altigran Soares", room: 224},
        {name: "Elaine Harada", room: 345},
        {name: "Horácio Fernandes", room: 224},
    ];
    res.render("main/hb3", {profs})
        
};

const hb4 = (req: Request, res: Response) => {
    const profs = [
        {name: "David Fernandes", room: 321},
        {name: "Altigran Soares", room: 224},
        {name: "Elaine Harada", room: 345},
        {name: "Horácio Fernandes", room: 224},
    ];
    res.render("main/hb4", {profs})
        
};

const bemvindo = (req: Request, res: Response) =>{
    res.send(`Seja bem-vidno(a) ${req.params.nome}`)
}

const about = (req: Request, res: Response) => {
    res.send("Página about")
};

export default {hb1, hb2, hb3, hb4, about, bemvindo}