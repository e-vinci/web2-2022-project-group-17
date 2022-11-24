import Phaser from 'phaser';

const formatHealth = (health) => `Health: ${health}`;

export default class HealthLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, health, style) {
    super(scene, x, y, formatHealth(health), style);
    this.health = health;
  }

  setHealth(health) {
    this.health = health;
    this.updateHealthText();
  }

  add(points) {
    this.setHealth(this.health + points);
  }

  updateHealthText() {
    this.setText(formatHealth(this.health));
  }
}
