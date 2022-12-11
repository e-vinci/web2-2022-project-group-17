import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import ZombieSpawner from './ZombieSpawner';
import BulletSpawner from './BulletSpawner';
import BonusSpawner from './BonusSpawner';
import GemSpawner from './GemSpawner';
import bonusAsset from '../../assets/bonus.png';
import backgroundAsset from '../../assets/background.png';
import zombieAsset from '../../assets/zombie.png';
import bulletAsset from '../../assets/bullet.png';
import dudeAsset from '../../assets/dude.png';
import gemAsset from '../../assets/gem.png';
import XPbarAsset from '../../assets/XPbar.png';
import XPcontainerAsset from '../../assets/XPcontainer.png';
import damageSoundAsset from '../../assets/sounds/damage.mp3';


const DUDE_KEY = 'dude';
const ZOMBIE_KEY = 'zombie';
const BULLET_KEY = 'bullet';
const BONUS_KEY = 'bonus';
const GEM_KEY = 'gem';
const DAMAGE_SOUND_KEY = 'damagesound';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.zombieSpawner = undefined;
    this.bulletSpawner = undefined;
    this.bonusSpawner = undefined;
    this.gemSpawner = undefined;
    this.healthBar = undefined;
    // this.gameOver = false;
    this.frame = undefined;
    this.health = undefined;
    this.gems = undefined;
    this.XPbar = undefined;
    this.damageSound = undefined;
  }


  preload() {
    this.load.image('background', backgroundAsset);
    this.load.image(ZOMBIE_KEY, zombieAsset);
    this.load.image(BULLET_KEY, bulletAsset);
    this.load.image(BONUS_KEY, bonusAsset);
    this.load.image(GEM_KEY, gemAsset);
    this.load.image('XPcontainer', XPcontainerAsset);
    this.load.image('XPbar', XPbarAsset);
    this.load.audio(DAMAGE_SOUND_KEY, damageSoundAsset);
    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }


  create() {
    this.add.image(400, 300, 'background');
    this.player = this.createPlayer();
    this.scoreLabel = this.createScoreLabel(40, 20, 0);
    this.zombieSpawner = new ZombieSpawner(this, ZOMBIE_KEY);
    const zombiesGroup = this.zombieSpawner.group;
    this.bulletSpawner = new BulletSpawner(this, BULLET_KEY);
    const bulletsGroup = this.bulletSpawner.group;
    this.bonusSpawner = new BonusSpawner(this, BONUS_KEY);
    const bonusGroup = this.bonusSpawner.group;
    this.gemSpawner = new GemSpawner(this, GEM_KEY);
    const gemsGroup = this.gemSpawner.group;
    this.healthBar = this.add.graphics();

    // XP bar
    const XPcontainer = this.add.sprite(400,40, "XPcontainer");
    this.XPbar = this.add.sprite(XPcontainer.x + 0, XPcontainer.y, "XPbar");
    this.XPMask = this.add.sprite(this.XPbar.x, this.XPbar.y, "XPbar");
    this.XPMask.visible = false;
    this.XPbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.XPMask);
    this.XPbar.x -= 250;
    

    this.health = 100;
    this.frame = 0;
    this.gems = 0;


    this.physics.add.collider(this.player, zombiesGroup, this.receiveDamage, null, this);
    this.physics.add.overlap(zombiesGroup, bulletsGroup, this.bulletHitZombie, null, this);
    this.physics.add.overlap(this.player, bonusGroup, this.collectBonus, null, this);
    this.physics.add.overlap(this.player, gemsGroup, this.collectGem, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.damageSound = this.sound.add(DAMAGE_SOUND_KEY,
      {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
    );

  }



  update() {
    /*
    if (this.gameOver) {
      return;
    }
    */
    this.frame += 1;
    this.updateHealthBar();

    // Spawn objects and enemies
    if (this.frame % 100 === 0) {
      for (let i = 0; i < this.frame / 1000; i += 1) {
        this.zombieSpawner.spawn();
      }
    }
    if (this.frame % 1000 === 0) {
      this.bonusSpawner.spawn();
    }
    if (this.frame % 250 === 0) {
      this.fireBullet();
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    }
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('turn');
    }

    Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
      this.physics.moveToObject(zombie, this.player, 30),
    );

  }


  updateHealthBar(){
    let barColor = 0x00ff00;
    if(this.health < 66 && this.health > 33){
      barColor = 0xffaa00;
    }
    else if(this.health <= 33){
      barColor = 0xff0d00;
    }
    const barLength = 40 * this.health / 100;
    this.healthBar.clear();
    this.healthBar.lineStyle(1, 0x000000, 1);
    this.healthBar.strokeRoundedRect(this.player.x - 20, this.player.y + 30, 40, 11, 3);
    this.healthBar.fillStyle(barColor, 1);
    this.healthBar.fillRect(this.player.x - 19, this.player.y + 31, barLength - 1, 9);
  }

  createPlayer() {
    const player = this.physics.add.sprite(400, 400, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
    The 'repeat -1' value tells the animation to loop.
    */
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  fireBullet() {
    this.bulletSpawner.spawn(this.player.x, this.player.y);
  }


  collectBonus(player, bonus) {
    bonus.destroy();
    this.health += 20;
  }

  collectGem(player, gem) {
    gem.destroy();
    this.scoreLabel.add(50);
    this.XPbar.x += 10;
  }

  bulletHitZombie(zombie, bullet) {
    zombie.destroy();
    bullet.destroy();
    this.gemSpawner.spawn(zombie.x, zombie.y);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fontFamily: 'Arial', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);

    return label;
  }


  receiveDamage() {
    this.damageSound.play();
    // player.setTint(0xff0000); comment setTint pour seulement quelques frames?
    this.health -= 1;

    if (this.health <= 0) {
      this.gameOver();
    }
  }

  gameOver(){
    this.registerScore("testPlayer");

      this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
      // this.physics.pause();
    
      // this.gameOver = true;
      
      this.scene.start('game-over');
  }

  async registerScore(nickname) {
    const { score } = this.scoreLabel;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        score
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch('/api/scores/', options);
    if (!response.ok) {
      throw new Error(`fetch error:: : ${response.status} : ${response.statusText}`);
    }

  }

  // TODO : display leaderboard directly in game at the end
  displayLeaderboard() {
    const text = this.add.text(350, 250, '', { font: '32px Courier', fill: '#000000' });
    text.setText([
      'Name: ',
      'Score: '
    ]);
  }

}

export default GameScene;
