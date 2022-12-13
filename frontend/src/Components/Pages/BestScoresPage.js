import { clearPage, renderImage } from '../../utils/render';
import mainCharacterImage from '../../img/maincharacter.png';
import { getScoresFromUser } from '../../models/scores';
import crownImage from '../../img/crown.png';
import { getAuthenticatedUser } from '../../utils/auths';

const BestScoresPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  const rankingsWrapper = document.createElement('div');
  rankingsWrapper.classList.add('intro-section', 'd-flex', 'flex-row', 'align-items-center');

  const scores = await getScoresFromUser(getAuthenticatedUser().username);

  const sortedScores = scores.sort((a,b) => b.score - a.score);

  const scoresAsHtmlTable = getScoresAsString(sortedScores);

  rankingsWrapper.innerHTML = scoresAsHtmlTable;
  main.appendChild(rankingsWrapper);

  renderImage(mainCharacterImage, 'main-character-div', 200, '.leaderboard-header');
  renderImage(crownImage, 'crown-img-div', 50, '.rank1')
  
};



function getScoresAsString(scores) {
  let htmlScoresTable = 
  `<div class="leaderboard table-responsive mx-auto rounded shadow-sm">
    <header class="leaderboard-header rounded-top">
      <h1 class="text-uppercase text-center">Classement</h1>
    </header>
    <table class="table leaderboard-table">
    <thead>
      <tr>
        <th class="text-info text-center">Rang</th>
        <th class="text-info" scope="col">Nom d'utilisateur</th>
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
      <td class="${isRank1(rank) ? 'fs-1 text-center align-middle p-0' : 'text-center align-middle'}"> ${rank}</td>
      <td class="nickname fw-bold text-white">
        <div class=${isRank1(rank) ? "fs-1" : ""}>${element.nickname}<span class="rank1 ms-2"></span></div> 
        
      </td>  
      <td class="${isRank1(rank) ? 'score text-white text-break text-end align-middle fs-1' : 'score text-white text-break text-end align-middle'}"> ${element.score}</a></td>
    </tr>
    `;
    rank += 1;
  });

  return htmlScoresTable;
}

function isRank1(rank) {
  return rank === 1;
}

export default BestScoresPage;