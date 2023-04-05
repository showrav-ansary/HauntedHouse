'use strict';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';



/**
 * Base
 */

// Canvas to be rendered
const canvas = document.querySelector('.webgl');

// Window size
const size = {
    x: window.innerWidth,
    y: window.innerHeight
}

// Main camera for view
const mainCamera = new THREE.PerspectiveCamera(70, size.x/size.y);
mainCamera.position.set(5,15,15);

// Main scene
const scene = new THREE.Scene();
scene.add(mainCamera);

// Controls on the view for mouse movement
const orbitControls = new OrbitControls(mainCamera, canvas);
orbitControls.enableDamping = true;

// Debug
const debuGUI = new lil.GUI();



/**
 * Textures
 */

// Generic textureloader
const textureLoader = new THREE.TextureLoader();

// door
const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const doorDisplacementTexture = textureLoader.load('textures/door/displacement.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');

// wall
const wallColorTexture = textureLoader.load('textures/wall/color.jpg');
const wallAmbientOcclusionTexture = textureLoader.load('textures/wall/ambientOcclusion.jpg');
const wallDisplacementTexture = textureLoader.load('textures/wall/displacement.png'); 
const wallRoughnessTexture = textureLoader.load('textures/wall/roughness.jpg');
const wallNormalTexture = textureLoader.load('textures/wall/normal.jpg');

// window
const windowColorTexture = textureLoader.load('textures/window/color.jpg');
const windowAlphaTexture = textureLoader.load('textures/window/alpha.jpg');
const windowAmbientOcclusionTexture = textureLoader.load('textures/window/ambientOcclusion.jpg');
const windowDisplacementTexture = textureLoader.load('textures/window/displacement.png');
const windowMetalnessTexture = textureLoader.load('textures/window/metalness.jpg');
const windowRoughnessTexture = textureLoader.load('textures/window/roughness.jpg');
const windowNormalTexture = textureLoader.load('textures/window/normal.jpg');

// roof
const roofColorTexture = textureLoader.load('textures/roof/color.jpg');
const roofAmbientOcclusionTexture = textureLoader.load('textures/roof/ambientOcclusion.jpg');
const roofDisplacementTexture = textureLoader.load('textures/roof/displacement.png');
const roofRoughnessTexture = textureLoader.load('textures/roof/roughness.jpg');
const roofNormalTexture = textureLoader.load('textures/roof/normal.jpg');

roofColorTexture.repeat.set(8,1);
roofAmbientOcclusionTexture.repeat.set(8,1);
roofDisplacementTexture.repeat.set(8,1);
roofNormalTexture.repeat.set(8,1);
roofRoughnessTexture.repeat.set(8,1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
roofDisplacementTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofRoughnessTexture.wrapS = THREE.RepeatWrapping;

roofColorTexture.wrapT = THREE.RepeatWrapping;
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
roofDisplacementTexture.wrapT = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;
roofRoughnessTexture.wrapT = THREE.RepeatWrapping;


// floor
const floorColorTexture = textureLoader.load('textures/floor/color.jpg');
const floorAmbientOcclusionTexture = textureLoader.load('textures/floor/ambientOcclusion.jpg');
const floorDisplacementTexture = textureLoader.load('textures/floor/displacement.png');
const floorRoughnessTexture = textureLoader.load('textures/floor/roughness.jpg');
const floorNormalTexture = textureLoader.load('textures/floor/normal.jpg');

floorColorTexture.repeat.set(8,8);
floorAmbientOcclusionTexture.repeat.set(8,8);
floorDisplacementTexture.repeat.set(8,8);
floorNormalTexture.repeat.set(8,8);
floorRoughnessTexture.repeat.set(8,8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorRoughnessTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorRoughnessTexture.wrapT = THREE.RepeatWrapping;



/**
 * Renderer
 */

// WebGL
const webGLRenderer = new THREE.WebGLRenderer({
    canvas:canvas
});
webGLRenderer.shadowMap.enabled = true;
webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
webGLRenderer.setSize(size.x, size.y);
webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));



/**
 * Objects
 */

// Floor
const floorGeometry = new THREE.PlaneGeometry(30,30);
const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorAmbientOcclusionTexture,
    displacementMap: floorDisplacementTexture,
    normalMap: floorNormalTexture,
    roughnessMap: floorRoughnessTexture
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);

// House
const house = new THREE.Group();
scene.add(house);

const wallGeometry = new THREE.BoxGeometry(5,3,5);
const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallAmbientOcclusionTexture,
    normalMap: wallNormalTexture,
    roughnessMap: wallRoughnessTexture
});
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array, 2)
);
wall.position.y = 3/2;
house.add(wall);


const roofGeometry = new THREE.ConeGeometry(4, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofAmbientOcclusionTexture,
    normalMap: roofNormalTexture,
    roughness: roofRoughnessTexture,
    displacementMap: roofDisplacementTexture
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
);
roof.position.y = 3.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);


// Graves
const graves = new THREE.Group();



/**
 * Lights
 */

// Ambience
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);



/**
 * Functions
 */

// Window resize handling
window.addEventListener('resize', () => {
    // Update sizes
    size.x = window.innerWidth;
    size.y = window.innerHeight;

    // Update camera
    mainCamera.aspect = size.x / size.y;
    mainCamera.updateProjectionMatrix();

    // Update renderer
    webGLRenderer.setSize(size.x, size.y);
    webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Animating function
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    orbitControls.update();

    // Render
    webGLRenderer.render(scene, mainCamera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick();


/**
 * Debug UI
 */

// debuGUI.add