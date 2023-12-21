import { ctx } from '../main.js';

class Sprite {

    constructor({ position, imgSrc, frameRate = 1, frameBuffer = 7, scale = 1 }) {

        this.position = position;
        this.image = new Image();
        this.frameRate = 0;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.scale = scale;
        this.image.src = imgSrc;
        this.loaded = false;

        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.loaded = true;
        }


    }

    draw() {
        if (!this.image) return;

        const cropBox = {
            position: {
                x: this.currentFrame * this.image.width / this.frameRate,
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        }


        ctx.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height

        )
    }

    update() {
        this.draw();
    }

    updateFrame() {
        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer == 0) {

            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++

            }
            else {
                this.currentFrame = 0;
            }
        }



    }

}

export default Sprite;