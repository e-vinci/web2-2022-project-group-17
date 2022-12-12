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
    const XPcontainer = this.add.sprite(400, 20, "XPcontainer");
    this.XPbar = this.add.sprite(XPcontainer.x, XPcontainer.y, "XPbar");
    this.XPMask = this.add.sprite(this.XPbar.x, this.XPbar.y, "XPbar");
    this.XPMask.visible = false;
    this.XPbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.XPMask);
    this.XPbar.x -= 250;

    // Displays current XP level
    const styleLevelDisplay = { fontSize: '13px', fontStyle: 'bold', fontFamily: 'Arial', fill: '#FFFFFF' };
    this.levelDisplay = this.add.text(375, 14, "LEVEL 0", styleLevelDisplay);

    // Displays player's name
    // this.nickname = getAuthenticatedUser().username;
    const stylePlayerName = { fontSize: '32px', fontFamily: 'Arial', fill: '#000' }
    this.nameDisplay = this.add.text(575, 14, `Player : ${this.nickname}`, stylePlayerName);


    const zombieSpawnEvent = new Phaser.Time.TimerEvent({ delay: 5000, loop: true, callback: this.spawnZombies, callbackScope: this });
    const fireBulletEvent = new Phaser.Time.TimerEvent({ delay: 4000, loop: true, callback: this.fireBullet, callbackScope: this });
    const bonusSpawnEvent = new Phaser.Time.TimerEvent({ delay: 10000, loop: true, callback: this.spawnBonus, callbackScope: this });
    const whipEvent = new Phaser.Time.TimerEvent({delay : 3000, loop: true});
    this.time.addEvent(zombieSpawnEvent);
    this.time.addEvent(fireBulletEvent);
    this.time.addEvent(bonusSpawnEvent);
    this.time.addEvent(whipEvent);


    this.health = 100;
    this.level = 0;
    this.xp = 0;
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
    
    // eslint-disable-next-line no-console
    // console.log(`LEFT: ${  this.cursors.left.isDown}`, `RIGHT: ${  this.cursors.right.isDown}`,`UP: ${  this.cursors.up.isDown}`,`DOWN: ${  this.cursors.down.isDown}`);

    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    let animation = 'turn';

    if (this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.player.setVelocityX(-150);
      animation = 'left';
    }
    if (this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.setVelocityX(150);
      animation = 'right';
    }
    if (this.cursors.down.isDown && !this.cursors.up.isDown) {
      this.player.setVelocityY(150);
    }
    if (this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.player.setVelocityY(-150);
    }

    if(animation === 'turn'){
      this.player.anims.play('turn');
    }
    else if (animation === 'left'){
      this.player.anims.play('left', true);
    }
    else{
      this.player.anims.play('right', true);
    }
    
    Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
      this.physics.moveToObject(zombie, this.player, 30),
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
    if (this.health < 66 && this.health > 33) {
      barColor = 0xffaa00;
    }
    else if (this.health <= 33) {
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
    this.health = this.health + 20 > 100 ? 100 : this.health + 20;
  }

  collectGem(player, gem) {
    gem.destroy();
    this.scoreLabel.add(50);
    this.gainXP();
  }

  gainXP() {
    this.XPbar.x += 10;
    this.xp += 10;
    if (this.xp % 240 === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    this.XPbar.x -= 240;
    this.level += 1;
    this.levelDisplay.setText(`LEVEL ${this.level}`);
    this.physics.pause();
    
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
