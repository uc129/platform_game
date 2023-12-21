import './style.css'
import Player from './Objects/Player.js'
import Sprite from './Objects/Sprite.js'


import { groundBlocks, platformBlocks, lights } from './Objects/collisionBlocks.js'



export const canvas = document.querySelector('#canvas');
export const GRAVITY = 0.1;
export const ctx = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;

export const scaleFactor = 3;

const scaledCanvas = {
    // width: canvas.width / 3,
    // height: canvas.height / 3

    width: canvas.width / scaleFactor,
    height: canvas.height / scaleFactor


}

const camera = {
    position: {
        x: 0,
        y: -432 + scaledCanvas.height //432 is the height of the background image
    }
}


const player1 = new Player({
    position: { x: 210, y: 0 },
    groundBlocks,
    platformBlocks,
    imgSrc: './img/warrior/Idle.png',
    frameRate: 8,
    camera,

    animations: {
        idle: {
            imgSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 7

        },
        run: {
            imgSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 7
        },
        jump: {
            imgSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3
        },
        fall: {
            imgSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3
        },
        fallLeft: {
            imgSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3
        },
        runLeft: {
            imgSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5
        },
        idleLeft: {
            imgSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 5
        },
        jumpLeft: {
            imgSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3
        }
    }


});



const background = new Sprite({
    position: { x: 0, y: 0 },
    imgSrc: './img/background.png',
})



const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}


window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'ArrowUp': case 'w':
            player1.velocity.y = -2
            break;

        case 'ArrowLeft': case 'a':
            keys.a.pressed = true
            break;

        case 'ArrowRight': case 'd':
            keys.d.pressed = true
            break;
    }
})

window.addEventListener('keyup', (e) => {

    switch (e.key) {
        case 'ArrowLeft': case 'a':
            keys.a.pressed = false
            break;
        case 'ArrowRight': case 'd':
            keys.d.pressed = false
            break;
    }
})



function animate() {
    if (canvas.width > 0) {
        window.requestAnimationFrame(animate);
    }
    else return

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);


    //save and restore are used 
    ctx.save();

    ctx.scale(scaleFactor, scaleFactor);
    ctx.translate(camera.position.x, camera.position.y);
    background.update();
    groundBlocks.forEach((block) => block.update())
    lights.forEach((light) => light.update())
    platformBlocks.forEach((block) => block.update())
    player1.update();


    player1.velocity.x = 0


    if (keys.d.pressed) {
        player1.switchSprite('run')
        player1.velocity.x = 1;
        player1.lastDirection = 'right'
        player1.panCameraLeft()
    }

    else if (player1.velocity.y === 0) {

        if (player1.lastDirection === 'right') player1.switchSprite('idle')
        else player1.switchSprite('idleLeft')
    }


    else if (keys.a.pressed) {
        player1.switchSprite('runLeft')
        player1.velocity.x = -3;
        player1.lastDirection = 'left'
        player1.panCameraRight()
    }

    else if (player1.velocity.y < 0) {
        player1.panCameraDown()
        if (player1.lastDirection === 'right') player1.switchSprite('jump')
        else player1.switchSprite('jumpLeft')
    }
    else if (player1.velocity.y > 0) {
        player1.panCameraUp()
        if (player1.lastDirection === 'right') player1.switchSprite('fall')
        else player1.switchSprite('fallLeft')

    }




    ctx.restore()


}

animate()



