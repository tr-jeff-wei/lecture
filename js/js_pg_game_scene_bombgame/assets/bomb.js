class Bomb {

    static EXPLODE_RANGE = 100;
    static EXPLODE_DURATION = -2;

    constructor(sx, sy, img, timer_setup, song) {

        this.sx = sx;
        this.sy = sy;
        this.img = img;
        this.bomb_timer = timer_setup;

        this.explode = false;
        this.r = 0;

        this.song = song;


    }

    show() {

        if (frameCount % 50 == 0) {
            this.bomb_timer--;
        }

        if (this.bomb_timer > Bomb.EXPLODE_DURATION) {
            imageMode(CENTER);
            image(this.img, this.sx, this.sy, 32, 32);
            imageMode(CORNER);
        }
        if (this.bomb_timer >= 0) {
            noStroke();
            fill(240, 0, 0);
            textSize(12);
            text(this.bomb_timer, this.sx + 10, this.sy);
        }



        if (this.bomb_timer < 0 && this.bomb_timer > Bomb.EXPLODE_DURATION) {
            if (this.song != null) {
                this.song.play();
                this.song = null;
            }
            fill(255, 0, 0, 50);
            circle(this.sx, this.sy, this.r);
            this.r += 10;
            if (this.r > Bomb.EXPLODE_RANGE) {
                this.r = 0;
            }

        }

    }
}