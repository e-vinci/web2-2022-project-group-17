import { clearPage, renderPageTitle } from '../../utils/render';

const SCORES = [
  {
    id: 1,
    username: 'Denis',
    score: 400,
  },
  {
    id: 2,
    username: 'Thomas',
    score: 500,
  },
  
  {
    id: 3,
    username: 'Jason',
    score: 450,
  }
  
];

const RankingsPage = () => {
  clearPage();
  renderPageTitle('Rankings');
  const main = document.querySelector('main');
  const rankingsWrapper = document.createElement('div');

  const sortedScores = SCORES.sort((a,b) => b.score - a.score);

  const scoresAsHtmlTable = getScoresAsString(sortedScores);

  rankingsWrapper.innerHTML = scoresAsHtmlTable;
  main.appendChild(rankingsWrapper);
  
};

function getScoresAsString(scores) {
  if (scores?.length === undefined || scores.length === 0) {
    return '<p class="p-5">No scores yet : (</p>';
  }

  let htmlScoresTable = `<div class="table-responsive p-5">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Username</th>
        <th scope="col">Score</th>
      </tr>
    </thead>
    <tbody>`;

  scores.forEach((element) => {
    htmlScoresTable += `
    <tr>
      <td class="fw-bold text-info">${element.username}</td>
      <td class="text-info text-break"> ${element.score}</a></td>
    </tr>
    `;
  });

  return htmlScoresTable;
}


export default RankingsPage;