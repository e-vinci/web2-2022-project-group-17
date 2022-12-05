import Phaser from 'phaser';


export default class UIGameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }

    create() {
        const centerX = this.scale.width * 0.5;
        const centerY = this.scale.height * 0.5;
        this.add.text(centerX, centerY - 100, 'GAME OVER',
            {
                fontSize: '52px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Button to restart the game
        const button = this.add.text(centerX, centerY + 100, 'Restart',
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