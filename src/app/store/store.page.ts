import {Component, Injectable, OnInit} from '@angular/core';

import Phaser from 'phaser';
import MainScene from './MainScene';
import { Item } from './add_on/item';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ProductResponse } from '../models/response/productResponse';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  static instance: StorePage = null;

  phaserGame: Phaser.Game;
  musicPlaying: boolean;
  config: Phaser.Types.Core.GameConfig;

  cart: Item[];

  debug = false;

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    public router: Router,
    private productService: ProductService
  ) {
    if (StorePage.instance === null) {
      StorePage.instance = this;
    }
    console.log(StorePage.instance);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.phaserGame.scale.resize(
          Number(this.config.width),
          Number(this.config.height)
        );
      }
    });
  }

  ngOnInit() {
    // Necessary to overcome the game not displaying sometimes
    document.addEventListener(
      'readystatechange',
      () => {
        this.phaserGame.scale.resize(
          Number(this.config.width),
          Number(this.config.height)
        );
      },
      false
    );
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
        pixelArt: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: this.debug,
        },
      },
    };

    this.phaserGame = new Phaser.Game(this.config);
    this.musicPlaying = true;

    document.addEventListener('keypress', (e) => {
      if (e.key === '+') {
        this.phaserGame.sound.volume += this.phaserGame.sound.volume < 1 ? 0.01: 0;
      }
      if (e.key === '-') {
        this.phaserGame.sound.volume -= this.phaserGame.sound.volume > 0 ? 0.01: 0;
      }
      if (e.key !== 'm') {
        return false;
      }

      if (this.musicPlaying) {
        this.phaserGame.sound.pauseAll();
      } else {
        this.phaserGame.sound.resumeAll();
      }
      this.musicPlaying = !this.musicPlaying;
      MainScene.muted = !MainScene.muted;
    });
  }

  getId(): number {
    return Number(sessionStorage.getItem('id'));
  }

  isSeller() {
    if (sessionStorage.getItem('role') === 'Seller') {
      return true;
    }
    return false;
  }

  initializeCart(): void {
    this.cart = [];
    if (this.debug) {
      this.cart.push(new Item(1, 'Lemons', 'MISS! THE LEMONS! MISSSSS!', 1.2));
      this.cart.push(new Item(2, 'Apples', 'Just some apples', 1.6));
      this.cart.push(new Item(3, 'Melons', 'Just some melons', 2.6));
      this.cart.push(new Item(4, 'Cherries', 'Just some cherries', 3.6));
      this.cart.push(new Item(5, 'Artichokes', 'Just some artichokes', 4.8));
      this.cart.push(new Item(6, 'Yes', 'No.', 69.42));
      this.cart.push(new Item(7, 'Sausages', 'Hotter than a dog!', 7.5));
      this.cart.push(new Item(8, 'Bananas', 'Just some bananas', 1.2));
    }
  }

  resetCart(): void {
    // TODO: clear items from the db
    this.cart.length = 0;
  }

  addItem(item: Item, availableQuantity: number) {
    // eslint-disable-next-line prefer-const
    for (let itemInCart of this.cart) {
      if (item.id === itemInCart.id) {
        if (
          availableQuantity >=
          +item.getQuantity() + +itemInCart.getQuantity()
        ) {
          itemInCart.addMany(item.getQuantity());
          this.showAlert('Cart', 'Quantity added successfully');
          return;
        } else if (itemInCart.getQuantity() === availableQuantity) {
          this.showAlert(
            'Cart',
            'You have already added all available units to your cart!'
          );
          return;
        } else if (
          availableQuantity <
          +item.getQuantity() + +itemInCart.getQuantity()
        ) {
          this.showConfirm(item, itemInCart, availableQuantity);
          return;
        }
      }
    }

    this.cart.push(item);
    this.showAlert('Cart', 'Product added successfully');
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  showConfirm(item: Item, itemInCart: Item, availableQuantity: number) {
    this.alertController
      .create({
        header: 'Cart',
        subHeader: 'A maximum of ' + availableQuantity + ' units available.',
        message:
          'You can add up to ' +
          (availableQuantity - itemInCart.getQuantity()) +
          ' more items, do you want to proceed?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              itemInCart.addMany(availableQuantity - itemInCart.getQuantity());
              this.showAlert('Cart', 'Quantity added successfully');
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              // blank
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
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
      this.phaserGame.scale.resize(
        Number(this.config.width),
        Number(this.config.height)
      );
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
      } else if (
        sessionStorage.getItem('saw_tutorial') === '0' ||
        sessionStorage.getItem('saw_tutorial') === null
      ) {
        document.getElementById('tutorial-modal').setAttribute('class', 'out');
        sessionStorage.setItem('saw_tutorial', '1');
      }
      this.phaserGame.scale.resize(
        Number(this.config.width),
        Number(this.config.height)
      );
    });
    document
      .getElementById('tutorial-modal-close')
      .addEventListener('click', () => {
        document.getElementById('tutorial-modal').setAttribute('class', 'out');
        sessionStorage.setItem('saw_tutorial', '1');
        this.phaserGame.scale.resize(
          Number(this.config.width),
          Number(this.config.height)
        );
      });
    document
      .getElementById('tutorial-modal-content')
      .addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      });
  }

  showPurchases() {
    this.navCtrl.navigateForward('/purchases/' + this.getId());
  }

  /**
   * Decrease the `quantity` of the selected item by 1, if it reachs 0, then it is removed from the cart
   *
   * @param event The event fired from the button
   */
  public removeOne(event: any): void {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemId = itemNodeList[0].textContent;
    const itemName = itemNodeList[0].textContent;
    const itemDescription = itemNodeList[1].textContent;
    const itemPrice = itemNodeList[2].textContent.slice(0, -1);

    let toDelete: Item = null;
    this.cart.forEach((element) => {
      if (
        element.name === itemName &&
        element.description === itemDescription &&
        element.getPrice() === itemPrice
      ) {
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
      console.log(new Item(itemId, itemName, itemDescription, itemPrice));
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
      if (
        element.name === itemName &&
        element.description === itemDescription &&
        element.getPrice() === itemPrice
      ) {
        // Effectively getting the product from db
        this.productService
          .getProductBy(element.id)
          .subscribe((response: ProductResponse) => {
            // Checkin for availability
            if (response.batch.availableQuantity - element.getQuantity() > 0) {
              element.addOne();
            } else {
              this.showAlert(
                'Not enough item in stock!',
                `There are no ${element.name} left in stock!`
              );
            }
          });
      }
      if (this.debug) {
        console.log(new Item(element.id, itemName, itemDescription, itemPrice));
      }
    });
  }
  /**
   * Remove, regardless of its `quantity`, the selected item
   *
   * @param event The event fired from the button
   */
  public removeAll(event: any): void {
    const target = event.target || event.srcElement || event.currentTarget;
    const itemNodeList = target.parentElement.parentElement.childNodes;

    const itemId = itemNodeList[0].textContent;
    const itemName = itemNodeList[1].textContent;
    const itemDescription = itemNodeList[2].textContent;
    const itemPrice = itemNodeList[3].textContent.slice(0, -1);

    let index = 0;

    this.cart.forEach((element) => {
      if (
        element.name === itemName &&
        element.description === itemDescription &&
        element.getPrice() === itemPrice
      ) {
        index = this.cart.indexOf(element);
      }
    });

    this.cart.splice(index, 1);

    if (this.debug) {
      console.log(new Item(itemId, itemName, itemDescription, itemPrice));
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
      returnValue += element.getQuantity() * Number(element.getPrice());
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

  public navigate(category: string) {
    this.navCtrl.navigateForward('/stand-products/' + category);
  }

  public getNavCtrl() {
    return this.navCtrl;
  }
}
