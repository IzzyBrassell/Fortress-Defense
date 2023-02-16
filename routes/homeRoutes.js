const express = require('express')
const router = express.Router();
const path = require('path');
const { Score } = require('../models/score');
const withAuth = require('../utils/auth');

router.use(express.static(path.join(__dirname, '/../public')));


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/start.html"))
})

router.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/game.html'))
})

router.get('/score', withAuth, async (req, res) => {
    try {
      const userData = await Score.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.sendFile(path.join(__dirname, '/../public/highscore.html'), {
        users,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/auth', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/score');
      return;
    }
  
    res.sendFile(path.join(__dirname, '/../public/auth.html'));
  });

  router.post(`/auth` , )

  module.exports = router;