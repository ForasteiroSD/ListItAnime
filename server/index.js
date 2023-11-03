const express = require("express");
const got = require("got");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(5000, "0.0.0.0", () => {
    console.log("Servidor On!");
});

app.get("/animes", async(req, res) => {
    const { name } = req.query;

    const response = await got('https://api.jikan.moe/v4/anime?q=' + name, { json: true });
    const dados = response.body.data;
    let answer = '<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; align-items: center">';
    for (i = 0; i < dados.length; i++) {
        answer += '<div style="width: 170px"><img src="' + dados[i].images.webp.large_image_url + '" alt="' + dados[i].title + '" style="width: 150px"></br>'
        answer += dados[i].title + '</div>';
    }
    answer += '</div>';
    res.send(answer);
});

app.get("/recomendations", async(req, res) => {
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

<<<<<<< Updated upstream
    const response = await got('https://api.jikan.moe/v4/recommendations/anime', { json: true });
    const dados = response.body.data;
    let answer = [];
    for (i = 0; i < dados.length; i++) {
        answer.push({ "mal_id": dados[i].entry[0].mal_id, "title": dados[i].entry[0].title, "image": dados[i].entry[0].images.webp.large_image_url });
        answer.push({ "mal_id": dados[i].entry[1].mal_id, "title": dados[i].entry[1].title, "image": dados[i].entry[1].images.webp.large_image_url });
    }
    answer = getUniqueListBy(answer, 'mal_id');
    res.send(answer);
=======
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
    } catch (err) {
      throw new Error(err.message)
    }
});


app.get("/anime", async(req, res) => {
    const { id } = req.query;
    const response = await Axios.get('https://api.jikan.moe/v4/anime/' + id);
    res.send(response.data.data);
>>>>>>> Stashed changes
});