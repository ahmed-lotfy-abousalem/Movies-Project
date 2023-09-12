const express = require("express");
const Movie = require('../schemas/movies');
const router = express.Router();

const movies = [];

router.get("/", async (req,res) =>{
    const movies = await Movie.find({}).select("name category lang year rate");
    res.send(movies);
});

router.post("/", (req , res) =>{
    const body = req.body;

    const newMovie = new Movie({
        name: body.name,
        category: body.category,
        lang: body.lang,
        year: body.year,
        rate: body.rate,
    });

    newMovie.save();
    res.send(newMovie);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!id){
        res.send({error: true, message: "id is not defined"});
        return;
    }

    const movie = await Movie.findOneAndUpdate({_id: id}, { ...body }, {new: true});
    res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if(!id){
        res.send({error: true ,message: "id is not defined"});
        return;
    }

    const result = await Movie.findByIdAndDelete(id);
    res.send(result);
});

module.exports = router;
