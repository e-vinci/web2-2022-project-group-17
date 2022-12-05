const path = require('node:path');
const { escape } = require('node:querystring');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(`${__dirname  }/../data/scores.json`);

const defaultScores = [
  {
    id: 1,
    nickname: 'Denis',
    score: 300,
  },
  {
    id: 2,
    nickname: 'Thomas',
    score: 350,
  },
  {
    id: 3,
    nickname: 'Daniel',
    score: 200,
  },
  {
    id: 4,
    nickname: 'Jean',
    score: 100,
  },
];


function readAllScores() {
  const scores = parse(jsonDbPath, defaultScores);

  return scores;
}

function addOneScore(nickname, score) {
  const scores = parse(jsonDbPath, defaultScores);

  const newScore = {
    nickname,
    score,
  };

  scores.push(newScore);

  serialize(jsonDbPath, scores);

  return newScore;
}

function updateOneScore(nickname, scoreToBeUpdated) {
  const scores = parse(jsonDbPath, defaultScores);
  const foundIndex = scores.findIndex((score) => score.nickname === nickname);
  if (!scoreFound) {
    return undefined;
  }
  if (scoreFound?.score) {
    scoreFound.score = scoreToBeUpdated;
  }

  serialize(jsonDbPath, scores);
}

module.exports = {
  readAllScores,
  addOneScore,
  updateOneScore,
}