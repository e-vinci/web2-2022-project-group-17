import Phaser from 'phaser';


export default class HealthBar extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, health, style) {
    super(scene, x, y, health, style);
    this.health = health;
  }


  setHealth(health) {
    this.health = health;
    this.updateHealthText();
  }

  add(health) {
    const newHealth = this.health + health > 100 ? 100 : this.health + health;
    this.setHealth(newHealth);
  }

  updateHealthText() {
    this.setText((this.health));
  }
}
