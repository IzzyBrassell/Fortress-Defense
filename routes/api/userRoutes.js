const Score = require('../../models/score');

const router = require('express').Router();

router.post('/signup', async (req, res) => {
    try {
      const newUser = req.body;
      newScore.password = await bcrypt.hash(req.body.password, 10);
      const ScoreData = await Score.create(newScore);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  module.exports = router;
  