import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      } else {
          entry.target.classList.remove('show');
      }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));


// Scene
const scene = new THREE.Scene();

// Add a cube to the scene
//const geometry = new THREE.BoxGeometry(3, 1, 3);
//const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
//const mesh = new THREE.Mesh(geometry, material);
//mesh.position.set(0, 0, 0);
//scene.add(mesh);


// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(10, 20, 0); // x, y, z
// scene.add(directionalLight);

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  canvas: document.querySelector('#c') 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
//renderer.render(scene, camera);



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.00002;
  camera.position.y = t * -0.00002;
}

document.body.onscroll = moveCamera



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff , emissive: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const starLight = new THREE.PointLight(0xffffff, 0.005);
  

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  starLight.position.set(x, y, z);
  scene.add(star);
  scene.add(starLight);
}

Array(75).fill().forEach(addStar);



const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
//scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.005;
  // mesh.rotation.z += 0.01;
  
  controls.update();

  renderer.render(scene, camera);


}

animate();

// Add it to HTML
//document.body.appendChild(renderer.domElement);