import { clearPage, renderImage } from '../../utils/render';
import leaderboardImage from '../../img/leaderboard.png';
import { get20BestScores, getScoresFromUser } from '../../models/scores';
import crownImage from '../../img/crown.png';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

const LeaderboardPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  const rankingsWrapper = document.createElement('div');
  rankingsWrapper.className ="intro-section d-flex flex-row";

  const scores = await get20BestScores();

  const myScores = isAuthenticated() ? await getScoresFromUser(getAuthenticatedUser().username) : undefined;

  const sortedScores = scores.sort((a,b) => b.score - a.score);

  const scoresAsHtmlTable = getScoresAsString(sortedScores);

  rankingsWrapper.innerHTML = scoresAsHtmlTable;
  main.appendChild(rankingsWrapper);

  renderImage(leaderboardImage, 'leaderboard-img-div', 200, '.leaderboard-header');
  renderImage(crownImage, 'crown-img-div', 50, '.rank1');

  const generalButton = document.querySelector('.general-btn');
  const myScoresButton = document.querySelector('.myscores-btn');
  const tbody = document.querySelector('.leaderboard-tbody');

  generalButton.addEventListener('click', (e) => {
    e.preventDefault();
    generalButton.classList.toggle('active');
    myScoresButton.classList.toggle('active');
    tbody.innerHTML = '';
    tbody.innerHTML = getAllLinesForGeneralScores(scores);
    renderImage(crownImage, 'crown-img-div', 50, '.rank1');
    
  })

  myScoresButton.addEventListener('click', (e) => {
    e.preventDefault();
    generalButton.classList.toggle('active');
    myScoresButton.classList.toggle('active');
    tbody.innerHTML = '';
    tbody.innerHTML = getAllLinesForMyScores(myScores);
    renderImage(crownImage, 'crown-img-div', 50, '.rank1');
    
  })
  
};


function getScoresAsString(scores) {
  const authenticated = isAuthenticated();
  let htmlScoresTable = 
  `<div class="leaderboard table-responsive mx-auto rounded shadow-sm my-5">
    <header class="leaderboard-header rounded-top">
      <h1 class="leaderboard-title text-uppercase text-center">Classement</h1>
      <ul class="${authenticated ? 'nav justify-content-center leaderboard-options text-uppercase fw-bold' : 'd-none'}">
        <li class="nav-item">
          <a href="#" class="nav-link leaderboard-tab general-btn text-white active">General</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link leaderboard-tab myscores-btn text-white">Mes scores</a>
        </li>
      </ul>
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

  htmlScoresTable += getAllLinesForGeneralScores(scores);

  return htmlScoresTable;



  /*
  let rank = 1;
  scores.forEach((element) => {
    htmlScoresTable += `
    <tr>
      <td class="${isRank1(rank) ? 'fs-1 text-center align-middle p-0' : 'text-center align-middle'}"> ${rank}</td>
      <td class="nickname fw-bold text-white">
        <div class=${isRank1(rank) ? "fs-1" : ""}>${element.username}<span class="rank1 ms-2"></span></div> 
        
      </td>  
      <td class="${isRank1(rank) ? 'score text-white text-break text-end align-middle fs-1' : 'score text-white text-break text-end align-middle'}"> ${element.score}</a></td>
    </tr>
    `;
    rank += 1;
  });

  return htmlScoresTable;
  */


}

function getAllLinesForGeneralScores(scores) {
  let rank = 1;
  let htmlScoresAsLines = '';
  scores.forEach((element) => {
    htmlScoresAsLines += `
    <tr>
      <td class="${isRank1(rank) ? 'fs-1 text-center align-middle p-0' : 'text-center align-middle'}"> ${rank}</td>
      <td class="nickname fw-bold text-white">
        <div class=${isRank1(rank) ? "fs-1" : ""}>${element.username}<span class="rank1 ms-2"></span></div> 
        
      </td>  
      <td class="${isRank1(rank) ? 'score text-white text-break text-end align-middle fs-1' : 'score text-white text-break text-end align-middle'}"> ${element.score}</a></td>
    </tr>
    `;
    rank += 1;
  });
  return htmlScoresAsLines
}

function getAllLinesForMyScores(scores) {
  let rank = 1;
  let htmlScoresAsLines = '';
  scores.forEach((element) => {
    htmlScoresAsLines += `
    <tr>
      <td class="${isRank1(rank) ? 'fs-1 text-center align-middle p-0' : 'text-center align-middle'}"> ${rank}</td>
      <td class="nickname fw-bold text-white">
        <div class=${isRank1(rank) ? "fs-1" : ""}>${element.username}<span class="rank1 ms-2"></span></div> 
        
      </td>  
      <td class="${isRank1(rank) ? 'score text-white text-break text-end align-middle fs-1' : 'score text-white text-break text-end align-middle'}"> ${element.score}</a></td>
    </tr>
    `;
    rank += 1;
  });
  return htmlScoresAsLines
}


function isRank1(rank) {
  return rank === 1;
}

export default LeaderboardPage;