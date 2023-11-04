const express = require("express");
const Axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(5000, "0.0.0.0", () => {
    console.log("Servidor On!");
});

app.get("/search", async(req, res) => {
    const { name } = req.query;

    try {
        const response = await Axios.get('https://api.jikan.moe/v4/anime?q=' + name);
        const dados = response.data.data;
        let answer = [];
        dados.forEach(anime => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url })
        });
        res.send(answer);
    } catch (error) {
        // console.log(error);
        res.send([]);
    }
});

app.get("/animes", async(req, res) => {
    try {
        let response = await Axios.get('https://api.jikan.moe/v4/seasons/now?sfw&page=1');
        let dados = response.data.data;
        let answer = [];
        dados.forEach(anime => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        response = await Axios.get('https://api.jikan.moe/v4/seasons/now?sfw&page=2');
        dados = response.data.data;
        dados.forEach(anime => {
            answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url });
        });
        res.send(answer);
    } catch (error) {
        res.send([]);
    }
});

app.get("/anime", async(req, res) => {
    try {
        const { id } = req.query;
        const response = await Axios.get('https://api.jikan.moe/v4/anime/' + id);
        res.send(response.data.data);
    } catch (error) {
        res.send([]);
    }
});