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

    const response = await Axios.get('https://api.jikan.moe/v4/anime?q=' + name);
    const dados = response.data.data;
    let answer = [];
    dados.forEach(anime => {
        answer.push({ "mal_id": anime.mal_id, "title": anime.title, "image": anime.images.webp.large_image_url })
    });
    res.send(answer);
});

app.get("/animes", async(req, res) => {
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    try {
        const response = await Axios.get('https://api.jikan.moe/v4/recommendations/anime');
        const dados = response.data.data;
        let answer = [];
        dados.forEach(anime => {
            answer.push({ "mal_id": anime.entry[0].mal_id, "title": anime.entry[0].title, "image": anime.entry[0].images.webp.large_image_url });
            answer.push({ "mal_id": anime.entry[1].mal_id, "title": anime.entry[1].title, "image": anime.entry[1].images.webp.large_image_url });
            
        });
        answer = getUniqueListBy(answer, 'mal_id');
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