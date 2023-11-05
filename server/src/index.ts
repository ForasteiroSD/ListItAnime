import express from 'express'
import { Request, Response } from 'express';
import Axios from 'axios';
import prisma  from "./lib/prisma";
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.listen(5000, "0.0.0.0", () => {
    console.log("Servidor On!");
});

app.get("/search", async(req: Request, res: Response) => {
    const { name } = req.query;

    try {
        const response = await Axios.get('https://api.jikan.moe/v4/anime?sfw&q=' + name);
        let dados = response.data.data;
        let answer : any[] = [];
        dados.sort((a: any, b: any) => b.score - a.score).forEach((anime: any) => answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url }));
        res.send(answer);
    } catch (error) {
        res.send([]);
    }
});

app.get("/animes", async(req: Request, res: Response) => {

    try {
        let response = await Axios.get('https://api.jikan.moe/v4/seasons/now?sfw&page=1');
        let dados = response.data.data;
        let answer : any[] = [];
        dados.forEach((anime: any) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        response = await Axios.get('https://api.jikan.moe/v4/seasons/now?sfw&page=2');
        dados = response.data.data;
        dados.forEach((anime: any) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        response = await Axios.get('https://api.jikan.moe/v4/seasons/now?sfw&page=3');
        dados = response.data.data;
        dados.forEach((anime: any) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        res.send(answer);
    } catch (error) {
        res.send([]);
    }
});

app.get("/anime", async(req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const response = await Axios.get('https://api.jikan.moe/v4/anime/' + id);
        res.send(response.data.data);
    } catch (error) {
        res.send([]);
    }
});

app.post("/sign", async(req: Request, res: Response) => {
    const {email, password, nickname, confirmPass} = req.body;

    //Create account
    if(nickname) {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
                nickname: nickname
            }
        });
        res.send(user);
    } else {
        //Sign In
        const user = await prisma.user.findFirst({
            where: {
                AND: {
                    email: email,
                    password: password
                }
            }
        });
        if(user) res.send(user);
        else res.send('Invalid Data');
    }
});