

async function get20BestScores() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/scores?top=20`);
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
    const response = await fetch(`${process.env.API_BASE_URL}/scores/${username}`);
    if (!response.ok) throw new Error(`fetch error:: scores : ${response.status} : ${response.statusText}`);

    const scores = await response.json();
    return scores;
  } catch (err) {
    /* eslint-disable no-console */
    console.error('getAllScores::error ', err);
    throw err;
  }
}





async function deleteOneScore(id) {
  if (!id) return undefined;

  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`/api/scores/${id}`, options);

    if (!response.ok) {
      throw new Error(`deleteOneScore:: fetch error : ${response.status} : ${response.statusText}`);
    }
    const deletedScore = await response.json();
    return deletedScore;
  } catch (err) {
    console.error('deleteOneScore::error: ', err);
    throw err;
  }
}


module.exports = {
  get20BestScores,
  getScoresFromUser,
  deleteOneScore,
}