import layers from '../map/map_layers.js'
import Ground from './Ground.js'
import Light from './Lights.js'
import Platform from './Platform.js'


const groundObjects = layers.find((layer) => layer.name === 'ground').objects;
const platformObjects = layers.find((layer) => layer.name === 'platforms').objects;
const lightsObjects = layers.find((layer) => layer.name === 'lights').objects;



const groundBlocks = []
groundObjects.map((object) => {
    const { x, y, width, height } = object
    const block = new Ground({ position: { x, y }, width, height })
    groundBlocks.push(block)
})


const platformBlocks = []
platformObjects.map((object) => {
    const { x, y, width, height } = object
    const block = new Platform({ position: { x, y }, width, height: 4 })
    platformBlocks.push(block)
})


const lights = [];
lightsObjects.map((object) => {
    let { x, y, width, height } = object
    x = x + 3;
    y = y + 2;
    const light = new Light({ position: { x, y }, width: 8, height: 8 })
    lights.push(light)

})


export { groundBlocks, platformBlocks, lights }