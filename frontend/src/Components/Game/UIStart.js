import Phaser from 'phaser';
import logoAsset from '../../assets/logo.png';

export default class StartUI extends Phaser.Scene {
    constructor() {
        super('game-start');
    }

    preload(){
        this.load.image('logoAsset', logoAsset);
        
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
        this.add.image(this.scale.width*0.5,this.scale.height*0.5,'logoAsset').setOrigin(0.5).setDepth(-1).setAlpha(0.3);
    }
}