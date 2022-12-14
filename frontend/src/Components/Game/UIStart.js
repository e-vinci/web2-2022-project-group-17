import Phaser from 'phaser';

export default class StartUI extends Phaser.Scene {
    constructor() {
        super('game-start');
    }


    create() {
        const button = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'START',
            {
                fontFamily: 'Candara, Arial',
                fontSize: '48px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerover', () => { button.setFontSize(60); });
        button.on('pointerout', () => { button.setFontSize(48); });
        button.on('pointerdown', () => {
            this.scene.start('game-scene');
        });
    }
}