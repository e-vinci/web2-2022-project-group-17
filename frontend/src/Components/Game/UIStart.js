import Phaser from 'phaser';


export default class StartUI extends Phaser.Scene {
    constructor() {
        super('game-start');
    }


    create() {
        const button = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'START',
            {
                fontSize: '32px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerover', () => { button.setFontSize(48); });
        button.on('pointerout', () => { button.setFontSize(32); });
        button.on('pointerdown', () => {
            this.scene.start('game-scene');
        });
    }
}