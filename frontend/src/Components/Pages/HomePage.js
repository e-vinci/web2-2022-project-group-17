import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import zombieImage from '../../img/zombie.png';
import { isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';


const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  
  const homePage = `
  <section class="intro-section"> 
    <div class="home-content">
      <h1 class="title1 mb-3">Zombie Survivors</h1>
      <h6 class="title2 mb-5">Il n'y a nulle part où se cacher. Essayez de survivre toute la nuit 
      parmi des hordes des zombies qui arrivent sur vous, <br>avant que la mort ne vous rattrape.</h6>
      <a href="#" class="btn btn-danger play-now-btn"><i class="fa-solid fa-play me-2"></i> Jouer maintenant</a>
    </div>
    <div class="image"></div>
  </section>
  <section class="how-to-play-section">
    <div class="how-to-play-content">
      <div class="box1 rounded shadow">
        <div>
          <p>*pas encore d'image*</p>
        </div>
        <div>
          <p>Tuer les zombies pour augmenter votre score</p>
        </div>
      </div>
      <div class="box2 rounded">
        <div>
          <p>*pas encore d'image*</p>
        </div>
        <div>
          <p>Ramassez les crystaux laissés par les zombies vaincus pour améliorer votre arme une fois la barre chargée</p>
        </div>
      </div>
      <div class="box3 rounded">
        <div>
          <p>*pas encore d'image*</p>
        </div>
        <div>
          <p>Utilisez les flèches directionnelles pour déplacer. Le personnage quant à lui tire automatiquement</p>
        </div>
      </div>
    </div>
  </section>
  <section class="instructions-section">
    <div class="instructions-content">
      <h1 class="title3 mb-3">Test animationOnScroll</h1>
      <h6 class="title4 mb-5">Il n'y a nulle part où se cacher. Essayez de survivre toute la nuit 
      parmi des hordes des zombies qui arrivent sur vous, <br>avant que la mort ne vous rattrape.</h6>
    </div>
  </section>
  <section class="end-section">
  </section>
  `
  main.innerHTML = homePage;

  renderImage(zombieImage);

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
    targets: '.play-now-btn',
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



  const playNowButton = document.querySelector('.play-now-btn');
  playNowButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      Navigate('/login');
    }
  });

}; 


function renderImage(url) {
  const image = document.createElement('img');
  image.className = "zombieImage";
  image.src = url;
  image.height = 500;
  const imageWrapper = document.querySelector('.image');
  imageWrapper.append(image);
}



export default HomePage;
