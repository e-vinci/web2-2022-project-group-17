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
import option1Asset from '../../assets/option1.png';
import option2Asset from '../../assets/option2.png';
import option3Asset from '../../assets/option3.png';
// import { getAuthenticatedUser } from '../../utils/auths';


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
    this.load.image('option1', option1Asset);
    this.load.image('option2', option2Asset);
    this.load.image('option3', option3Asset);
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


    // Display XP bar
    const XPcontainer = this.add.sprite(400, 20, "XPcontainer");
    this.XPbar = this.add.sprite(XPcontainer.x, XPcontainer.y, "XPbar");
    this.XPMask = this.add.sprite(this.XPbar.x, this.XPbar.y, "XPbar");
    this.XPMask.visible = false;
    this.XPbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.XPMask);
    this.XPbar.x -= 250;

    // Display current XP level
    const styleLevelDisplay = { fontSize: '13px', fontStyle: 'bold', fontFamily: 'Arial', fill: '#FFFFFF' };
    this.levelDisplay = this.add.text(375, 14, "LEVEL 0", styleLevelDisplay);

    // Display player's name
    // this.nickname = getAuthenticatedUser().username;
    const stylePlayerName = { fontSize: '32px', fontFamily: 'Arial', fill: '#000' }
    this.nameDisplay = this.add.text(575, 14, `Player : ${this.nickname}`, stylePlayerName);


    const healthRegenEvent = new Phaser.Time.TimerEvent({ delay: 3000, loop: true, callback: this.regenHealth, callbackScope: this });
    const zombieSpawnEvent = new Phaser.Time.TimerEvent({ delay: 7500, loop: true, callback: this.spawnZombies, callbackScope: this });
    const fireBulletEvent = new Phaser.Time.TimerEvent({ delay: 3500, loop: true, callback: this.fireBullet, callbackScope: this });
    const bonusSpawnEvent = new Phaser.Time.TimerEvent({ delay: 15000, loop: true, callback: this.spawnBonus, callbackScope: this });
    // const flameEvent = new Phaser.Time.TimerEvent({delay : 3000, loop: true, callback: this.flameAttack, callbackScope: this});
    this.time.addEvent(healthRegenEvent);
    this.time.addEvent(zombieSpawnEvent);
    this.time.addEvent(fireBulletEvent);
    this.time.addEvent(bonusSpawnEvent);
    // this.time.addEvent(flameEvent);


    // Level up text
    const centerX = this.scale.width * 0.5;
    const centerY = this.scale.height * 0.5;
    this.levelUpText = this.add.text(centerX, centerY - 100, 'LEVEL UP !',
      {
        fontSize: '52px',
        color: '#ffffff',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    this.levelUpText.setVisible(false);

    // Level up options
    this.option1Image = this.add.image(200, 300, 'option1');
    this.option1Image.setVisible(false);
    this.option2Image = this.add.image(350, 300, 'option2');
    this.option2Image.setVisible(false);
    this.option3Image = this.add.image(500, 300, 'option3');
    this.option3Image.setVisible(false);



    this.playerStats = {health: 100, level : 0, xp : 0, numberOfBullets : 0, pointsOfRegeneration : 0, speed : 100};
    this.zombiesInLastWave = 0;
    

    this.physics.add.collider(this.player, zombiesGroup, this.receiveDamage, null, this);
    this.physics.add.overlap(zombiesGroup, bulletsGroup, this.bulletHitZombie, null, this);
    this.physics.add.overlap(this.player, bonusGroup, this.collectBonus, null, this);
    this.physics.add.overlap(this.player, gemsGroup, this.collectGem, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();


    this.damageSound = this.sound.add(DAMAGE_SOUND_KEY);
  }


  update() {
    this.updateHealthBar();

    this.player.setVelocity(0);

    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.player.setVelocityX(-this.playerStats.speed);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.setVelocityX(this.playerStats.speed);
      this.player.anims.play('right', true);
    }
    else {
      this.player.anims.play('turn');
    }
    if (this.cursors.down.isDown && !this.cursors.up.isDown) {
      this.player.setVelocityY(this.playerStats.speed);
    }
    else if (this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.player.setVelocityY(-this.playerStats.speed);
    }

    if (this.cursors.space.isDown) {
      this.levelUp();
    }

    Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
      this.physics.moveToObject(zombie, this.player, 25),
    );

  }

  spawnZombies() {
    this.zombiesInLastWave += 1;
    for (let i = 0; i < this.zombiesInLastWave; i += 1) {
      this.zombieSpawner.spawn();
    }
  }

  spawnBonus() {
    this.bonusSpawner.spawn();
  }


  updateHealthBar() {
    let barColor = 0x00ff00;
    if (this.playerStats.health < 66 && this.playerStats.health > 33) {
      barColor = 0xffaa00;
    }
    else if (this.playerStats.health <= 33) {
      barColor = 0xff0d00;
    }
    const barLength = 40 * this.playerStats.health / 100;
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
    this.bulletSpawner.spawn(this.player.x, this.player.y, this.playerStats.numberOfBullets);
  }


  collectBonus(player, bonus) {
    bonus.destroy();
    this.playerStats.health = this.playerStats.health + 20 > 100 ? 100 : this.playerStats.health + 20;
  }

  collectGem(player, gem) {
    gem.destroy();
    this.scoreLabel.add(50);
    this.gainXP();
  }

  gainXP() {
    this.XPbar.x += 10;
    this.playerStats.xp += 10;
    if (this.playerStats.xp % 240 === 0) {
      this.levelUp();
    }
  }

  regenHealth() {
    this.playerStats.health += this.playerStats.pointsOfRegeneration;
  }

  levelUp() {
    this.XPbar.x -= 240;
    this.playerStats.level += 1;
    this.levelDisplay.setText(`LEVEL ${this.playerStats.level}`);
    this.physics.pause();
    this.time.paused = true;

    // Display level up options
    this.levelUpText.setVisible(true);
    // First option : gain 1 fireball
    this.option1Image.setVisible(true);
    this.option1Image.setInteractive();
    this.option1Image.on('pointerdown', () => {
      this.playerStats.numberOfBullets += 1;
      this.resumeGame();
    });
    // Second option : gain health regeneration
    this.option2Image.setVisible(true);
    this.option2Image.setInteractive();
    this.option2Image.on('pointerdown', () => {
      this.playerStats.pointsOfRegeneration += 1;
      this.resumeGame();
    });
    // Third option : increase speed by 5%
    this.option3Image.setVisible(true);
    this.option3Image.setInteractive();
    this.option3Image.on('pointerdown', () => {
      this.playerStats.speed *= 1.05;
      this.resumeGame();
    });
  }

  resumeGame() {
    this.option1Image.setVisible(false);
    this.option2Image.setVisible(false);
    this.option3Image.setVisible(false);
    this.levelUpText.setVisible(false);
    this.physics.resume();
    this.time.paused = false;
  }

  bulletHitZombie(zombie, bullet) {
    zombie.destroy();
    bullet.destroy();
    this.gemSpawner.spawn(zombie.x, zombie.y);
  }

  /*
  flameAttack(){
    Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
      Math.abs(zombie.x - this.player.x) < 100 && Math.abs(zombie.y - this.player.y ) < 30 ? zombie.destroy() : null
    );
    this.player.anims.play('flameRight');
  }
  */


  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fontFamily: 'Arial', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);
    return label;
  }


  receiveDamage() {
    this.damageSound.play();
    this.playerStats.health -= 1;

    if (this.playerStats.health <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.registerScore();

    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.physics.pause();

    // this.gameOver = true;

    this.scene.start('game-over');
  }

  async registerScore() {
    const { score } = this.scoreLabel;
    const { nickname } = this.nickname;
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

}

export default GameScene;
