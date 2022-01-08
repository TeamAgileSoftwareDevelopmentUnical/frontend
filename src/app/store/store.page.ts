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
  static instance: StorePage = null;

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  cart: Item[];

  debug = true;

  constructor() {
    StorePage.instance = this;
  }

  ngOnInit() {
    this.initializePhaser();
    this.initializeCart();
    this.initializeTutorial();
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

  getId(): number{
    return Number(sessionStorage.getItem('id'));
  }

  isSeller(){
    if(sessionStorage.getItem('role') === 'Seller'){
      return true;
    }
    return false;
  }

  initializeCart(): void {
    this.cart = [];
    if (this.debug) {
      this.cart.push(new Item('Lemons', 'MISS! THE LEMONS! MISSSSS!', 1.20));
      this.cart.push(new Item('Apples', 'Just some apples', 1.60));
      this.cart.push(new Item('Melons', 'Just some melons', 2.60));
      this.cart.push(new Item('Cherries', 'Just some cherries', 3.60));
      this.cart.push(new Item('Artichokes', 'Just some artichokes', 4.80));
      this.cart.push(new Item('Yes', 'No.', 69.420));
      this.cart.push(new Item('Sausages', 'Hotter than a dog!', 7.50));
      this.cart.push(new Item('Bananas', 'Just some bananas', 1.20));
    }
  }

  initializeTutorial(): void {
    if (sessionStorage.getItem('saw_tutorial') !== '1') {
      const modal = document.getElementById('tutorial-modal');
      modal.removeAttribute('class');
      modal.setAttribute('class', 'unfold');
    }

    document.getElementById('tutorial-modal').addEventListener('click', () => {
      document.getElementById('tutorial-modal').setAttribute('class', 'out');
      sessionStorage.setItem('saw_tutorial', '1');
    });
    document.body.addEventListener('keydown', (e) => {
      if (e.key !== 'h') {
        return false;
      }
      if (sessionStorage.getItem('saw_tutorial') === '1') {
        const modal = document.getElementById('tutorial-modal');
        modal.removeAttribute('class');
        modal.setAttribute('class', 'unfold');
        sessionStorage.setItem('saw_tutorial', '0');
      } else if (sessionStorage.getItem('saw_tutorial') === '0') {
        document.getElementById('tutorial-modal').setAttribute('class', 'out');
        sessionStorage.setItem('saw_tutorial', '1');
      }
    });
    document.getElementById('tutorial-modal-close').addEventListener('click', () => {
      document.getElementById('tutorial-modal').setAttribute('class', 'out');
      sessionStorage.setItem('saw_tutorial', '1');
    });
    document.getElementById('tutorial-modal-content').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    });
  }

  /**
   * Decrease the `quantity` of the selected item by 1, if it reachs 0, then it is removed from the cart
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
    this.cart.forEach((element) => {
      if (element.name === itemName && element.description === itemDescription && element.getPrice() === itemPrice) {
        element.removeOne();
        if (element.getQuantity() <= 0) {
          toDelete = element;
        }
      }
    });

    if (toDelete) {
      this.cart.splice(this.cart.indexOf(toDelete), 1);
    }

    if (this.debug) {
      console.log(new Item(itemName, itemDescription, itemPrice));
    }
  }
  /**
   * Add another item to the cart, effectively incrementing its `quantity` by 1
   *
   * @param event The event fired from the button
   */
  public addOne(event: any): void {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemName = itemNodeList[0].textContent;
    const itemDescription = itemNodeList[1].textContent;
    const itemPrice = itemNodeList[2].textContent.slice(0, -1);

    this.cart.forEach((element) => {
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

    this.cart.forEach((element) => {
      if (element.name === itemName && element.description === itemDescription && element.getPrice() === itemPrice) {
        index = this.cart.indexOf(element);
      }
    });

    this.cart.splice(index, 1);

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
  public getTotalCartPrice(): number {
    let returnValue = 0;
    this.cart.forEach((element) => {
      returnValue += (element.getQuantity() * Number(element.getPrice()));
    });
    // Round is needed to avoid the js divisions thing
    return Math.round(returnValue * 100) / 100;
  }

  /**
   * @returns The number of types of items present in the cart
   */
  public howManyItemsInCart() {
    return this.cart.length;
  }

}
