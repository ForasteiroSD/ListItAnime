"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const node_process_1 = require("node:process");
const cors = require("cors");
const PORT = node_process_1.env.PORT || 5000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log("Servidor On!");
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Vercel Server");
}));
app.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const response = yield axios_1.default.get('https://api.jikan.moe/v4/anime?sfw&q=' + name);
        let dados = response.data.data;
        let answer = [];
        dados.sort((a, b) => b.score - a.score).forEach((anime) => answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url }));
        res.send(answer);
    }
    catch (error) {
        res.send([]);
    }
}));
app.get("/animes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield axios_1.default.get('https://api.jikan.moe/v4/seasons/now?sfw&page=1');
        let dados = response.data.data;
        let answer = [];
        dados.forEach((anime) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        response = yield axios_1.default.get('https://api.jikan.moe/v4/seasons/now?sfw&page=2');
        dados = response.data.data;
        dados.forEach((anime) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        response = yield axios_1.default.get('https://api.jikan.moe/v4/seasons/now?sfw&page=3');
        dados = response.data.data;
        dados.forEach((anime) => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        res.send(answer);
    }
    catch (error) {
        res.send([]);
    }
}));
app.get("/anime", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const response = yield axios_1.default.get('https://api.jikan.moe/v4/anime/' + id);
        res.send(response.data.data);
    }
    catch (error) {
        res.send([]);
    }
}));
app.post("/sign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nickname } = req.body;
    //Create account
    if (nickname) {
        try {
            const user = yield prisma.user.create({
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
            res.send({ id: user.id, nickname: user.nickname });
        }
        catch (error) {
            res.send('Email already in use');
        }
    }
    else {
        //Sign In
        const user = yield prisma.user.findFirst({
            where: {
                AND: {
                    email: email,
                    password: password
                }
            }
        });
        if (user)
            res.send({ id: user.id, nickname: user.nickname });
        else
            res.send('Invalid Data');
    }
}));
app.get("/insertToWatchWatched", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list, anime, userId, score } = req.query;
    try {
        let watchedList = yield prisma.list.findFirst({
            where: {
                name: 'Watched',
                userId: userId
            }
        });
        const toWatchList = yield prisma.list.findFirst({
            where: {
                name: 'To Watch',
                userId: userId
            }
        });
        let updateList;
        if (list === 'To Watch') {
            const animesWatched = yield prisma.anime.findFirst({
                where: {
                    mal_id: Number(anime.mal_id),
                    listId: watchedList === null || watchedList === void 0 ? void 0 : watchedList.id
                }
            });
            if (animesWatched === null || animesWatched === void 0 ? void 0 : animesWatched.mal_id) {
                return res.send('Anime already watched');
            }
            updateList = toWatchList;
        }
        else {
            const deleteAnimes = yield prisma.anime.deleteMany({
                where: {
                    mal_id: Number(anime.mal_id),
                    listId: toWatchList === null || toWatchList === void 0 ? void 0 : toWatchList.id
                }
            });
            updateList = watchedList;
        }
        const animes = yield prisma.anime.findMany({
            where: {
                listId: updateList === null || updateList === void 0 ? void 0 : updateList.id
            }
        });
        let bigger;
        if (animes.length > 0)
            bigger = animes[animes.length - 1].position_score;
        else
            bigger = -1;
        const animeInsert = yield prisma.anime.create({
            data: {
                mal_id: Number(anime.mal_id),
                title: anime.title,
                image: anime.images.webp.large_image_url,
                position_score: bigger + 1,
                synopsis: anime.synopsis,
                list: {
                    connect: {
                        id: updateList === null || updateList === void 0 ? void 0 : updateList.id
                    }
                },
            }
        });
        if (score) {
            const topList = yield prisma.list.findFirst({
                where: {
                    name: 'Top List',
                    userId: userId
                }
            });
            const animeInsert = yield prisma.anime.create({
                data: {
                    mal_id: Number(anime.mal_id),
                    title: anime.title,
                    image: anime.images.webp.large_image_url,
                    position_score: Number(score),
                    synopsis: anime.synopsis,
                    list: {
                        connect: {
                            id: topList === null || topList === void 0 ? void 0 : topList.id
                        }
                    }
                }
            });
        }
        res.send('Anime inserted successfully');
    }
    catch (error) {
        res.send('Anime already registered in list');
    }
}));
app.get("/getAnimesList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list, userId } = req.query;
    const List = yield prisma.list.findFirst({
        where: {
            name: list,
            userId: userId
        }
    });
    if (!List) {
        res.send([]);
        return;
    }
    const animes = yield prisma.anime.findMany({
        where: {
            listId: List === null || List === void 0 ? void 0 : List.id
        }
    });
    res.send(animes);
}));
app.get("/removeAnime", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mal_id, userId, listName } = req.query;
    try {
        if (listName === 'Watched') {
            const watched = yield prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: 'Watched'
                }
            });
            const topList = yield prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: 'Top List'
                }
            });
            yield prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: watched === null || watched === void 0 ? void 0 : watched.id
                }
            });
            yield prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: topList === null || topList === void 0 ? void 0 : topList.id
                }
            });
        }
        else {
            const list = yield prisma.list.findFirst({
                where: {
                    userId: userId,
                    name: listName
                }
            });
            const anime = yield prisma.anime.deleteMany({
                where: {
                    mal_id: Number(mal_id),
                    listId: list === null || list === void 0 ? void 0 : list.id
                }
            });
        }
        res.send('Removed');
    }
    catch (error) {
        res.send('Failed to remove');
    }
}));
app.get("/get/userData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: String(id)
            },
            select: {
                email: true,
                nickname: true
            }
        });
        if (user)
            res.send(user);
    }
    catch (error) {
        res.send('Database off, sorry');
    }
}));
app.get("/editScore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { animeId, userId, score } = req.query;
    try {
        const topList = yield prisma.list.findFirst({
            where: {
                name: 'Top List',
                userId: userId
            }
        });
        const anime = yield prisma.anime.updateMany({
            where: {
                mal_id: Number(animeId),
                listId: topList === null || topList === void 0 ? void 0 : topList.id
            },
            data: {
                position_score: Number(score)
            }
        });
        res.send('Score edited succesfully');
    }
    catch (error) {
        res.send('Failed to edit');
    }
}));
app.post("/get/topAnimes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const topList = yield prisma.list.findFirst({
            where: {
                name: 'Top List',
                userId: userId
            }
        });
        if (!topList) {
            res.send([]);
            return;
        }
        const animes = yield prisma.anime.findMany({
            where: {
                listId: topList === null || topList === void 0 ? void 0 : topList.id
            }
        });
        animes.sort((a, b) => b.position_score - a.position_score);
        res.send(animes);
    }
    catch (error) {
        res.send('Failed to edit');
    }
}));
app.post("/changeData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, email, password, newPassword, nickname } = req.body;
    try {
        const user = yield prisma.user.update({
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
    }
    catch (error) {
        if (error.code === 'P2025')
            res.send('Invalid Data');
        else
            res.send('Email already in use');
    }
}));
exports.default = app;
