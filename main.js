import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( // (field of view, aspect ratio, view frustum)
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#backGround'),
})

renderer.setPixelRatio(window.devicePixelRatio) //set to window device pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) //setting to full screen canvas
camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)

//adding the torus
const geometry = new THREE.TorusGeometry(10, 4, 16, 50)
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

//the light of the donut
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
// scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// let controls = new OrbitControls(camera, renderer.domElement)

//adding stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

//space background
const spaceTexture = new THREE.TextureLoader().load(
  'https://images.pexels.com/photos/957085/milky-way-starry-sky-night-sky-star-957085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
)
scene.background = spaceTexture

//moon
const moonTexture = new THREE.TextureLoader().load(
  'https://mattloftus.github.io/images/moon_texture.jpg'
)
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)
scene.add(moon)

moon.position.z = 35
moon.position.setX(-10)

//earth
const earthPicture = new THREE.TextureLoader().load(
  'https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg'
)
const earthCloudTexture = new THREE.TextureLoader().load(
  'https://1.bp.blogspot.com/-puWLaF31coQ/Ukb49iL_BgI/AAAAAAAAK-k/mI7c24mkpj8/s640/fair_clouds_8k.jpg'
)

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 30, 30),
  new THREE.MeshStandardMaterial({
    map: earthPicture,
    normalMap: earthCloudTexture,
  })
)
scene.add(earth)
earth.position.z = 50
earth.position.setX(-20)

function UserScroll() {
  const top = document.body.getBoundingClientRect().top //top property (how far we are from the webpage)
  moon.rotation.x += 0.01
  moon.rotation.y += 0.1
  moon.rotation.z += 0.01

  camera.position.z = top * -0.01
  camera.position.x = top * -0.0002
  camera.rotation.y = top * -0.0002
}

document.body.onscroll = UserScroll
UserScroll()

//making things move
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01 //making it rotate automatically
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  moon.rotation.x += 0.005

  earth.rotation.y += 0.01

  // controls.update()

  renderer.render(scene, camera)
}

animate()
