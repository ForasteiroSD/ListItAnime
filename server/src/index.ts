import express from 'express'
import { Request, Response } from 'express';
import Axios from 'axios';
import prisma  from "./lib/prisma";
import { type, userInfo } from 'os';
import { error } from 'console';
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
    const {email, password, nickname} = req.body;

    //Create account
    if(nickname) {
        try {
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: password,
                    nickname: nickname,
                    lists: {
                        create: [
                            {
                                name: 'To Watch'
                            },
                            {
                                name: 'Watched'
                            },
                            {
                                name: 'Top List'
                            }
                        ]
                    }
                }
            });
            res.send(user);
        } catch (error) {
            res.send('Email already in use');
        }
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


app.get("/insertToWatchWatched", async(req: any, res: Response) => {

    const { list, anime, userId } = req.query;

    try {
        const updateList = await prisma.list.findFirst({
            where: {
                name: list,
                userId: userId
            }
        });
        const animes = await prisma.anime.findMany({
            where: {
                listId: updateList?.id
            }
        });
        let bigger;
        if(animes.length > 0) bigger = animes[animes.length-1].position_score;
        else bigger = -1;
        const animeInsert = await prisma.anime.create({
            data: {
                mal_id: Number(anime.mal_id),
                title: anime.title,
                image: anime.images.webp.large_image_url,
                position_score: bigger+1,
                list: {
                    connect: {
                        id: updateList?.id
                    }
                }
            }
        });
        res.send('Anime inserted successfully');
    } catch(error) {
        res.send('Anime already registered in list')
    }
    
    
});