export default class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    player;
    cursors;
    up;

    preload() {
        // Load all assets here

        this.load.image('ground','assets/ground.png');
        this.load.image('market','assets/market.png');
        this.load.image('objects','assets/objects.png');

        this.load.tilemapTiledJSON('map','assets/map.json');

        this.load.atlas('player', 'assets/player-sheet.png', 'assets/player-sheet.json')
    }
    
    create() {
        // Add assets to the scene here

        const map = this.make.tilemap({key: 'map', tileWidth: 960, tileHeight: 480});

        const tilesetMarket = map.addTilesetImage('market','market');
        const tilesetObjects = map.addTilesetImage('objects','objects');
        const tilesetGround = map.addTilesetImage('ground','ground');

        var ground_layer = map.createLayer('ground', [tilesetMarket ,tilesetObjects, tilesetGround]);
        var water_layer = map.createLayer('water', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const stand_layer = map.createLayer('stand', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const stand_2_layer = map.createLayer('stand_2', [tilesetMarket ,tilesetObjects, tilesetGround]);
        const stand_3_layer = map.createLayer('stand_3', [tilesetMarket ,tilesetObjects, tilesetGround]);

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

        this.cursors = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(0, 0, 960, 480, true).zoomTo(
            1.5, //zoom distance   
            1000 // duration/speed of zoom
            );;
        this.cameras.main.startFollow(this.player);

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

    }
}