function verticalCollision({
    player,
    block
}) {

    return (
        player.position.y + player.height >= block.position.y
        && player.position.y <= block.position.y + block.height
        // player.position.x <= block.position.x + block.width &&
        // player.position.x + player.width >= block.position.x
    )

}



function horizontalCollision({
    player,
    block
}) {

    // let blockWidth = 32;

    // console.log('horizontal collision- player position.x, block', player.position.x, block.position.x, block.width)


    return (
        // player.position.y + player.height >= block.position.y &&
        // player.position.y <= block.position.y + block.height &&



        player.position.x <= block.position.x + block.width
        && player.position.x + player.width >= block.position.x
    )

}


function collision({ player, block }) {
    let vert = verticalCollision({ player, block }) && horizontalCollision({ player, block })
    let hor = horizontalCollision({ player, block })

    return vert && hor
}

function platformCollision({
    player,
    block }) {

    return (
        player.position.y + player.height >= block.position.y &&
        player.position.y + block.height <= block.position.y + block.height &&
        player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x
    )


}



// function platformCollision({ player, block }) {
//     // Calculate the top and bottom positions of the player and platform.
//     const playerTop = player.position.y;
//     const playerBottom = player.position.y + player.height;
//     const platformTop = block.position.y;
//     const platformBottom = block.position.y + 4; // Assuming each platform is 4 pixels in height

//     // Check if there is a vertical overlap between player and platform.
//     if (playerBottom >= platformTop && playerTop <= platformBottom) {
//         return true
//         // Calculate the left and right positions of the player and platform.
//         // const playerLeft = player.position.x;
//         // const playerRight = player.position.x + player.width;
//         // const platformLeft = block.position.x;
//         // const platformRight = block.position.x + block.width; // Adjust for the platform width

//         // // Check if there is a horizontal overlap between player and platform.
//         // if (playerRight >= platformLeft && playerLeft <= platformRight) {
//         //     // There is a collision.
//         //     return true;
//         // }
//     }

//     // No collision detected.
//     return false;
// }



export { verticalCollision, horizontalCollision, platformCollision }
export default collision;
