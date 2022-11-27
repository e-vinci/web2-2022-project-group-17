async function getAllScores() {
  try {
    const response = await fetch('/api/scores');
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
  getAllScores,
}