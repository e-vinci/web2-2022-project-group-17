import { clearPage } from '../../utils/render';
import mainCharacterImage from '../../img/maincharacter.png';

const SCORES = [
  {
    id: 1,
    nickname: 'Denis',
    score: 400,
  },
  {
    id: 2,
    nickname: 'Thomas',
    score: 500,
  },
  
  {
    id: 3,
    nickname: 'Jason',
    score: 450,
  }
  
];

const LeaderboardPage = () => {
  clearPage();
  const main = document.querySelector('main');
  const rankingsWrapper = document.createElement('div');

  const sortedScores = SCORES.sort((a,b) => b.score - a.score);

  const scoresAsHtmlTable = getScoresAsString(sortedScores);

  rankingsWrapper.innerHTML = scoresAsHtmlTable;
  main.appendChild(rankingsWrapper);
  renderMainCharacterImage(mainCharacterImage);
  
};

function getScoresAsString(scores) {
  if (scores?.length === undefined || scores.length === 0) {
    return '<p class="p-5">No scores yet : (</p>';
  }

  let htmlScoresTable = 
  `<div class="leaderboard table-responsive mx-auto my-5 rounded shadow-sm">
    <header class="leaderboard-header rounded-top">
      <h1 class="text-uppercase text-center">Leaderboard</h1>
    </header>
    <table class="table leaderboard-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th class="text-info" scope="col">Nickname</th>
        <th class="text-info text-end" scope="col">Score</th>
      </tr>
    </thead>
    <tbody class="leaderboard-tbody">`;

  let rank = 1;
  scores.forEach((element) => {
    htmlScoresTable += `
    <tr>
      <td> ${rank}</td>
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