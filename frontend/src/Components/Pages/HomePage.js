// import anime from 'animejs/lib/anime.es';
import { clearPage, renderImage } from '../../utils/render';
import Navigate from '../Router/Navigate';

import zombieImage from '../../img/zombie.png';
import arrowKeysImage from '../../img/arrowkeys.png'
import gemImage from '../../img/gems.png';
import zombie2Image from '../../img/zombie2.png'
import zombieBossImage from '../../img/boss.png';
import stragegyImage from '../../img/strategy.png';

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  
  const homePage = `
  <section class="intro-section"> 
    <div class="home-content container-fluid">
      <div class="row intro-row">
        <div class="col-xl-8 col-md-12 play-now-content">
          <h1 class="title1" data-aos="fade-right" data-aos-duration=1500 data-aos-mirror="true">Zombie Survivors</h1>
          <h5 class="mb-5" data-aos="fade-right" data-aos-delay=200 data-aos-duration=1500 data-aos-mirror="true">Un jeu mélangeant des éléments rogue-like à de la survie.</h6>
          <div class="home-buttons d-flex" data-aos="fade-right" data-aos-delay=350 data-aos-duration=1500 data-aos-mirror="true">
            <button href="#" class="btn btn-warning play-now-btn me-4"><i class="fa-solid fa-play me-2"></i> Jouer maintenant</button>
            <button href="#" id="how-to-play-button" class="btn btn-light how-to-play-button"><i class="fa-solid fa-question me-2"></i> Découvrir les règles du jeu</button>
          </div>
        </div>
        <div class="zombie-img-div col-xl-4 col-md-12"></div>
      </div>
      
      
      
    </div>
    
  </section>
  <section id="how-to-play-section" class="how-to-play-section">
    <h1 class="text-center mb-3 py-5">Instructions</h1>
    <div class="how-to-play-content container-fluid mt-5 py-3">
      <div class="row justify-content-around box-row">
        <div class="col-12 col-lg-3 box1 rounded shadow" data-aos="flip-right" data-aos-mirror="true">
          <div class="arrow-rules-img-div text-center h-25 mt-3">
          </div>
          <h3 class="mt-3 text-center">Déplacement</h3>
          <div class="ms-4 my-3">
            <p class="box-text">Utiliser les flèches directionnelles pour vous déplacer.<br> Le personnage s'occupera de tirer automatiquement.</p>
          </div>
        </div>
        <div class="col-12 col-lg-3 box2 rounded shadow" data-aos="flip-down" data-aos-mirror="true">
          <div class="zombie2-img-div text-center h-25 mt-3">
          </div>
          <h3 class="mt-3 text-center">Score</h3> 
          <div class="text-center mt-3">
            <p class="box-text">Tuer les zombies augmentera votre score.</p>
          </div>
        </div>
        <div class="col-12 col-lg-3 box3 rounded shadow" data-aos="flip-left" data-aos-mirror="true">
          <div class="gem-rules-img-div text-center h-25 mt-3">
          </div>
          <h3 class="mt-3 text-center">Expérience</h3> 
          <div class="ms-4 mt-3">
            <p class="box-text">Ramasser les crystaux laissés par les zombies vaincus pour améliorer votre arme une fois la barre remplie.</p>
          </div>
        </div>
      </div>   
    </div>
    <h5 class="title2" data-aos="fade-in" data-aos-offset=90 data-aos-delay=200 data-aos-duration=1500 data-aos-mirror="true">Il n'y a nulle part où se cacher. Essayez de survivre toute la nuit 
      parmi des hordes de zombies qui arrivent en continue sur vous... jusqu'à ce que la mort vous rattrape.</h5>



  </section>
  <section class="instructions-section">
    <div class="instructions-content" data-aos="fade-left" data-aos-mirror="true" data-aos-easing="ease-in-sine">
      <div class="strategy-img-div"></div>
      <h1 class="title3 rogue-title">Un jeu rogue-like</h1>
      <h6 class="rogue-description">Réfléchissez bien au moment de choisir vos améliorations! Chacune d'entre elles apporte un avantage unique, soyez stratégiques.</h6>
    </div>
    <div class="boss-container" data-aos="fade-right" data-aos-mirror="true" data-aos-easing="ease-in-sine">
      <h1 class="title3 boss-title">Des bosses très coriaces</h1>
      <h6 class="boss-description">Des boss apparaitront occasionnellement. Ils se déplacent plus rapidement et ont plus de points de vie que les zombies.</h6>
      <div class="boss-img-div"></div>   
    </div>
  </section>

  <section class="end-section d-flex">
    <div class="flex-grow-1 d-flex justify-content-around align-items-center">
      <h1 class="mb-3 end-question">Arriverez-vous à survivre à cet enfer? </h1>
      <button href="#" class=" btn btn-warning play-now-btn me-4"><i class="fa-solid fa-play me-2"></i> Jouer maintenant</button>
    </div>
  </section>
  `
  main.innerHTML = homePage;

  renderImage(zombieImage, 'zombieImage', 500, '.zombie-img-div');
  renderImage(arrowKeysImage , 'arrowKeyImage', 50, '.arrow-rules-img-div');
  renderImage(gemImage, 'gemImage', 50, '.gem-rules-img-div');
  renderImage(zombie2Image, 'zombie2Image', 60, '.zombie2-img-div');
  renderImage(zombieBossImage, 'zombieBossImage', 500, '.boss-img-div');
  renderImage(stragegyImage, 'strategyImage', 300, '.strategy-img-div');


  const playNowButtons = document.querySelectorAll('.play-now-btn');
  playNowButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('/game');
      window.scrollTo(0,0);
    })
  })

  const button = document.querySelector('#how-to-play-button');
  const howToPlaySection = document.querySelector('#how-to-play-section');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    howToPlaySection.scrollIntoView();
  });


}; 


export default HomePage;
