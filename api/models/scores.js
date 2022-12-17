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

function deleteOneScore(id) {
  const idAsNumber = parseInt(id, 10);
  const scores = parse(jsonDbPath);
  const foundIndex = scores.findIndex((score) => score.id === idAsNumber);
  if (foundIndex < 0) return undefined;
  const deletedScores = scores.splice(foundIndex, 1);
  const deletedScore = deletedScores[0];
  serialize(jsonDbPath, scores);

  return deletedScore;
}

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
  addOneScore,
  deleteOneScore
}