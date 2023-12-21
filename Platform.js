import { ctx } from './main.js';

class Platform {

    constructor({ position, height = 4, width = 16 }) {
        this.position = position;
        this.height = height;
        this.width = width;
    }

    draw() {
        // ctx.fillStyle = 'rgba(100,0,0,0.5)';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }

}

export default Platform