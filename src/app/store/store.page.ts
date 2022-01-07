import { Component, OnInit } from '@angular/core';

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

  initializePhaser(): void {
    this.config = {
      type: Phaser.AUTO,
      width: 1400, //window.innerWidth * window.devicePixelRatio,
      height: 480, //(window.innerHeight * window.devicePixelRatio) * 0.5,
      parent: 'game',
      scene: [MainScene],
      scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
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

  getId(){
    return sessionStorage.getItem( 'id');
  }
  
  isSeller(){
    if(sessionStorage.getItem('role')==="Seller"){
      return true;
    }
    return false;
  }

  initializeChart(): void {
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

  /**
   * Decrease the `quantity` of the selected item by 1, if it reachs 0, then it is removed from the chart
   *
   * @param event The event fired from the button
   */
  public removeOne(event: any): void {
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
  /**
   * Add another item to the chart, effectively incrementing its `quantity` by 1
   *
   * @param event The event fired from the button
   */
  public addOne(event: any): void {
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
  /**
   * Remove, regardless of its `quantity`, the selected item
   *
   * @param event The event fired from the button
   */
  public removeAll(event: any): void {
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
  /**
   * Get the total price by adding up each element's price multiplicated by its quantity.
   * It rounds up the total to have only two decimal places
   *
   * @see <a href="https://stackoverflow.com/a/11832950/10301322">How to round to at most two decimal places</a>
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round">Math.round()</a>
   *
   * @returns The total price the user's gonna pay
   */
  public getTotalChartPrice(): number {
    let returnValue = 0;
    this.chart.forEach((element) => {
      returnValue += (element.getQuantity() * Number(element.getPrice()));
    });
    // Round is needed to avoid the js divisions thing
    return Math.round(returnValue * 100) / 100;
  }

}
