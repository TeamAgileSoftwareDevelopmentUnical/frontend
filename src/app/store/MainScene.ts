import { ThrowStmt } from "@angular/compiler";
import { getOriginalNode, sortAndDeduplicateDiagnostics } from "typescript";
import { GzDialog } from "./plugins/GzDialog";

export default class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    speeches;
    gzDialog: GzDialog;
    player;
    butcher;
    character2;
    ortolan;
    fruiterer;
    cursors;
    up;

    preload() {
        // Load all assets here

        this.load.image('ground','assets/ground.png');
        this.load.image('market','assets/market.png');
        this.load.image('objects','assets/objects.png');

        this.load.image('butcher','assets/butcher.png');
        this.load.image('character2','assets/character2.png');
        this.load.image('ortolan','assets/ortolan.png');
        this.load.image('fruiterer','assets/fruiterer.png');

        this.load.tilemapTiledJSON('map','assets/map.json');

        this.load.atlas('player', 'assets/player-sheet.png', 'assets/player-sheet.json')

        this.load.json('speeches', 'assets/speeches.json');
    }
    
    create() {
        // Add assets to the scene here

        const map = this.make.tilemap({key: 'map', tileWidth: 960, tileHeight: 480});

        const tilesetMarket = map.addTilesetImage('market','market');
        const tilesetObjects = map.addTilesetImage('objects','objects');
        const tilesetGround = map.addTilesetImage('ground','ground');

        const ground_layer = map.createLayer('ground', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const water_layer = map.createLayer('water', [tilesetMarket ,tilesetObjects, tilesetGround]);
        this.butcher = this.physics.add.sprite(180, 200, 'butcher').setScale(0.2).setImmovable();
        this.butcher.body.setSize(850, 730, true);
        this.ortolan = this.physics.add.sprite(480, 200, 'ortolan').setScale(0.2).setImmovable();
        this.ortolan.body.setSize(850, 730, true);
        this.fruiterer = this.physics.add.sprite(850, 200, 'fruiterer').setScale(0.2).setImmovable();
        this.fruiterer.body.setSize(850, 730, true);
        const stand_layer = map.createLayer('stand', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const stand_2_layer = map.createLayer('stand_2', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const stand_3_layer = map.createLayer('stand_3', [tilesetMarket ,tilesetObjects, tilesetGround]);     
        this.character2 = this.physics.add.sprite(520, 400, 'character2').setScale(0.2).setImmovable();

        this.player = this.physics.add.sprite(480, 450, 'player').setScale(3);
        this.player.body.setSize(6, 6, true);

        this.anims.create({key: 'up', frames: [{key: 'player', frame:'up1'},{key: 'player', frame:'up2'}, {key: 'player', frame:'up3'},{key: 'player', frame:'up4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'down', frames: [{key: 'player', frame:'down1'},{key: 'player', frame:'down2'}, {key: 'player', frame:'down3'},{key: 'player', frame:'down4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'right', frames: [{key: 'player', frame:'right1'},{key: 'player', frame:'right2'}, {key: 'player', frame:'right3'},{key: 'player', frame:'right4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'left', frames: [{key: 'player', frame:'left1'},{key: 'player', frame:'left2'}, {key: 'player', frame:'left3'},{key: 'player', frame:'left4'}], frameRate: 8, repeat: -1});
        

        this.player.setCollideWorldBounds(true);

        water_layer.setCollisionByExclusion([-1]);
        stand_layer.setCollisionByExclusion([-1]);
        stand_2_layer.setCollisionByExclusion([-1]);
        stand_3_layer.setCollisionByExclusion([-1]);

        this.physics.add.collider(this.player, water_layer);
        this.physics.add.collider(this.player, stand_layer);
        this.physics.add.collider(this.player, stand_2_layer);
        this.physics.add.collider(this.player, stand_3_layer);

        this.physics.add.collider(this.player, this.butcher, this.speech, null, this);
        this.physics.add.collider(this.player, this.character2, this.speech, null, this);
        this.physics.add.collider(this.player, this.ortolan, this.speech, null, this);
        this.physics.add.collider(this.player, this.fruiterer, this.speech, null, this);

        this.cursors = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(0, 0, 960, 480, true).zoomTo(
            1.5, //zoom distance   
            1000 // duration/speed of zoom
            );;
        this.cameras.main.startFollow(this.player);

        this.speeches = this.cache.json.get('speeches');
    }

    update() {
        // Every 16ms. Game logic here

        if(this.cursors.up.isDown) {
            this.player.play('up', true);
            this.player.setVelocityY(-100);
        }
        else if(this.cursors.down.isDown) {
            this.player.play('down', true);
            this.player.setVelocityY(100);
        }
        else if(this.cursors.right.isDown) {
            this.player.play('right', true);
            this.player.setVelocityX(100);
        }
        else if(this.cursors.left.isDown) {
            this.player.play('left', true)
            this.player.setVelocityX(-100);
        }
        else { this.player.stop(), this.player.setVelocity(0) }

        // Close the dialog on spacebar press
		if( this.gzDialog.visible) {
            this.player.setVelocity(0);
            this.player.stop();
            if(this.cursors.space.isDown ) 
                this.gzDialog.display(false);
        }


    }

    /**  
	 * Handle collisions with the script layer. Tiles which have a dialog response are given
	 * a 'name' property with a value that corresponds to a key in the script object found
	 * in speeches.js
     * @param {Phaser.Physics.Arcade.Sprite} player
     * @param {Phaser.Physics.Arcade.Sprite} npc
	 */
     speech(player, npc){
		if(!this.gzDialog.visible) {
            this.gzDialog.setText(this.speeches[npc.texture.key]);
		}
	}
}