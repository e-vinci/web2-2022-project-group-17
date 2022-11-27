import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import HealthLabel from './HealthLabel';
import BombSpawner from './BombSpawner';
import BulletSpawner from './BulletSpawner';
import skyAsset from '../../assets/sky.png';
import platformAsset from '../../assets/platform.png';
import starAsset from '../../assets/star.png';
import bombAsset from '../../assets/bomb.png';
import bulletAsset from '../../assets/bullet.png';
import dudeAsset from '../../assets/dude.png';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const STAR_KEY = 'star';
const BOMB_KEY = 'bomb';
const BULLET_KEY = 'bullet';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.healthLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.bulletSpawner = undefined;
    this.gameOver = false;
    this.frame = 0;
  }


  preload() {
    this.load.image('sky', skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset);
    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(BULLET_KEY, bulletAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }


  create() {
    this.add.image(400, 300, 'sky');
    // const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.healthLabel = this.createHealthLabel(500, 16, 100);
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;

    this.bulletSpawner = new BulletSpawner(this, BULLET_KEY);

    const bulletsGroup = this.bulletSpawner.group;


    // this.physics.add.collider(this.stars, platforms);
    // this.physics.add.collider(this.player, platforms);
    // this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.overlap(bombsGroup, bulletsGroup, this.bulletHitBomb, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */

  }


  update() {
    if (this.gameOver) {
      return;
    }

    this.scoreLabel.add(1);
    
  
    this.frame += 1;


    // Random chance of zombie spawn
    if (this.frame % 100 === 0) {
      this.bombSpawner.spawn();
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

    Phaser.Actions.Call(this.bombSpawner.group.getChildren(), (bomb) =>
      this.physics.moveToObject(bomb, this.player, 30),
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

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
  }

  fireBullet() {
    this.bulletSpawner.spawn(this.player.x, this.player.y);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    this.bombSpawner.spawn(player.x);
  }

  bulletHitBomb(bomb, bullet) {
    bomb.destroy();
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

  hitBomb(player) {
    this.healthLabel.add(-1);

    if (this.healthLabel.health === 0) {
      this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
    }
  }


}

export default GameScene;
