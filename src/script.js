`use strict`;



import * as  THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lilgui from 'lil-gui';



/**
 * Utilty JS functions
 */
const random = (min, max) => (Math.random() * (max - min)) + min;


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


// House
const house = new THREE.Group();
scene.add(house);


const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: brickColorTexture,
        aoMap: brickAmbientOcclusion,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture
    })
);
walls.position.y = 1.25;
house.add(walls);


// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({
        color: 0xb35f45,
        transparent: true
    })
);
roof.position.y = 3;
roof.rotation.y = - Math.PI / 4;
house.add(roof);


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        transparent: true,
        map: doorColorTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementMap: doorDisplacementTexture,
        aoMap: doorAmbientOcclusionTexture,
        alphaMap: doorAlphaTexture,
        displacementScale: 0.1
    })
);
door.position.z = 2.001;
door.position.y = .95;
house.add(door);


// Bushes
const bushes = new THREE.Group();
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    color: 0x89c854
});



const bush = new THREE.Mesh(bushGeometry, bushMaterial);
bush.scale.set(0.2, 0.2, 0.2);
bush.position.set(1,0,2);
bushes.add(bush);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.2, 0.2, 0.2);
bush2.position.set(-1,0,2);
bushes.add(bush2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(1.5,0,2);
bushes.add(bush3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-1.5,0,2);
bushes.add(bush4);

house.add(bushes);



// Graves
const graves = new THREE.Group();

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    color: 0xb2b6b1
});

for (let i = 0; i < 50; i++){
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.sin(angle) * random(5, 10);
    const z = Math.cos(angle) * random(5, 10);

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x,0.3,z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
}
scene.add(graves);


// Floor
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