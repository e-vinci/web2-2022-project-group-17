import Phaser from 'phaser';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';


export default class UIGameOver extends Phaser.Scene {
    constructor() {
        super("game-over");
    }



    create() {
        const centerX = this.scale.width * 0.5;
        const centerY = this.scale.height * 0.5;
        this.add.text(centerX, centerY - 150, 'GAME OVER',
            {
                fontFamily: 'Candara, Arial',
                fontSize: '52px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Button to restart the game
        const button = this.add.text(centerX, centerY + 100, 'Restart',
            {
                fontFamily: 'Candara, Arial',
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
        this.printScores();
        
    }

    
    async printScores() {
        const response = await fetch('/api/scores?top=10');
        if (!response.ok) {
          throw new Error(`fetch error:: : ${response.status} : ${response.statusText}`);
        }
        const scores = await response.json();
        for(let i = 0; i < scores.length ;i+=1){
            this.add.text(270, 200 + 15 * i, i + 1);
            if(isAuthenticated() && getAuthenticatedUser().username === scores[i].username){
                this.add.text(310, 200 + 15 * i, scores[i].username, {color:'red'})
            }
            else{
                this.add.text(310,200 + 15 * i, scores[i].username);
            }
            this.add.text(450, 200 + 15*i, scores[i].score);
        }
      }


      
}