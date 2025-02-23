import express from 'express'
import { Request, Response } from 'express';
import Axios from 'axios';
import { PrismaClient } from "@prisma/client";
import { env } from "node:process";

const cors = require("cors");
const PORT = env.PORT || 5000;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log("Servidor On!");
});

app.get("/", async(req: Request, res: Response) => {
    res.send("Vercel Server");
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
            res.send({id: user.id, nickname: user.nickname});
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
        if(user) res.send({id: user.id, nickname: user.nickname});
        else res.send('Invalid Data');
    }
});


app.get("/insertToWatchWatched", async(req: any, res: Response) => {

    const { list, anime, userId, score } = req.query;

    try {

        let watchedList = await prisma.list.findFirst({
            where: {
                name: 'Watched',
                userId: userId
            }
        });

        const toWatchList = await prisma.list.findFirst({
            where: {
                name: 'To Watch',
                userId: userId
            }
        });

        let updateList;

        if(list === 'To Watch') {
            const animesWatched = await prisma.anime.findFirst({
                where: {
                    mal_id: Number(anime.mal_id),
                    listId: watchedList?.id
                }
            });

            if(animesWatched?.mal_id) {
                return res.send('Anime already watched');
            }
            updateList = toWatchList;
        } else {
            const deleteAnimes = await prisma.anime.deleteMany({
                where: {
                    mal_id: Number(anime.mal_id),
                    listId: toWatchList?.id
                }
            });
            updateList = watchedList;
        }
        
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
                synopsis: anime.synopsis,
                list: {
                    connect: {
                        id: updateList?.id
                    }
                },
            }
        });

        if(score) {
            const topList = await prisma.list.findFirst({
                where: {
                    name: 'Top List',
                    userId: userId
                }
            });

            const animeInsert = await prisma.anime.create({
                data: {
                    mal_id: Number(anime.mal_id),
                    title: anime.title,
                    image: anime.images.webp.large_image_url,
                    position_score: Number(score),
                    synopsis: anime.synopsis,
                    list: {
                        connect: {
                            id: topList?.id
                        }
                    }
                }
            });
        }
        
        res.send('Anime inserted successfully');
    } catch(error) {
        res.send('Anime already registered in list')
    }
});

app.get("/getAnimesList", async(req: any, res: Response) => {

    const { list, userId } = req.query;

    const List = await prisma.list.findFirst({
        where: {
            name: list,
            userId: userId
        }
    });

    if(!List) {
        res.send([]);
        return;
    }

    const animes = await prisma.anime.findMany({
        where: {
            listId: List?.id
        }
    });
    
    res.send(animes);
});

app.get("/removeAnime", async (req: any, res: Response) => {
    const { mal_id, userId, listName } = req.query;

    try {

        if(listName === 'Watched') {
            const watched = await prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: 'Watched'
                }
            });

            const topList = await prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: 'Top List'
                }
            });
           
            await prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: watched?.id
                }
            });

            await prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: topList?.id
                }
            });
            
        } else {
            const list = await prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: listName
                }
            });

            const anime = await prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: list?.id
                }
            });
        }

        res.send('Removed');
    } catch (error) {
        res.send('Failed to remove');
    }
});

app.get("/get/userData", async (req: Request, res: Response) => {
    const {id} = req.query;
    
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: String(id)
            },
            select: {
                email: true,
                nickname: true
            }
        });

        if(user) res.send(user);
    } catch (error) {
        res.send('Database off, sorry');
    }
});

app.get("/editScore", async (req: any, res: Response) => {
    const { animeId, userId, score } = req.query;

    try {

        const topList = await prisma.list.findFirst({
            where: {
                name: 'Top List',
                userId: userId
            }
        });

        const anime = await prisma.anime.updateMany({
            where: {
                mal_id: Number(animeId),
                listId: topList?.id
            }, 
            data: {
                position_score: Number(score)
            }
        });
        
        res.send('Score edited succesfully');
    } catch (error) {
        res.send('Failed to edit');
    }
});

app.post("/get/topAnimes", async(req: any, res: Response) => {
    const {userId} = req.body;

    try {
        const topList = await prisma.list.findFirst({
            where: {
                name: 'Top List',
                userId: userId
            }
        });

        if(!topList) {
            res.send([]);
            return;
        }

        const animes = await prisma.anime.findMany({
            where: {
                listId: topList?.id
            }
        });

        animes.sort((a: any, b: any) => b.position_score - a.position_score);
        
        res.send(animes);
    } catch (error) {
        res.send('Failed to edit');
    }
});

app.post("/changeData", async (req: Request, res: Response) => {
    const {userId, email, password, newPassword, nickname} = req.body;
    
    try {
        const user = await prisma.user.update({
            where: {
                id: String(userId),
                password: password
            },
            data: {
                email: email,
                nickname: nickname,
                password: newPassword
            }
        });

        res.send('Data changed');
        
    } catch (error: any) {
        if(error.code === 'P2025') res.send('Invalid Data');
        else res.send('Email already in use');
    }
});

export default app;
