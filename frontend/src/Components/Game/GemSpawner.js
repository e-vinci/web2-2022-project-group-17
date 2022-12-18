/* eslint-disable no-underscore-dangle */
// import Phaser from 'phaser';

export default class GemSpawner {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene, gemKey = 'gem') {
        this.scene = scene;
        this.key = gemKey;

        this._group = this.scene.physics.add.group();
    }

    get group() {
        return this._group;
    }

    spawn(x, y) {


        const gem = this._group.create(x, y, this.key);


        return gem;
    }
}
