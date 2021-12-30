import { Component, OnInit } from '@angular/core';
import { GzDialog } from './plugins/GzDialog';

import Phaser from 'phaser';
import MainScene from './MainScene';
import { Item } from './add_on/item';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  chart: Item[];

  debug = true;

  constructor() {}

  ngOnInit() {
    this.initializePhaser();
    this.initializeChart();
  }

  initializePhaser() {
    this.config = {
      type: Phaser.AUTO,
      width: window.innerWidth * window.devicePixelRatio,
      height: (window.innerHeight * window.devicePixelRatio) * 0.5,
      parent: 'game',
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        zoom: Phaser.Scale.MAX_ZOOM,
      },
      render: {
        pixelArt: true
      },
      physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
      },
      plugins: {
        scene: [
          { key: 'gzDialog', plugin: GzDialog, mapping: 'gzDialog' }
        ]
      }
    };

    this.phaserGame = new Phaser.Game(this.config);
  }

  initializeChart() {
    this.chart = [];
    if (this.debug) {
      this.chart.push(new Item('Lemons', 'MISS! THE LEMONS! MISSSSS!', 1.20));
      this.chart.push(new Item('Apples', 'Just some apples', 1.60));
      this.chart.push(new Item('Melons', 'Just some melons', 2.60));
      this.chart.push(new Item('Cherries', 'Just some cherries', 3.60));
      this.chart.push(new Item('Artichokes', 'Just some artichokes', 4.80));
      this.chart.push(new Item('Yes', 'No.', 69.420));
      this.chart.push(new Item('Sausages', 'Hotter than a dog!', 7.50));
      this.chart.push(new Item('Bananas', 'Just some bananas', 1.20));
    }
  }

  public removeOne(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemName = itemNodeList[0].textContent;
    const itemDescription = itemNodeList[1].textContent;
    const itemPrice = itemNodeList[2].textContent.slice(0, -1);

    let toDelete: Item = null;
    this.chart.forEach((element) => {
      if (element.name === itemName && element.description === itemDescription && element.getPrice() === itemPrice) {
        element.removeOne();
        if (element.getQuantity() <= 0) {
          toDelete = element;
        }
      }
    });

    if (toDelete) {
      this.chart.splice(this.chart.indexOf(toDelete), 1);
    }

    if (this.debug) {
      console.log(new Item(itemName, itemDescription, itemPrice));
    }
  }
  public addOne(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemName = itemNodeList[0].textContent;
    const itemDescription = itemNodeList[1].textContent;
    const itemPrice = itemNodeList[2].textContent.slice(0, -1);

    this.chart.forEach((element) => {
      if (element.name === itemName && element.description === itemDescription && element.getPrice() === itemPrice) {
        element.addOne();
      }
    });

    if (this.debug) {
      console.log(new Item(itemName, itemDescription, itemPrice));
    }
  }
  public removeAll(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemName = itemNodeList[0].textContent;
    const itemDescription = itemNodeList[1].textContent;
    const itemPrice = itemNodeList[2].textContent.slice(0, -1);

    let index = 0;

    this.chart.forEach((element) => {
      if (element.name === itemName && element.description === itemDescription && element.getPrice() === itemPrice) {
        index = this.chart.indexOf(element);
      }
    });

    this.chart.splice(index, 1);

    if (this.debug) {
      console.log(new Item(itemName, itemDescription, itemPrice));
    }
  }

}
