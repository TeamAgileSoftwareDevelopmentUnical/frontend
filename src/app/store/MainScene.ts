import { ThrowStmt } from '@angular/compiler';
import { getOriginalNode, sortAndDeduplicateDiagnostics } from 'typescript';
import { GzDialog } from './plugins/GzDialog';

export default class MainScene extends Phaser.Scene {
  speeches;
  gzDialog: GzDialog;
  player;
  butcher;
  character2;
  ortolan;
  fruiterer;
  cursors;
  up;

  constructor(config) {
    super(config);
  }

  preload() {
    // Load all assets here

    speeches;
    gzDialog: GzDialog;
    player;
    butcher;
    character2;
    ortolan;
    fruiterer;
    cursors;
    up;

    this.load.image('butcher', 'assets/butcher.png');
    this.load.image('character2', 'assets/character2.png');
    this.load.image('ortolan', 'assets/ortolan.png');
    this.load.image('fruiterer', 'assets/fruiterer.png');

    this.load.tilemapTiledJSON('map', 'assets/map.json');

        this.load.tilemapTiledJSON('map','assets/map.json');

    this.load.json('speeches', 'assets/speeches.json');
  }

  create() {
    // Add assets to the scene here

    const map = this.make.tilemap({
      key: 'map',
      tileWidth: 960,
      tileHeight: 480,
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
    this.character2 = this.physics.add
      .sprite(520, 400, 'character2')
      .setScale(0.2)
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
      this.speech,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.character2,
      this.speech,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.ortolan,
      this.speech,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.fruiterer,
      this.speech,
      null,
      this
    );

        this.player.setCollideWorldBounds(true);

        water_layer.setCollisionByExclusion([-1]);
        stand_layer.setCollisionByExclusion([-1]);
        stand_2_layer.setCollisionByExclusion([-1]);
        stand_3_layer.setCollisionByExclusion([-1]);

    this.speeches = this.cache.json.get('speeches');
  }

        this.physics.add.collider(this.player, this.butcher, this.speech, null, this);
        this.physics.add.collider(this.player, this.character2, this.speech, null, this);
        this.physics.add.collider(this.player, this.ortolan, this.speech, null, this);
        this.physics.add.collider(this.player, this.fruiterer, this.speech, null, this);

        this.cursors = this.input.keyboard.createCursorKeys()

    // Close the dialog on spacebar press
    if (this.gzDialog.visible) {
      this.player.setVelocity(0);
      this.player.stop();
      if (this.cursors.space.isDown) {
        {
          this.gzDialog.display(false);
        }
      }
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
  speech(player, npc) {
    if (!this.gzDialog.visible) {
      this.gzDialog.setText(this.speeches[npc.texture.key]);
    }
  }
}
