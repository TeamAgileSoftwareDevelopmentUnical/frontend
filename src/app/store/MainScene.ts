export default class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        // Load all assets here
        this.load.tilemapTiledJSON('map', '../assets/map.json')
    }

    create() {
        // Add assets to the scene here
        const map = this.make.tilemap({ key: 'map', tileWidth: 60, tileHeight: 30})
        
    }

    update() {
        // Every 16ms. Game logic here
    }
}