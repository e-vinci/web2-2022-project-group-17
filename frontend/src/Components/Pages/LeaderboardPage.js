import { clearPage } from '../../utils/render';
import mainCharacterImage from '../../img/maincharacter.png';
import { getAllScores } from '../../models/scores';

const LeaderboardPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  const rankingsWrapper = document.createElement('div');
  rankingsWrapper.classList.add('intro-section', 'd-flex', 'flex-row', 'align-items-center');

  const scores = await getAllScores();

  const sortedScores = scores.sort((a,b) => b.score - a.score);

  const scoresAsHtmlTable = getScoresAsString(sortedScores);

  rankingsWrapper.innerHTML = scoresAsHtmlTable;
  main.appendChild(rankingsWrapper);

  await renderMainCharacterImage(mainCharacterImage);
  
};

function getScoresAsString(scores) {
  let htmlScoresTable = 
  `<div class="leaderboard table-responsive mx-auto rounded shadow-sm">
    <header class="leaderboard-header rounded-top">
      <h1 class="text-uppercase text-center">Leaderboard</h1>
    </header>
    <table class="table leaderboard-table">
    <thead>
      <tr>
        <th class="text-center">Rank</th>
        <th class="text-info" scope="col">Nickname</th>
        <th class="text-info text-end" scope="col">Score</th>
      </tr>
    </thead>
    <tbody class="leaderboard-tbody">`;
  
  if (scores?.length === undefined || scores.length === 0) {
    return htmlScoresTable;
  }

  let rank = 1;
  scores.forEach((element) => {
    htmlScoresTable += `
    <tr>
      <td class="text-center"> ${rank}</td>
      <td class="nickname fw-bold text-white">${element.nickname}</td>
      <td class="score text-white text-break text-end"> ${element.score}</a></td>
    </tr>
    `;
    rank += 1;
  });

  return htmlScoresTable;
}

function renderMainCharacterImage(mainCharacterUrl) {
  const image = document.createElement('img');
  image.src = mainCharacterUrl;
  image.height = 200;
  const header = document.querySelector('.leaderboard-header');
  header.appendChild(image);
}

export default LeaderboardPage;