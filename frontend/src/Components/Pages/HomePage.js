// import anime from 'animejs/lib/anime.es';
import { clearPage, renderImage } from '../../utils/render';
import { isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';

import zombieImage from '../../img/zombie.png';
import arrowKeysImage from '../../img/arrowkeys.png'
import gemImage from '../../img/gem.png';
import zombie2Image from '../../img/zombie2.png'

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  
  const homePage = `
  <section class="intro-section"> 
    <div class="home-content" data-aos="fade-right" data-aos-mirror="true">
      <h1 class="title1 mb-3" data-aos="fade-right" data-aos-duration=1500 data-aos-mirror="true">Zombie Survivors</h1>
      <h6 class="title2 mb-5" data-aos="fade-right" data-aos-delay=200 data-aos-duration=1500 data-aos-mirror="true">Il n'y a nulle part où se cacher. Essayez de survivre toute la nuit 
      parmi des hordes des zombies qui arrivent sur vous, <br>avant que la mort ne vous rattrape.</h6>
      <div class="home-buttons d-flex" data-aos="fade-right" data-aos-delay=350 data-aos-duration=1500 data-aos-mirror="true">
        <a href="#" class="btn btn-danger play-now-btn me-3"><i class="fa-solid fa-play me-2"></i> Jouer maintenant</a>
        <a href="#" id="how-to-play-button" class="btn btn-primary how-to-play-button"><i class="fa-solid fa-question me-2"></i> Découvrir les règles du jeu</a>
      </div>
      
      
    </div>
    <div class="zombie-img-div"></div>
  </section>
  <section id="how-to-play-section" class="how-to-play-section">
    <h1 class="text-center">Règles</h1>
    <div class="how-to-play-content">
      <div class="box3 rounded shadow" data-aos="flip-right" data-aos-mirror="true">
        <div class="arrow-rules-img-div text-center mt-3">
        </div>
        <div class="text-center my-3">
          <p class="fw-bold">Utiliser les flèches directionnelles pour déplacer.<br> Le personnage s'occupera de tirer automatiquement</p>
        </div>
      </div>
      <div class="box1 rounded shadow" data-aos="flip-down" data-aos-mirror="true">
        <div class="zombie2-img-div text-center mt-3">
        </div>
        <div class="text-center mt-3">
          <p>Tuer les zombies pour augmenter votre score</p>
        </div>
      </div>
      <div class="box2 rounded shadow" data-aos="flip-left" data-aos-mirror="true">
        <div class="gem-rules-img-div text-center mt-3">
        </div>
        <div class="text-center mt-3">
          <p>Ramasser les crystaux laissés par les zombies vaincus pour améliorer votre arme une fois la barre chargée</p>
        </div>
      </div>
      
    </div>
  </section>
  <section class="instructions-section">
    <div class="instructions-content" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
      <h1 class="title3 mb-3">Test animationOnScroll</h1>
      <h6 class="title4 mb-5">Il n'y a nulle part où se cacher. Essayez de survivre toute la nuit 
      parmi des hordes des zombies qui arrivent sur vous, <br>avant que la mort ne vous rattrape.</h6>
    </div>
  </section>
  <section class="end-section">
  </section>
  `
  main.innerHTML = homePage;

  renderImage(zombieImage, 'zombieImage', 500, '.zombie-img-div');
  renderImage(arrowKeysImage , 'arrowKeyImage', 50, '.arrow-rules-img-div');
  renderImage(gemImage, 'gemImage', 50, '.gem-rules-img-div');
  renderImage(zombie2Image, 'zombie2Image', 50, '.zombie2-img-div');



  /*
  
  anime({
    targets: '.title1',
    translateX: 150,
    duration: 2200,
    
    easing: 'easeInOutExpo',
    opacity: '1'
  });

  anime({
    targets: '.title2',
    translateX: 150,
    duration: 2200,
    delay: 200,
    easing: 'easeInOutExpo',
    opacity: '1'
  });

  anime({
    targets: '.home-buttons',
    translateX: 150,
    duration: 2200,
    delay: 400,
    easing: 'easeInOutExpo',
    opacity: '1'
  });

  const animation3 = anime({
    targets: '.instructions-content > *',
    translateX: 150,
    duration: 2200,
    delay: 200,
    easing: 'easeInOutExpo',
    opacity: '1',
    autoplay: false
  });
  
  const section2 = document.querySelector('.how-to-play-section');

  window.onscroll = () => {
    const scrollPercent = window.pageYOffset - section2.offsetTop;
    // eslint-disable-next-line no-console
    console.log(scrollPercent);
    animation3.seek((scrollPercent / 100) * animation3.duration);
  };

  */

  const playNowButton = document.querySelector('.play-now-btn');
  playNowButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      Navigate('/login');
    }
  });


  const button = document.querySelector('#how-to-play-button');
  const howToPlaySection = document.querySelector('#how-to-play-section');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    howToPlaySection.scrollIntoView();
  });


}; 


export default HomePage;
