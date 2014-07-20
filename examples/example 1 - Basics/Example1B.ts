class Example1B {

    private renderer: PIXI.IPixiRenderer;
    private sprite: PIXI.Sprite;
    private stage: PIXI.Stage;

    public init() {
        this.stage = new PIXI.Stage(0x66FF99);

        this.renderer = PIXI.autoDetectRenderer(1024, 768, null, true, true);
        //this.renderer = PIXI.CanvasRenderer(1024, 768, null, true, true);
        document.body.appendChild(this.renderer.view);

        var imgUrl = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ski_trail_rating_symbol-blue_square.svg/600px-Ski_trail_rating_symbol-blue_square.svg.png';

        this.sprite = PIXI.Sprite.fromImage(imgUrl);
        this.sprite.position.x = 0;
        this.sprite.position.y = 0;
        this.sprite.pivot.x = this.sprite.width / 2
        this.sprite.pivot.y = this.sprite.height / 2;

        this.stage.addChild(this.sprite);
    }

    public animate = ():void => {
        requestAnimFrame(this.animate);

        this.sprite.rotation += 0.1;

        this.renderer.render(this.stage);
    }
}

var example1B = new Example1B();
example1B.init();
example1B.animate();