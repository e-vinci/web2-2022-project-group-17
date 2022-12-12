/* eslint-disable no-underscore-dangle */
// import Phaser from 'phaser';

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

    spawn(x, y, numberOfBullets) {
        for (let i = 0; i < numberOfBullets ; i+=1) {
            const bullet = this._group.create(x, y, this.key);
            bullet.setVelocityX(Math.sin(i/numberOfBullets*2*Math.PI)*100);
            bullet.setVelocityY(Math.cos(i/numberOfBullets*2*Math.PI)*100);
        }
    }
}
