
import { ThrowStmt } from '@angular/compiler';
import { getOriginalNode, sortAndDeduplicateDiagnostics } from 'typescript';
import { StorePage } from './store.page';


export default class MainScene extends Phaser.Scene {
  speeches;
  player;
  butcher;
  WelcomeCharacter;
  ortolan;
  fruiterer;
  cart;
  cursors;
  up;
  rexUI;
  dialogBox;
  textBox;

  constructor(config) {
    super(config);
  }

  preload() {
    // Load all assets here

    this.load.image('ground', 'assets/ground.png');
    this.load.image('market', 'assets/market.png');
    this.load.image('objects', 'assets/objects.png');

    this.load.image('butcher', 'assets/butcher.png');
    this.load.image('WelcomeCharacter', 'assets/WelcomeCharacter.png');
    this.load.image('ortolan', 'assets/ortolan.png');
    this.load.image('fruiterer', 'assets/fruiterer.png');

    this.load.image('cart', 'assets/cart.png');
    this.load.image('empty-cart', 'assets/empty-cart.png');

    this.load.tilemapTiledJSON('map', 'assets/map.json');

    this.load.atlas(
      'player',
      'assets/player-sheet.png',
      'assets/player-sheet.json'
    );

    this.load.json('speeches', 'assets/speeches.json');

    this.rexUI = this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
    
    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
  }

  create() {
    // Add assets to the scene here

    const map = this.make.tilemap({
      key: 'map',
      tileWidth: 960, //window.innerWidth * window.devicePixelRatio,
      tileHeight: 480, //(window.innerHeight * window.devicePixelRatio) * 0.5,
    });

    const tilesetMarket = map.addTilesetImage('market', 'market');
    const tilesetObjects = map.addTilesetImage('objects', 'objects');
    const tilesetGround = map.addTilesetImage('ground', 'ground');

    const groundLayer = map.createLayer('ground', [
      tilesetMarket,
      tilesetObjects,
      tilesetGround,
    ]);
    const waterLayer = map.createLayer('water', [
      tilesetMarket,
      tilesetObjects,
      tilesetGround,
    ]);
    this.butcher = this.physics.add
      .sprite(180, 200, 'butcher')
      .setScale(0.2)
      .setImmovable();
    this.butcher.body.setSize(850, 730, true);
    this.ortolan = this.physics.add
      .sprite(480, 200, 'ortolan')
      .setScale(0.2)
      .setImmovable();
    this.ortolan.body.setSize(850, 730, true);
    this.fruiterer = this.physics.add
      .sprite(850, 200, 'fruiterer')
      .setScale(0.2)
      .setImmovable();
    this.fruiterer.body.setSize(850, 730, true);
    const standLayer = map.createLayer('stand', [
      tilesetMarket,
      tilesetObjects,
      tilesetGround,
    ]);
    const stand2Layer = map.createLayer('stand_2', [
      tilesetMarket,
      tilesetObjects,
      tilesetGround,
    ]);
    const stand3Layer = map.createLayer('stand_3', [
      tilesetMarket,
      tilesetObjects,
      tilesetGround,
    ]);
    this.WelcomeCharacter = this.physics.add
      .sprite(520, 400, 'WelcomeCharacter')
      .setScale(0.2)
      .setImmovable();
    this.cart = this.physics.add
      .sprite(430, 400,'empty-cart')
      .setImmovable();

    this.player = this.physics.add.sprite(480, 450, 'player').setScale(3);
    this.player.body.setSize(6, 6, true);

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'player', frame: 'up1' },
        { key: 'player', frame: 'up2' },
        { key: 'player', frame: 'up3' },
        { key: 'player', frame: 'up4' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: [
        { key: 'player', frame: 'down1' },
        { key: 'player', frame: 'down2' },
        { key: 'player', frame: 'down3' },
        { key: 'player', frame: 'down4' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: [
        { key: 'player', frame: 'right1' },
        { key: 'player', frame: 'right2' },
        { key: 'player', frame: 'right3' },
        { key: 'player', frame: 'right4' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: [
        { key: 'player', frame: 'left1' },
        { key: 'player', frame: 'left2' },
        { key: 'player', frame: 'left3' },
        { key: 'player', frame: 'left4' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    this.player.setCollideWorldBounds(true);

    waterLayer.setCollisionByExclusion([-1]);
    standLayer.setCollisionByExclusion([-1]);
    stand2Layer.setCollisionByExclusion([-1]);
    stand3Layer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, waterLayer);
    this.physics.add.collider(this.player, standLayer);
    this.physics.add.collider(this.player, stand2Layer);
    this.physics.add.collider(this.player, stand3Layer);

    this.physics.add.collider(
      this.player,
      this.butcher,
      this.speechWithSeller,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.WelcomeCharacter,
      this.speechWithWelcomeCharacter,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.ortolan,
      this.speechWithSeller,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.fruiterer,
      this.speechWithSeller,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.cart,
      this.doCheckout,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, 960, 480, true).zoomTo(
      1.7, //zoom distance
      1500 // duration/speed of zoom
    );
    this.cameras.main.startFollow(this.player);

    this.speeches = this.cache.json.get('speeches');
}

  update() {
    // Every 16ms. Game logic here

    if (this.cursors.up.isDown) {
      this.player.setVelocity(0);
      this.player.play('up', true);
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0);
      this.player.play('down', true);
      this.player.setVelocityY(100);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(0);
      this.player.play('right', true);
      this.player.setVelocityX(100);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocity(0);
      this.player.play('left', true);
      this.player.setVelocityX(-100);
    } else {
      this.player.stop();
      this.player.setVelocity(0);
    }

    if(this.dialogBox != null) {
      this.player.setVelocity(0);
      this.player.stop();
    }

    if(this.textBox != null) {
      this.player.setVelocity(0);
      this.player.stop();
    }
  }

  /**
   *
   *
   * Handle collisions with the script layer. Tiles which have a dialog response are given
   *
   * a 'name' property with a value that corresponds to a key in the script object found
   *
   * in speeches.js
   *
   *
   *
   * @param player
   * @param npc
   */

  doCheckout(player, npc) {
    if (npc.texture.key == 'cart')
      this.speechWithSeller(player, npc);
  }

  speechWithSeller(player, npc) {
    var x = this.cameras.cameras[0].midPoint.x;
    var y = this.cameras.cameras[0].midPoint.y;
    x = ~~x;
    y = ~~y + 50;

    this.dialogBox = this.rexUI.add.dialog({
      x: x,
      y: y,

      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xB7950B),

      title: this.rexUI.add.label({
          background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xB9770E),
          text: this.add.text(0, 0, npc.texture.key, {
              fontSize: '20px'
          }),
          space: {
              left: 15,
              right: 15,
              top: 10,
              bottom: 10
          }
      }),

      content: this.add.text(0, 0, this.speeches[npc.texture.key], {
          fontSize: '20px'
      }),

      actions: [
          this.createLabel(this, 'Yes'),
          this.createLabel(this, 'No')
      ],

      space: {
          title: 20,
          content: 20,
          action: 10,

          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
      },

      align: {
          actions: 'right', // 'center'|'left'|'right'
      },

      expand: {
          content: false, // Content is a pure text object
      }
  })
      .layout()
      // .drawBounds(this.add.graphics(), 0xff0000)
      .popUp(700);

  this.dialogBox
      .on('button.click', function (button, groupName, index) { // index 0 -> YES button, index 1 -> NO button
        this.dialogBox.destroy();
        this.dialogBox = null;
        
        if(index == 0) {
          let params = 'scrollbars=no, resizable=no, status=no, location=no, toolbar=no, menubar=no, width=0, height=0, left=-1000, top=-1000';
          if(npc.texture.key == 'butcher')
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','test', params)
          else if(npc.texture.key == 'ortolan')
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','test', params)
          else if(npc.texture.key == 'fruiterer')
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','test', params)
          else if(npc.texture.key == 'cart')
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','test', params)
        }
      }, this)
      .on('button.over', function (button, groupName, index) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', function (button, groupName, index) {
          button.getElement('background').setStrokeStyle();
      });
  }

  createLabel(scene, text) {
    return scene.rexUI.add.label({
        // width: 40,
        // height: 40,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xAF601A),

        text: scene.add.text(0, 0, text, {
            fontSize: '20px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
  }

  speechWithWelcomeCharacter() {

    //Just for testing
    this.cart.setTexture('cart');

    this.createTextBox(this, {
      wrapWidth: 500,
      //fixedWidth: 500,
      //fixedHeight: 65,
    })
    .start(this.speeches['WelcomeCharacter'], 50);

  }
  
  createTextBox(scene, config) {
    const COLOR_PRIMARY = 0x4e342e;
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;

    const GetValue = Phaser.Utils.Objects.GetValue;

    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);

    var x = this.cameras.cameras[0].midPoint.x;
    var y = this.cameras.cameras[0].midPoint.y;
    x = ~~x -310;
    y = ~~y +50;

    this.textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            text: this.getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

    this.textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }

            // LAST CLICK IN THE LAST PAGE
            if (this.isLastPage && !this.isTyping) { 
              scene.textBox.destroy();
              scene.textBox = null;
            }
        }, this.textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
              return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });

        }, this.textBox)

    return this.textBox;
  }

  getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
  }

}
