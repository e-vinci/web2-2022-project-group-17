const express = require('express');
// const path = require('node:path');
const { authorize, isAdmin } = require('../utils/auths'); 

const { readAllScores, addOneScore, deleteOneScore } = require('../models/scores');


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
  const top = req?.query?.top;
  const scores = readAllScores();
  let orderedLeaderboard = [...scores].sort((a, b) => b.score - a.score);
  orderedLeaderboard = orderedLeaderboard.filter(score => score.username === req.params.user);
  if (top) {
    orderedLeaderboard = orderedLeaderboard.slice(0,top);
  }
  return res.json(orderedLeaderboard);
});

// add score
router.post('/', (req, res) => {
  const { username } = req.body;
  const { score } = req.body;

  const addedScore = addOneScore(username, score);
  return res.json(addedScore);
})


router.delete('/:id', authorize, isAdmin, (req, res) => {
  const deletedScore = deleteOneScore(req?.params?.id);

  if (!deletedScore) return res.sendStatus(404);

  return res.json(deletedScore);
});





module.exports = router;