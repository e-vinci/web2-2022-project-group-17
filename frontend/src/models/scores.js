async function get20BestScores() {
  try {
    const response = await fetch('/api/scores?top=20');
    if (!response.ok) throw new Error(`fetch error:: scores : ${response.status} : ${response.statusText}`);

    const scores = await response.json();
    return scores;
  } catch (err) {
    /* eslint-disable no-console */
    console.error('getAllScores::error ', err);
    throw err;
  }
}

async function getScoresFromUser(username) {
  try {
    const response = await fetch(`/api/scores/${username}`);
    if (!response.ok) throw new Error(`fetch error:: scores : ${response.status} : ${response.statusText}`);

    const scores = await response.json();
    return scores;
  } catch (err) {
    /* eslint-disable no-console */
    console.error('getAllScores::error ', err);
    throw err;
  }
}

module.exports = {
  get20BestScores,
  getScoresFromUser,
}