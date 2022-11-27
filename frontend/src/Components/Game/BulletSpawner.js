/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class BulletSpawner {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene, bulletKey = 'bullet') {
        this.scene = scene;
        this.key = bulletKey;

        this._group = this.scene.physics.add.group();
    }

    get group() {
        return this._group;
    }

    spawn(x, y) {
        const bullet = this._group.create(x, y, this.key);
        bullet.setVelocity(Phaser.Math.Between(-100,100),Phaser.Math.Between(-100,100));
        bullet.setBounce(1);
        // With this line removed, do the bullets destroy after leaving the scene?
        // bullet.setCollideWorldBounds(true);

        return bullet;
    }
}
