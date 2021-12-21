import { Component, OnInit } from '@angular/core';

import Phaser from 'phaser'
import MainScene from './MainScene';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {}

  ngOnInit() {
    this.initializePhaser()
  }

  initializePhaser() {
    this.config = {
      type: Phaser.AUTO,
      width: 960,
      height: 480,
      parent: 'game',
      scene: [MainScene],
      //scale: {
      //  mode: Phaser.Scale.FIT
      //}
      render: {
        pixelArt: true
      },
      physics: {
        default: 'arcade',
        arcade: {
            debug: false
        } 
      }
    };
    
    this.phaserGame = new Phaser.Game(this.config);
  }

}
