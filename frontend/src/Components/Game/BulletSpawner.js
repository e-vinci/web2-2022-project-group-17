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

    // Spawns bullets in a radial way centered on x,y
    spawn(x, y) {
        const numberOfBullets = 10;
        for (let i = 0; i < numberOfBullets ; i+=1) {
            const bullet = this._group.create(x, y, this.key);
            bullet.setVelocityX(Math.sin(i/numberOfBullets*2*Math.PI)*100);
            bullet.setVelocityY(Math.cos(i/numberOfBullets*2*Math.PI)*100);
        }

        // TODO: make sure bullets destroy after leaving scene
    }
}
