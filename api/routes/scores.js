const express = require('express');
// const path = require('node:path');

const { readAllScores, addOneScore } = require('../models/scores');

const router = express.Router();

// const jsonDbPath = path.join(__dirname, '/../data/scores.json');


// get scores
router.get('/', (req, res) => {
  /*
  const scores = parse(jsonDbPath, SCORES);
  orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  */
  const top = req?.query?.top;
  const scores = readAllScores();
  let orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  if(top){
    orderedLeaderboard = orderedLeaderboard.slice(0, top);
  }
  return res.json(orderedLeaderboard);
});


// get scores from user
router.get('/:user', (req, res) => {
  /*
  const scores = parse(jsonDbPath, SCORES);
  orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  */
  const scores = readAllScores();
  let orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  orderedLeaderboard = orderedLeaderboard.filter(score => score.username === req.params.user);
  return res.json(orderedLeaderboard);
});

module.exports = router;


// add score
router.post('/', (req, res) => {
  const { username } = req.body;
  const { score } = req.body;

  const addedScore = addOneScore(username, score);
  return res.json(addedScore);
})