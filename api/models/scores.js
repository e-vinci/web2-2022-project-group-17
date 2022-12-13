const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(`${__dirname  }/../data/scores.json`);

const defaultScores = [
  {
    id: 1,
    username: 'Denis',
    score: 300,
  },
  {
    id: 2,
    username: 'Thomas',
    score: 350,
  },
  {
    id: 3,
    username: 'Daniel',
    score: 200,
  },
  {
    id: 4,
    username: 'Jean',
    score: 100,
  },
];


function readAllScores() {
  const scores = parse(jsonDbPath, defaultScores);

  return scores;
}

function addOneScore(username, score) {
  const scores = parse(jsonDbPath, defaultScores);

  const newScore = {
    id: getNextId(),
    username,
    score,
  };

  scores.push(newScore);

  serialize(jsonDbPath, scores);

  return newScore;
}

/*
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
  return;
}
*/

function getNextId() {
  const scores = parse(jsonDbPath, defaultScores);
  const lastItemIndex = scores?.length !== 0 ? scores.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = scores[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  readAllScores,
  addOneScore
}