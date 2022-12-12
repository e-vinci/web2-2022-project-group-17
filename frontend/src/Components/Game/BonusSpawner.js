/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class BonusSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bonusKey = 'bonus') {
    this.scene = scene;
    this.key = bonusKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn() {
    const x = Phaser.Math.Between(20,800);
    const y = Phaser.Math.Between(75,600);

    const bonus = this._group.create(x, y, this.key);

  
    return bonus;
  }
}
