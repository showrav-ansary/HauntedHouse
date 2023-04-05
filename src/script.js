`use strict`;



import * as  THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lilgui from 'lil-gui';



/**
 * Base
*/
const scene = new THREE.Scene();
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl');



/**Renderer
 * 
 */
const webGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas
});

const updateRender = () => {
    webGLRenderer.setSize(size.width, size.height);
    webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
updateRender();



/**
 * Cameras
 */
const mainCamera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
mainCamera.position.set(4, 2, 5);
scene.add(mainCamera);



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();


// Door textures
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorDisplacementTexture = textureLoader.load('textures/door/displacement.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');


// Grass textures
const grassNormalTexture = textureLoader.load('textures/grass/normal.jpg');
const grassColorTexture = textureLoader.load('textures/grass/color.jpg');
const grassRoughnessTexture = textureLoader.load('textures/grass/roughness.jpg');
const grassAmbientOcclusion = textureLoader.load('textures/grass/ambientOcclusion.jpg');

// Bricks textures
const brickNormalTexture = textureLoader.load('textures/bricks/normal.jpg');
const brickColorTexture = textureLoader.load('textures/bricks/color.jpg');
const brickRoughnessTexture = textureLoader.load('textures/bricks/roughness.jpg');
const brickAmbientOcclusion = textureLoader.load('textures/bricks/ambientOcclusion.jpg');


/**
 * Objects
 */
const house = new THREE.Group();


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0xa9c386,
        transparent: true,
        map: grassColorTexture,
        aoMap: grassAmbientOcclusion,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
); 
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xffffff, 0.5);
moonLight.position.set(4, 5, - 2);
scene.add(moonLight);



/**
 * Window Resize
 */
window.addEventListener('resize', () => {
    // Take update the dimensions
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    // Update the perspective camera aspect
    mainCamera.aspect = size.innerWidth / size.innerHeight;
    mainCamera.updateProjectMatrix();

    // Update the pixel ratio
    updateRender();
});



/**
 * Orbit Controls
 */
const controls = new OrbitControls(mainCamera, canvas);
controls.enableDamping = true;



/**
 * Animation
 */
const animatingFunction = () => {
    // Update controls
    controls.update();

    // Render
    webGLRenderer.render(scene, mainCamera);

    // Call tick again on the next frame
    window.requestAnimationFrame(animatingFunction);
}
animatingFunction();




/**
 * Debugger
 */
const gui = new lilgui.GUI();


// Ambient Light
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambientlight Intensity');


// Moon light
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moonlight Intensity')
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001).name('Moonlight Position-X');
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001).name('Moonlight Position-Y');
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001).name('Moonlight Position-Z');