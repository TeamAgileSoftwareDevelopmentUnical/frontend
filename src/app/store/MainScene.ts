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

        const map = this.make.tilemap({key: 'map'});

        const tilesetMarket = map.addTilesetImage("market","market");
        const tilesetObjects = map.addTilesetImage("objects","objects");
        const tilesetGround = map.addTilesetImage('ground','ground');

        var ground_layer = map.createLayer('ground', [tilesetMarket ,tilesetObjects, tilesetGround]);
        var water_layer = map.createLayer('water', [tilesetMarket ,tilesetObjects, tilesetGround]);
        var stand_layer = map.createLayer('stand', [tilesetMarket ,tilesetObjects, tilesetGround]);
        var stand_2_layer = map.createLayer('stand_2', [tilesetMarket ,tilesetObjects, tilesetGround]);
        var stand_3_layer = map.createLayer('stand_3', [tilesetMarket ,tilesetObjects, tilesetGround]);

        //water_layer.setCollisionByExclusion([-1]);
        //stand_layer.setCollisionByExclusion([-1]);
        //stand_2_layer.setCollisionByExclusion([-1]);
        //stand_3_layer.setCollisionByExclusion([-1]);

        //this.player = this.add.sprite(480, 450, 'player').setScale(3);
        this.player = this.physics.add.sprite(480, 450, "player").setScale(3);

        this.anims.create({key: 'up', frames: [{key: 'player', frame:'up1'},{key: 'player', frame:'up2'}, {key: 'player', frame:'up3'},{key: 'player', frame:'up4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'down', frames: [{key: 'player', frame:'down1'},{key: 'player', frame:'down2'}, {key: 'player', frame:'down3'},{key: 'player', frame:'down4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'right', frames: [{key: 'player', frame:'right1'},{key: 'player', frame:'right2'}, {key: 'player', frame:'right3'},{key: 'player', frame:'right4'}], frameRate: 8, repeat: -1});
        this.anims.create({key: 'left', frames: [{key: 'player', frame:'left1'},{key: 'player', frame:'left2'}, {key: 'player', frame:'left3'},{key: 'player', frame:'left4'}], frameRate: 8, repeat: -1});
        
        this.physics.add.collider(this.player, water_layer);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // Every 16ms. Game logic here

        if(this.cursors.up.isDown) {
            this.player.play('up', true);
            this.player.y = this.player.y - 2;
        }
        else if(this.cursors.down.isDown) {
            this.player.play('down', true);
            this.player.y = this.player.y + 2;
        }
        else if(this.cursors.right.isDown) {
            this.player.play('right', true);
            this.player.x = this.player.x + 2;
        }
        else if(this.cursors.left.isDown) {
            this.player.play('left', true)
            this.player.x = this.player.x - 2;
        }
        else { this.player.stop() }

    }
}