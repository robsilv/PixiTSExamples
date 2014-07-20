class Example2A {

    aliens: Array<PIXI.Sprite>;
    alienContainer: PIXI.DisplayObjectContainer;
    alienFrames: Array<string>;
    count: number;

    stage: PIXI.Stage;
    renderer: PIXI.IPixiRenderer;

    public init() {
        // create an array of assets to load
        var assetsToLoad = ["SpriteSheet.json"];

        // create a new loader
        var loader = new PIXI.AssetLoader(assetsToLoad);

        // use callback
        loader.onComplete = this.onAssetsLoaded;

        //begin load
        loader.load();

        // holder to store aliens
        this.aliens = [];
        this.alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"];

        this.count = 0;

        // create an new instance of a pixi stage
        this.stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance.
        this.renderer = PIXI.autoDetectRenderer(800, 600);

        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);

        // create an empty container
        this.alienContainer = new PIXI.DisplayObjectContainer();
        this.alienContainer.position.x = 400;
        this.alienContainer.position.y = 300;

        this.stage.addChild(this.alienContainer);
    }

    private onAssetsLoaded = () => {
        // add a bunch of aliens with textures from image paths
        for (var i = 0; i < 100; i++) {
            var frameName = this.alienFrames[i % 4];

            // create an alien using the frame name..
            var alien = PIXI.Sprite.fromFrame(frameName);
           //alien.tint = Math.random() * 0xFFFFFF;

            /*
             * fun fact for the day :)
             * another way of doing the above would be
             * var texture = PIXI.Texture.fromFrame(frameName);
             * var alien = new PIXI.Sprite(texture);
             */
            alien.position.x = Math.random() * 800 - 400;
            alien.position.y = Math.random() * 600 - 300;
            alien.anchor.x = 0.5;
            alien.anchor.y = 0.5;
            this.aliens.push(alien);
            this.alienContainer.addChild(alien);
        }
    }

    public animate = () => {
        // just for fun, lets rotate mr rabbit a little
        for (var i = 0; i < this.aliens.length; i++) {
            var alien = this.aliens[i];
            alien.rotation += 0.1;
        }

        this.count += 0.01;
        this.alienContainer.scale.x = Math.sin(this.count);
        this.alienContainer.scale.y = Math.sin(this.count);

        this.alienContainer.rotation += 0.01;

        // render the stage
        this.renderer.render(this.stage);

        requestAnimFrame(this.animate);
    }
}

var example2A = new Example2A();
example2A.init();
example2A.animate();