import Phaser from 'phaser';
import GameScene from '../Game/GameScene';
import UIStart from '../Game/UIStart';
import UIGameOver from '../Game/UIGameOver';
import { isAuthenticated } from '../../utils/auths';


let game;

const GamePage = () => {
  const phaserGame = `
  <div class="gameWrapper intro-section d-flex flex-column justify-content-center align-items-center">
    ${!isAuthenticated()? `<div class="login-reminder">Connectez-vous pour pouvoir enregistrer un score</div>` : ''}
    <div id="gameDiv" class="d-flex justify-content-center mb-5">
    </div>
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [UIStart, GameScene, UIGameOver],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: 'gameDiv',
    dom: {
        createContainer: true
    },
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
};

export default GamePage;
