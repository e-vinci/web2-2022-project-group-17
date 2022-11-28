import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import HealthLabel from './HealthLabel';
import ZombieSpawner from './ZombieSpawner';
import BulletSpawner from './BulletSpawner';
import BonusSpawner from './BonusSpawner';
import bonusAsset from '../../assets/bonus.png';
import skyAsset from '../../assets/sky.png';
import platformAsset from '../../assets/platform.png';
import zombieAsset from '../../assets/zombie.png';
import bulletAsset from '../../assets/bullet.png';
import dudeAsset from '../../assets/dude.png';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const ZOMBIE_KEY = 'zombie';
const BULLET_KEY = 'bullet';
const BONUS_KEY = 'bonus';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.healthLabel = undefined;
    this.zombieSpawner = undefined;
    this.bulletSpawner = undefined;
    this.bonusSpawner = undefined;
    this.gameOver = false;
    this.frame = 0;
  }


  preload() {
    this.load.image('sky', skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(ZOMBIE_KEY, zombieAsset);
    this.load.image(BULLET_KEY, bulletAsset);
    this.load.image(BONUS_KEY, bonusAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }


  create() {
    this.add.image(400, 300, 'sky');
    // const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.healthLabel = this.createHealthLabel(500, 16, 100);
    this.zombieSpawner = new ZombieSpawner(this, ZOMBIE_KEY);
    const zombiesGroup = this.zombieSpawner.group;
    this.bulletSpawner = new BulletSpawner(this, BULLET_KEY);
    const bulletsGroup = this.bulletSpawner.group;
    this.bonusSpawner = new BonusSpawner(this, BONUS_KEY);
    const bonusGroup = this.bonusSpawner.group;


    // this.physics.add.collider(this.player, platforms);
    // this.physics.add.collider(zombiesGroup, platforms);
    this.physics.add.collider(this.player, zombiesGroup, this.hitZombie, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.overlap(zombiesGroup, bulletsGroup, this.bulletHitZombie, null, this);
    this.physics.add.overlap(this.player, bonusGroup, this.collectBonus, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
  }


  update() {
    if (this.gameOver) {
      return;
    }


    this.frame += 1;


    // Zombie spawns every 100 frames
    if (this.frame % 100 === 0) {
      this.zombieSpawner.spawn();
    }

    // Bonus spawn every 1000 frames
    if (this.frame % 1000 === 0) {
      this.bonusSpawner.spawn();
    }



    if (this.cursors.space.isDown) {
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

  /*
  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, GROUND_KEY)
      .setScale(2)
      .refreshBody();

    platforms.create(800, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }
  */

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
    this.healthLabel.add(20);
  }

  bulletHitZombie(zombie, bullet) {
    zombie.destroy();
    bullet.destroy();

    this.scoreLabel.add(100);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);

    return label;
  }

  createHealthLabel(x, y, health) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new HealthLabel(this, x, y, health, style);
    this.add.existing(label);

    return label;
  }

  hitZombie(player) {
    this.healthLabel.add(-1);

    // End the game if player has no health
    if (this.healthLabel.health <= 0) {
      this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.gameOver = true;
    }
  }

  displayLeaderboard() {
    const text = this.add.text(350, 250, '', { font: '32px Courier', fill: '#000000' });
        text.setText([
            'Name: ',
            'Score: '
        ]);
  }

}

export default GameScene;
