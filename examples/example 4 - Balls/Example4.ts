class Example4 {

    //	Globals, globals everywhere and not a drop to drink
    w = 1024;
    h = 768;
    starCount = 2500;
    sx = 1.0 + (Math.random() / 20);
    sy = 1.0 + (Math.random() / 20);
    slideX = this.w / 2;
    slideY = this.h / 2;
    stars = [];
    renderer;
    stage;

    public init() {
        $(window).resize(this.resize)
	   // window.onorientationchange = resize;

       // document.addEventListener('DOMContentLoaded', this.start, false);
    }
  
    public start() {
        var ballTexture = PIXI.Texture.fromImage("assets/bubble_32x32.png");
        this.renderer = PIXI.autoDetectRenderer(this.w, this.h);
        this.stage = new PIXI.Stage(0x000000);

        document.body.appendChild(this.renderer.view);

        for (var i = 0; i < this.starCount; i++) {
            var tempBall = new PIXI.Sprite(ballTexture);

            tempBall.position.x = (Math.random() * this.w) - this.slideX;
            tempBall.position.y = (Math.random() * this.h) - this.slideY;
            tempBall.anchor.x = 0.5;
            tempBall.anchor.y = 0.5;

            this.stars.push({ sprite: tempBall, x: tempBall.position.x, y: tempBall.position.y });

            this.stage.addChild(tempBall);
        }

        document.getElementById('rnd').onclick = this.newWave;
        document.getElementById('sx').innerHTML = 'SX: ' + this.sx + '<br />SY: ' + this.sy;

        this.resize();

        requestAnimFrame(this.update);
    }

    private newWave() {
        this.sx = 1.0 + (Math.random() / 20);
        this.sy = 1.0 + (Math.random() / 20);
        document.getElementById('sx').innerHTML = 'SX: ' + this.sx + '<br />SY: ' + this.sy;
    }

    public resize() {
        this.w = $(window).width() - 16;
        this.h = $(window).height() - 16;

        this.slideX = this.w / 2;
        this.slideY = this.h / 2;

        this.renderer.resize(this.w, this.h);
    }

    public update = () => {
        for (var i = 0; i < this.starCount; i++) {
            this.stars[i].sprite.position.x = this.stars[i].x + this.slideX;
            this.stars[i].sprite.position.y = this.stars[i].y + this.slideY;
            this.stars[i].x = this.stars[i].x * this.sx;
            this.stars[i].y = this.stars[i].y * this.sy;

            if (this.stars[i].x > this.w) {
                this.stars[i].x = this.stars[i].x - this.w;
            }
            else if (this.stars[i].x < -this.w) {
                this.stars[i].x = this.stars[i].x + this.w;
            }

            if (this.stars[i].y > this.h) {
                this.stars[i].y = this.stars[i].y - this.h;
            }
            else if (this.stars[i].y < -this.h) {
                this.stars[i].y = this.stars[i].y + this.h;
            }
        }

        this.renderer.render(this.stage);

        requestAnimFrame(this.update);
    } 
}

var example4 = new Example4();
example4.init();
example4.start();
//example4.update();