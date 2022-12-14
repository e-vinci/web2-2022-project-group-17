/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class ZombieSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, zombieKey = 'zombie') {
    this.scene = scene;
    this.key = zombieKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(playerX, playerY) {
    // const random = Phaser.Math.Between(0,3);
    // const possibleSpawns = [[playerX-500, Phaser.Math.Between(playerY-500,playerY+500)],[100,Phaser.Math.Between(0,800)],[Phaser.Math.Between(0,1000),15],[Phaser.Math.Between(0,1000),785]];
    const x = playerX + Phaser.Math.Between(99,101);
    const y = playerY + 100;

    const zombie = this._group.create(x, y, this.key);
    zombie.setBounce(1);
    zombie.setCollideWorldBounds(true);
  
    return zombie;
  }
}
