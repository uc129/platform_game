import { GRAVITY, scaleFactor } from "../main";
import { ctx, canvas } from "../main";
import { horizontalCollision, platformCollision, verticalCollision } from "../collisions";
import collision from "../collisions";
import Sprite from "./Sprite";

// import { groundBlocks } from "./collisionBlocks";
// console.log(groundBlocks);

class Player extends Sprite {

    constructor({ position, groundBlocks, platformBlocks, imgSrc, frameRate = 1, scale = 0.5, animations, camera }) {

        super({ imgSrc, frameRate, scale })

        this.GRAVITY = GRAVITY;
        this.scaleFactor = scaleFactor;
        this.camera = camera

        this.position = position
        this.groundBlocks = groundBlocks
        this.platformBlocks = platformBlocks

        this.BlockWidth = 16;


        this.velocity = {
            x: 0,
            y: 1
        }


        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },

            width: 10,
            height: 10

        }

        this.animations = animations;
        this.lastDirection = 'right';

        for (let key in this.animations) {

            const image = new Image();
            image.src = this.animations[key].imgSrc;

            this.animations[key].image = image

        }

        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height: 80

        }

    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 35,
                y: this.position.y + 26
            },
            width: 14,
            height: 27
        }

    }

    switchSprite(key) {

        if (this.image === this.animations[key].image || !this.loaded) return;
        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;
    }

    updateCameraBox() {

        this.cameraBox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y
            },
            width: 200,
            height: 80

        }

    }

    panCameraLeft() {
        this.cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;
        const scaledCanvasWidth = canvas.width / scaleFactor;

        if (this.cameraBoxRight >= 576) return; // 576 is the width of the background image

        if (this.cameraBoxRight >= scaledCanvasWidth + Math.abs(this.camera.position.x)) {
            console.log('panning left');
            this.camera.position.x -= this.velocity.x;
        }
    }


    panCameraRight() {

        if (this.cameraBox.position.x <= 0) return;



        if (this.cameraBox.position.x <= Math.abs(this.camera.position.x)) {
            console.log('panning right');
            this.camera.position.x -= this.velocity.x;
        }
    }


    panCameraDown() {

        if (this.cameraBox.position.y + this.velocity.y <= 0) return;

        if (this.cameraBox.position.y <= Math.abs(this.camera.position.y)) {
            console.log('panning down');
            this.camera.position.y -= this.velocity.y;
        }
    }


    panCameraUp() {

        if (this.cameraBox.position.y + this.velocity.y + this.cameraBox.height >= 432) return;

        const scaledCanvasHeight = canvas.height / scaleFactor;

        if (this.cameraBox.position.y + this.cameraBox.height >= Math.abs(this.camera.position.y) + scaledCanvasHeight) {
            console.log('panning up');
            this.camera.position.y -= this.velocity.y;
        }
    }



    update() {
        this.updateFrame()
        this.updateCameraBox()


        // ctx.fillStyle = 'rgba(255,0,255,0.5)';
        // ctx.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);

        // ctx.fillStyle = 'rgba(0,255,0,0.5)';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        // ctx.fillStyle = 'rgba(255,0,0,0.5)';
        // ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);


        this.checkBoundaries()

        this.draw();
        this.position.x += this.velocity.x;

        this.checkHorizontalCollision()
        this.checkPlatformCollision()

        this.applyGravity()
        this.updateHitBox()


        this.checkVerticalCollision()


    }

    checkVerticalCollision() {
        this.groundBlocks.map((block) => {
            if (collision({ player: this.hitBox, block })) {

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = block.position.y - offset - 0.01;
                    return
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y;
                    this.position.y = block.position.y + this.height - offset + 0.01;
                    return
                }

            }
        });


    }

    checkHorizontalCollision() {
        this.groundBlocks.map((block) => {
            // console.log(this.hitBox.position.x, this.position.x, this.hitBox.width, this.width);

            if (horizontalCollision({ player: this.hitBox, block })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    // const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;
                    // this.position.x = this.position.x + offset + 0.1;
                    return


                }


                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitBox.position.x - this.position.x;
                    this.position.x = block.position.x + this.BlockWidth / 4 - offset + 0.1;
                    return
                }

            }
        });
    }

    applyGravity() {
        this.velocity.y += GRAVITY;
        this.position.y += this.velocity.y;
    }



    checkPlatformCollision() {




        for (let i = 0; i < this.platformBlocks.length; i++) {
            const block = this.platformBlocks[i];
            const playerTop = this.hitBox.position.y;
            const playerBottom = this.hitBox.position.y + this.hitBox.height;
            const platformTop = block.position.y;
            const platformBottom = block.position.y + 4; // Assuming each platform is 4 pixels in height


            if (platformCollision({ player: this.hitBox, block })) {

                if (this.velocity.y > 0) {
                    console.log('platform collision');
                    this.velocity.y = 0;
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = block.position.y - offset + 0.1



                    return
                }


            }




        }

    }

    checkBoundaries() {
        if (this.hitBox.position.x + this.hitBox.width + this.velocity.x >= 576 || this.hitBox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
    }


}

export default Player;