class Example3 {

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
        var explosions = [];

        var count = 0;

        // create an new instance of a pixi stage
        this.stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance.
        this.renderer = PIXI.autoDetectRenderer(800, 600);

        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);
    }

    private onAssetsLoaded = () => {
        // create an array to store the textures
        var explosionTextures = [];

        for (var i = 0; i < 26; i++) {
            var texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
            explosionTextures.push(texture);
        };

        for (var i = 0; i < 50; i++) {
            // create an explosion MovieClip
            var explosion = new PIXI.MovieClip(explosionTextures);

            explosion.position.x = Math.random() * 800;
            explosion.position.y = Math.random() * 600;
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;

            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5;

            explosion.gotoAndPlay(Math.random() * 27);

            this.stage.addChild(explosion);
        }
    }

    public animate = () => {
        this.renderer.render(this.stage);

        requestAnimFrame(this.animate);
    } 
}

var example3 = new Example3();
example3.init();
example3.animate();