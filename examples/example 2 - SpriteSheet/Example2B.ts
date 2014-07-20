class Example2B {

    aliens: Array<PIXI.Sprite>;
    alienContainer: PIXI.DisplayObjectContainer;
    alienFrames: Array<string>;
    count: number;

    movie: PIXI.MovieClip;

    stage: PIXI.Stage;
    renderer: PIXI.IPixiRenderer;

    public init() {
        // create an array of assets to load
        var assetsToLoad = ["fighter.json"];

        // create a new loader
        var loader = new PIXI.AssetLoader(assetsToLoad);

        // use callback
        loader.onComplete = this.onAssetsLoaded;

        //begin load
        loader.load();

        // holder to store aliens
        this.aliens = [];

        this.count = 0;

        // create an new instance of a pixi stage
        this.stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance.
        //	renderer = PIXI.autoDetectRenderer(800, 600);
        this.renderer = new PIXI.CanvasRenderer(800, 600);

        // add the renderer view element to the DOM
        document.body.appendChild(this.renderer.view);

        // create an empty container
        this.alienContainer = new PIXI.DisplayObjectContainer();
        this.alienContainer.position.x = 400;
        this.alienContainer.position.y = 300;

        this.stage.addChild(this.alienContainer);
    }

    private onAssetsLoaded = () => {
        // create a texture from an image path
        // add a bunch of aliens
        var frames = [];

        for (var i = 0; i < 30; i++) {
            var val = i < 10 ? "0" + i : i.toString();
            frames.push(PIXI.Texture.fromFrame("rollSequence00" + val + ".png"));
        };

        this.movie = new PIXI.MovieClip(frames);

        this.movie.position.x = 300;
        this.movie.position.y = 300;

        this.movie.anchor.x = this.movie.anchor.y = 0.5;
        this.movie.play();
        this.movie.animationSpeed = 0.5;
        this.stage.addChild(this.movie);
    }

    public animate = () => {
        if (this.movie) {
            this.movie.rotation += 0.01;
        }

        // render the stage
        this.renderer.render(this.stage);

        requestAnimFrame(this.animate);
    } 
}

var example2B = new Example2B();
example2B.init();
example2B.animate();