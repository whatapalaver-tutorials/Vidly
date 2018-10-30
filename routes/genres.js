const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
  {id: 1, name: "action"},
  {id: 2, name: "western"},
  {id: 3, name: "comedy"}
]

router.get('/', (req,res) => {
  res.send(genres)
});

router.get('/:id', (req,res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre id not found");
  res.send(genre);
});

router.post('/', (req, res) => {
  const result = validateGenre(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre id not found");

  const result = validateGenre(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre id not found");

  let index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
