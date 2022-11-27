const express = require('express');
const path = require('node:path');

const { readAllScores, addOneScore } = require('../models/scores');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/scores.json');


// get all scores
router.get('/', (req, res) => {
  /*
  const scores = parse(jsonDbPath, SCORES);
  orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  */
  const scores = readAllScores();
  orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  return res.json(orderedLeaderboard);
});

module.exports = router;


// add score
router.post('/', (req, res) => {
  const nickname = req.body.nickname;
  const score = req.body.score;

  const addedScore = addOneScore(nickname, score);
  return res.json(addedScore);
})