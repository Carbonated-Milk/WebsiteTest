
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const PI = 3.1415926

//SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30)
const originalAspect = window.innerWidth / window.innerHeight;

renderer.render(scene, camera);

//TORUS
// const geometry = new THREE.TorusGeometry(5 , .75, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0x09659D});
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus)

//LIGHT
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambiantLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambiantLight);

//Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(.01, .1), 24,24);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff })
    const star = new THREE.Mesh(geometry, material);

    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}

Array(1000).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('Space.jfif');
//scene.background = spaceTexture;

//Earth

const earthTexture = new THREE.TextureLoader().load('EarthMap.jpg');
const earthNormal = new THREE.TextureLoader().load('EarthNormal.tif');

const earth = new THREE.Mesh(   
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshBasicMaterial({
        map: earthTexture,
        normalMap: earthNormal,
    })
)
scene.add(earth);
earth.rotateX(.5);

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    camera.position.y = t * .01;
}

document.body.onscroll = moveCamera;
moveCamera();

//Animation Update

function animate() {
    requestAnimationFrame( animate );

    earth.rotateY(.001);

    renderer.render(scene, camera);
}

function onWindowResize() {
    var viewSize = 2;
    var aspect = window.innerWidth / window.innerHeight;
    var change = originalAspect / aspect;
    var newSize = viewSize * change;
    camera.left = -aspect * newSize / 2;
    camera.right = aspect * newSize  / 2;
    camera.top = newSize / 2;
    camera.bottom = -newSize / 2;
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    animate();
}

window.addEventListener('fullscreenchange', onWindowResize, false);
window.addEventListener('resize', onWindowResize, false);
animate();




