import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import ZombieSpawner from './ZombieSpawner';
import BonusSpawner from './BonusSpawner';
import BulletSpawner from './BulletSpawner';
import BossSpawner from './BossSpawner';
import GemSpawner from './GemSpawner';
import bonusAsset from '../../assets/bonus.png';
import bossAsset from '../../assets/boss.png';
import bulletAsset from '../../assets/bullet.png';
import maincharacterAsset from '../../assets/maincharacter.png';
import maincharactersprites from '../../assets/maincharactersprites.json';
import gemAsset from '../../assets/gem.png';
import XPbarAsset from '../../assets/XPbar.png';
import XPcontainerAsset from '../../assets/XPcontainer.png';
import damageSoundAsset from '../../assets/sounds/damage.mp3';
import themeMusicAsset from '../../assets/sounds/theme.mp3';
import fireballSoundAsset from '../../assets/sounds/fireballsound.mp3';
import scoreBackgroundAsset from '../../assets/scoreBackground.png';
import option1Asset from '../../assets/option1.png';
import option2Asset from '../../assets/option2.png';
import option3Asset from '../../assets/option3.png';
import tilesAssets from '../../assets/tileset.png';
import flameAsset from '../../assets/flame.png';
import mapJSON from '../../assets/map.json';
import zombiesprites from '../../assets/zombiesprites2.png';
import zombieJSON from '../../assets/zombieJSON.json';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';

const ZOMBIE_KEY = 'zombie';
const BOSS_KEY = 'boss';
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
    this.bossSpawner = undefined;
    this.bulletSpawner = undefined;
    this.bonusSpawner = undefined;
    this.gemSpawner = undefined;
    this.healthBar = undefined;
    this.health = undefined;
    this.gems = undefined;
    this.XPbar = undefined;
    this.damageSound = undefined;
    this.playerStats = undefined;
    this.zombiesInLastWave = undefined;
    this.directionLastFlameAttack = undefined;
  }

  preload() {
    this.load.image('background', tilesAssets);
    this.load.tilemapTiledJSON('map', mapJSON);
    this.load.image(BOSS_KEY, bossAsset);
    this.load.image(BULLET_KEY, bulletAsset);
    this.load.image(BONUS_KEY, bonusAsset);
    this.load.image(GEM_KEY, gemAsset);
    this.load.image('XPcontainer', XPcontainerAsset);
    this.load.image('XPbar', XPbarAsset);
    this.load.image('scoreBackground', scoreBackgroundAsset);
    this.load.image('option1', option1Asset);
    this.load.image('option2', option2Asset);
    this.load.image('option3', option3Asset);
    this.load.audio(DAMAGE_SOUND_KEY, damageSoundAsset);
    this.load.audio('themeMusic', themeMusicAsset);
    this.load.audio('fireballSound', fireballSoundAsset);
    this.load.spritesheet('flame', flameAsset, {
      frameWidth: 291,
      frameHeight: 111,
    });
    this.load.atlas('maincharacter', maincharacterAsset, maincharactersprites);
    this.load.atlas(ZOMBIE_KEY, zombiesprites, zombieJSON);
  }


  create() {

    this.createWorld();
    this.createUI();
    this.createEvents();

    this.playerStats = {
      health: 100,
      level: 0,
      xp: 0,
      numberOfBullets: 0,
      speed: 100,
      armor: 0
    };
    this.zombiesInLastWave = 0;


    this.cursors = this.input.keyboard.createCursorKeys();

    this.damageSound = this.sound.add(DAMAGE_SOUND_KEY);
    this.fireballSound = this.sound.add('fireballSound');
    this.themeMusic = this.sound.add('themeMusic');
    this.themeMusic.play({ loop: true });

    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(1);

    this.createAnimsZombie();
  }

  // Main game loop : executed between every frame
  update() {
    this.updateHealthBar();
    this.updateZombieAnims();
    this.updatePlayerAnims();

    // Move enemies towards player
    Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
      this.physics.moveToObject(zombie, this.player, 25),
    );
    Phaser.Actions.Call(this.bossSpawner.group.getChildren(), (boss) =>
      this.physics.moveToObject(boss, this.player, 80),
    );
  }


  createWorld() {
    const mapLevel = this.add.tilemap('map');
    const tileset = mapLevel.addTilesetImage('tileset', 'background');
    const backgroundLayer = mapLevel.createLayer('Tile Layer 1', tileset);
    backgroundLayer.setCollisionByProperty({ collides: true });
    const backgroundLayer2 = mapLevel.createLayer('Tile Layer 2', tileset);

    backgroundLayer2.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(0, 0, 2302, 2302);
    this.player = this.createPlayer();
    this.physics.add.collider(this.player, backgroundLayer2);
    this.zombieSpawner = new ZombieSpawner(this, ZOMBIE_KEY);
    const zombiesGroup = this.zombieSpawner.group;
    this.bossSpawner = new BossSpawner(this, BOSS_KEY);
    const bossGroup = this.bossSpawner.group;
    this.bulletSpawner = new BulletSpawner(this, BULLET_KEY);
    const bulletsGroup = this.bulletSpawner.group;
    this.bonusSpawner = new BonusSpawner(this, BONUS_KEY);
    const bonusGroup = this.bonusSpawner.group;
    this.gemSpawner = new GemSpawner(this, GEM_KEY);
    const gemsGroup = this.gemSpawner.group;
    this.healthBar = this.add.graphics();
    this.physics.add.collider(this.zombieSpawner.group, backgroundLayer2);
    this.physics.add.collider(this.bossSpawner.group, backgroundLayer2);
    this.physics.add.collider(this.player, zombiesGroup, this.receiveDamage, null, this);
    this.physics.add.collider(this.player, bossGroup, this.receiveDamage, null, this);
    this.physics.add.overlap(zombiesGroup, bulletsGroup, this.bulletHitZombie, null, this);
    this.physics.add.overlap(bossGroup, bulletsGroup, this.bulletHitBoss, null, this);
    this.physics.add.overlap(this.player, bonusGroup, this.collectBonus, null, this);
    this.physics.add.overlap(this.player, gemsGroup, this.collectGem, null, this);
  }

  createUI() {
    this.scoreLabel = this.createScoreLabel(35, 20, 0).setScrollFactor(0);
    this.scoreLabel.setDepth(2);
    // Display XP bar
    const XPcontainer = this.add.sprite(400, 20, 'XPcontainer').setScrollFactor(0);
    XPcontainer.setDepth(2);
    this.XPbar = this.add.sprite(XPcontainer.x, XPcontainer.y, 'XPbar').setScrollFactor(0);
    this.XPMask = this.add.sprite(this.XPbar.x, this.XPbar.y, 'XPbar').setScrollFactor(0);
    this.XPMask.visible = false;
    this.XPbar.mask = new Phaser.Display.Masks.BitmapMask(this, this.XPMask);
    this.XPbar.x -= 240;
    this.XPbar.setDepth(3);
    this.XPMask.setDepth(3);

    // Display score background
    this.add
      .sprite(110, 36, 'scoreBackground')
      .setScrollFactor(0)
      .setDepth(1);
    this.add
      .sprite(700, 36, 'scoreBackground')
      .setScrollFactor(0)
      .setDepth(1);

    // Display current XP level
    const styleLevelDisplay = {
      fontSize: '19px',
      fontStyle: 'bold',
      fontFamily: 'Candara, Arial',
      fill: '#FFFFFF',
    };
    this.levelDisplay = this.add.text(375, 11, 'LEVEL 0', styleLevelDisplay).setScrollFactor(0);
    this.levelDisplay.setDepth(4);

    // Display player's name if connected
    const text = isAuthenticated() ? `Joueur : ${getAuthenticatedUser().username}` : "Non connecté";
    this.nameDisplay = this.add
      .text(635, 25, text, { fontSize: '14px', fontFamily: 'Candara, Arial', fill: '#fff' })
      .setScrollFactor(0);
    this.nameDisplay.setDepth(2);

    // Level up text
    const centerX = this.scale.width * 0.5;
    const centerY = this.scale.height * 0.5;
    this.levelUpText = this.add
      .text(centerX, centerY - 100, 'LEVEL UP !', {
        fontSize: '52px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.levelUpText.setVisible(false).setDepth(1);

    // Level up options
    this.option1Image = this.add.image(250, 300, 'option1').setScrollFactor(0);
    this.option1Image.setVisible(false).setDepth(1);
    this.option1Image.setInteractive();
    this.option1Image.on('pointerdown', () => {
      this.playerStats.numberOfBullets += 1;
      this.resumeGame();
    });
    this.option2Image = this.add.image(400, 300, 'option2').setScrollFactor(0);
    this.option2Image.setVisible(false).setDepth(1);
    this.option2Image.setInteractive();
    this.option2Image.on('pointerdown', () => {
      this.playerStats.armor += 1;
      this.resumeGame();
    });
    this.option3Image = this.add.image(550, 300, 'option3').setScrollFactor(0);
    this.option3Image.setVisible(false).setDepth(1);
    this.option3Image.setInteractive();
    this.option3Image.on('pointerdown', () => {
      this.playerStats.speed += 5;
      this.resumeGame();
    });
  }

  createEvents() {
    this.zombieSpawnEvent = new Phaser.Time.TimerEvent({
      delay: 10000,
      loop: true,
      callback: this.spawnZombies,
      callbackScope: this,
    });
    const bossSpawnEvent = new Phaser.Time.TimerEvent({
      delay: 30000,
      loop: true,
      callback: this.spawnBoss,
      callbackScope: this,
    });
    const fireBulletEvent = new Phaser.Time.TimerEvent({
      delay: 5000,
      loop: true,
      callback: this.fireBullet,
      callbackScope: this,
    });
    const bonusSpawnEvent = new Phaser.Time.TimerEvent({
      delay: 15000,
      loop: true,
      callback: this.spawnBonus,
      callbackScope: this,
    });
    const flameEvent = new Phaser.Time.TimerEvent({
      delay: 2000,
      loop: true,
      callback: this.flameAttack,
      callbackScope: this,
    });

    this.time.addEvent(this.zombieSpawnEvent);
    this.time.addEvent(bossSpawnEvent);
    this.time.addEvent(fireBulletEvent);
    this.time.addEvent(bonusSpawnEvent);
    this.time.addEvent(flameEvent);
  }

  spawnZombies() {
    this.zombiesInLastWave += 3;
    this.zombieSpawnEvent.delay += 2000;
    for (let i = 0; i < this.zombiesInLastWave; i += 1) {
      this.zombieSpawner.spawn(this.player.x, this.player.y);
    }
  }

  spawnBoss() {
    for (let i = 0; i < Math.floor(this.playerStats.level / 3); i += 1) {
      const boss = this.bossSpawner.spawn(this.player.x, this.player.y);
      boss.HP = 5;
    }

  }

  spawnBonus() {
    this.bonusSpawner.spawn(this.player.x, this.player.y);
  }

  updateHealthBar() {
    let barColor = 0x00ff00;
    if (this.playerStats.health < 66 && this.playerStats.health > 33) {
      barColor = 0xffaa00;
    } else if (this.playerStats.health <= 33) {
      barColor = 0xff0d00;
    }
    const barLength = (40 * this.playerStats.health) / 100;
    this.healthBar.clear();
    this.healthBar.lineStyle(1, 0x000000, 1);
    this.healthBar.strokeRoundedRect(this.player.x - 20, this.player.y + 30, 40, 11, 3);
    this.healthBar.fillStyle(barColor, 1);
    this.healthBar.fillRect(this.player.x - 19, this.player.y + 31, barLength - 2, 9);
  }



  updateZombieAnims() {
    const zombieArray = this.zombieSpawner.group.getChildren();
    for (let i = 0; i < zombieArray.length; i += 1) {
      if (zombieArray[i].body.velocity.x < 0) {
        zombieArray[i].anims.play('zombie-walk-left', true);
      } else if (zombieArray[i].body.velocity.x > 0) {
        zombieArray[i].anims.play('zombie-walk-right', true);
      } else if (zombieArray[i].body.velocity.y > 0) {
        zombieArray[i].anims.play('zombie-walk-down', true);
      } else if (zombieArray[i].body.velocity.y < 0) {
        zombieArray[i].anims.play('zombie-walk-up', true);
      } else if (zombieArray[i].body.velocity.x === 0 && zombieArray[i].body.velocity.y === 0) {
        zombieArray[i].anims.play('zombie-standing');
      }

    }
  }



  updatePlayerAnims() {
    this.player.setVelocity(0);
    let moving = false;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerStats.speed);
      this.player.anims.play('walk-left', true);
      moving = true;
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-this.playerStats.speed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.playerStats.speed);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerStats.speed);
      this.player.anims.play('walk-right', true);
      moving = true;
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-this.playerStats.speed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.playerStats.speed);
      }
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerStats.speed);
      this.player.anims.play('walk-down', true);
      moving = true;
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-this.playerStats.speed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.playerStats.speed);
      }
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerStats.speed);
      this.player.anims.play('walk-up', true);
      moving = true;
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-this.playerStats.speed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.playerStats.speed);
      }
    }

    if (!moving) {
      this.player.anims.stop();
    }
  }



  createAnimsZombie() {
    this.anims.create({
      key: 'zombie-walk-up',
      frames: this.anims.generateFrameNames(ZOMBIE_KEY, {
        prefix: 'walkup',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'zombie-walk-left',
      frames: this.anims.generateFrameNames(ZOMBIE_KEY, {
        prefix: 'walkleft',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'zombie-walk-down',
      frames: this.anims.generateFrameNames(ZOMBIE_KEY, {
        prefix: 'walkdown',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'zombie-walk-right',
      frames: this.anims.generateFrameNames(ZOMBIE_KEY, {
        prefix: 'walkright',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
  }

  createPlayer() {
    const maincharacter = this.physics.add.sprite(700, 600, 'maincharacter');
    maincharacter.setBounce(0.2);
    maincharacter.setCollideWorldBounds(true);
    maincharacter.direction = 'down';
    maincharacter.swinging = false;

    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNames('maincharacter', {
        prefix: 'walkdown',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNames('maincharacter', {
        prefix: 'walkup',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNames('maincharacter', {
        prefix: 'walkleft',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNames('maincharacter', {
        prefix: 'walkright',
        end: 8,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });

    return maincharacter;
  }
  /*
  createPlayer() {
    const player = this.physics.add.sprite(400, 400, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
    The 'repeat -1' value tells the animation to loop.
    */
  /*  
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

  */

  createFlame() {
    const flame = this.add.sprite(this.player.x, this.player.y, 'flame');

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('flame', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('flame', { start: 6, end: 11 }),
      frameRate: 20,
      repeat: -1,
    });

    return flame;
  }


  // Fire bullets on enemies closest to the player
  fireBullet() {
    let possibleTargets = this.zombieSpawner.group.getChildren();
    possibleTargets = possibleTargets.concat(this.bossSpawner.group.getChildren());
    possibleTargets.sort((target1, target2) => 
                    (Phaser.Math.Distance.Between(target1.x, target1.y, this.player.x, this.player.y) >
                    Phaser.Math.Distance.Between(target2.x, target2.y, this.player.x, this.player.y)));
    if (
       possibleTargets.length !== 0
    ) {
      const bullets = this.bulletSpawner.spawn(
        this.player.x,
        this.player.y,
        this.playerStats.numberOfBullets,
      );
      for(let i = 0; i < bullets.length; i+=1){
        this.physics.moveToObject(
          bullets[i],
          possibleTargets[i],
          300,
        );
        this.fireballSound.play();
      }
    }
  }

  collectBonus(player, bonus) {
    bonus.destroy();
    this.playerStats.health =
      this.playerStats.health + 20 > 100 ? 100 : this.playerStats.health + 20;
  }

  collectGem(player, gem) {
    gem.destroy();
    this.gainXP();
  }

  gainXP() {
    this.XPbar.x += 60 / (1.5 ** this.playerStats.level);
    this.playerStats.xp += 60 / (1.5 ** this.playerStats.level);
    if (this.playerStats.xp >= 240) {
      this.playerStats.xp -= 240;
      this.levelUp();
    }
  }

  levelUp() {
    this.XPbar.x -= 240;
    this.playerStats.level += 1;
    this.levelDisplay.setText(`LEVEL ${this.playerStats.level}`);
    this.physics.pause();
    this.time.paused = true;
    this.anims.pauseAll();

    // Display level up options
    this.levelUpText.setVisible(true);
    // First option : gain 1 fireball
    if (this.playerStats.numberOfBullets < 10) {
      this.option1Image.setVisible(true);
    }

    // Second option : increase armor protection
    if (this.playerStats.armor < 10) {
      this.option2Image.setVisible(true);
    }

    // Third option : increase speed by 5
    this.option3Image.setVisible(true);

  }

  resumeGame() {
    this.option1Image.setVisible(false);
    this.option2Image.setVisible(false);
    this.option3Image.setVisible(false);
    this.levelUpText.setVisible(false);
    this.physics.resume();
    this.time.paused = false;
    this.anims.resumeAll();
  }

  bulletHitZombie(zombie, bullet) {
    this.scoreLabel.add(50);
    bullet.destroy();
    this.killZombie(zombie);
  }

  bulletHitBoss(boss, bullet) {
    // eslint-disable-next-line no-param-reassign
    boss.HP -= 1;
    if (boss.HP === 0) {
      boss.destroy();
      for (let i = 0; i < 4; i += 1) {
        this.gemSpawner.spawn(boss.x + Phaser.Math.Between(-15, 15), boss.y + Phaser.Math.Between(-15, 15));
      }
      this.scoreLabel.add(200);
    }
    bullet.destroy();
  }


  killZombie(zombie) {
    zombie.destroy();
    this.gemSpawner.spawn(zombie.x, zombie.y);
    this.scoreLabel.add(50);
  }

  // Flame attack, alternating sides
  flameAttack() {
    const flame = this.createFlame();
    flame.setOrigin(0, 0.5);
    flame.setY(flame.y - 20);
    if (this.directionLastFlameAttack === 'left') {
      Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
        this.player.x - zombie.x > -200 && this.player.x - zombie.x < 0 && Math.abs(zombie.y - this.player.y) < 50
          ? this.killZombie(zombie) : null
      );
      flame.setX(flame.x + 20);
      flame.anims.play({ key: 'right', repeat: false, hideOnComplete: true });
      this.directionLastFlameAttack = 'right';
    }
    else {
      Phaser.Actions.Call(this.zombieSpawner.group.getChildren(), (zombie) =>
        this.player.x - zombie.x < 200 && this.player.x - zombie.x > 0 && Math.abs(zombie.y - this.player.y) < 50
          ? this.killZombie(zombie) : null
      );
      flame.setX(flame.x - 310);
      flame.anims.play({ key: 'left', repeat: false, hideOnComplete: true });
      this.directionLastFlameAttack = 'left';
    }
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '28px', fontFamily: 'Candara, Arial', fill: '#fff' };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);
    return label;
  }

  receiveDamage() {
    if (!this.damageSound.isPlaying) {
      this.damageSound.play();
    }

    this.playerStats.health -= (1 - (this.playerStats.armor / 20));

    if (this.playerStats.health <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    if (isAuthenticated()) {
      this.registerScore();
    }

    this.physics.pause();
    this.themeMusic.stop();

    this.scene.start('game-over');
  }

  async registerScore() {
    const { score } = this.scoreLabel;
    const { username } = getAuthenticatedUser();
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        score,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/scores`, options);
    if (!response.ok) {
      throw new Error(`fetch error:: : ${response.status} : ${response.statusText}`);
    }
  }
}

export default GameScene;
