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
      width: 224,
      height: 224,
      parent: 'game',
      scene: [MainScene],
      //scale: {
      //  mode: Phaser.Scale.ENVELOP
      //}
    };
    
    this.phaserGame = new Phaser.Game(this.config);
  }

}
