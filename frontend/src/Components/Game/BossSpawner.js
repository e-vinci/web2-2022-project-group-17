/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class BossSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bossKey = 'boss') {
    this.scene = scene;
    this.key = bossKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(playerX, playerY) {
    const random = Phaser.Math.Between(0,3);
    const possibleSpawns = [[playerX-500, Phaser.Math.Between(playerY-500,playerY+500)],
                            [playerX+500, Phaser.Math.Between(playerY-500,playerY+500)],
                            [Phaser.Math.Between(playerX-500,playerX+500),playerY+500],
                            [Phaser.Math.Between(playerX-500,playerX+500),playerY-500]];

    const boss = this._group.create(possibleSpawns[random][0], possibleSpawns[random][1], this.key);
    boss.setBounce(1);
    boss.setCollideWorldBounds(true);
  
    return boss;
  }
}
