import express, {Request} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./router/router";
import logger from "./middlewares/logger";
import {engine} from "express-handlebars"
import cookieParser = require("cookie-parser");
import session from "express-session";
import {v4} from "uuid";

declare module "express-session"{
    interface SessionData{
        uid: string;
    }
}

dotenv.config()
const app = express();
const PORT = process.env.PORT ?? 7766

app.engine("handlebars", engine({helpers: require(`${__dirname}/views/helpers/helpers.ts`)}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("combined"));
app.use("/img", express.static(`${__dirname}/../public/img`));
app.locals.valor = 10;
app.use(cookieParser());
app.use(session({
    genid: () =>    v4(), 
    secret: "sdasd14214saf#@!#",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge:36000}
}))
app.use(express.urlencoded({extended: false}))
app.use(router);



app.listen(PORT, () =>{
    console.log(`Servidor Rodando na Porta ${PORT}`);
    
});