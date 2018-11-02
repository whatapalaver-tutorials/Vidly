const {User, validate} = require('../models/users');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  
  user = new User({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  
  await user.save();
  res.send(user);
});


module.exports = router;