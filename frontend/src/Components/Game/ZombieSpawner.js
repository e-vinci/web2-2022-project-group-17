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
    const random = Phaser.Math.Between(0,3);
    const possibleSpawns = [[playerX-500, Phaser.Math.Between(playerY-500,playerY+500)],
                            [playerX+500, Phaser.Math.Between(playerY-500,playerY+500)],
                            [Phaser.Math.Between(playerX-500,playerX+500),playerY+500],
                            [Phaser.Math.Between(playerX-500,playerX+500),playerY-500]];

    const zombie = this._group.create(possibleSpawns[random][0], possibleSpawns[random][1], this.key);
    zombie.setBounce(1);
    zombie.setCollideWorldBounds(true);
  
    return zombie;
  }
  
}
