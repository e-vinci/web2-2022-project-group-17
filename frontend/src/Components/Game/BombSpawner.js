/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class BombSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bombKey = 'bomb') {
    this.scene = scene;
    this.key = bombKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn() {
    const random = Phaser.Math.Between(0,3);
    const possibleSpawns = [[15, Phaser.Math.Between(0,800)],[985,Phaser.Math.Between(0,800)],[Phaser.Math.Between(0,1000),15],[Phaser.Math.Between(0,1000),785]];
    const x = possibleSpawns[random][0];
    const y = possibleSpawns[random][1];

    const bomb = this._group.create(x, y, this.key);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    return bomb;
  }
}
