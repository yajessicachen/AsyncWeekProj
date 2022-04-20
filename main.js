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

//space background
const spaceTexture = new THREE.TextureLoader().load(
  'https://images.pexels.com/photos/957085/milky-way-starry-sky-night-sky-star-957085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
)
scene.background = spaceTexture

//the light
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

//adding the torus
const geometry = new THREE.TorusGeometry(10, 4, 16, 50)
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

//Sun
const sunPicture = new THREE.TextureLoader().load(
  'https://upload.wikimedia.org/wikipedia/commons/a/a4/Solarsystemscope_texture_8k_sun.jpg'
)
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 100, 100),
  new THREE.MeshStandardMaterial({
    map: sunPicture,
  })
)
scene.add(sun)
sun.position.z = 35
sun.position.setX(-10)

//mercury
const mercuryPicture = new THREE.TextureLoader().load(
  'https://www.x3dom.org/x3dom/example/texture/solarSystem/Mercury.jpg'
)

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryPicture,
  })
)
scene.add(mercury)

mercury.position.z = 53
mercury.position.setX(-10)

//venus
const venusPicture = new THREE.TextureLoader().load(
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e3c8c32-7b34-4fa5-9c43-b50563b20795/d5y0655-f40c5831-fa9b-4f7c-9a5e-77122333fea8.jpg/v1/fill/w_1024,h_512,q_75,strp/venus_surface_texture_by_abdullahwaqar8_d5y0655-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvMGUzYzhjMzItN2IzNC00ZmE1LTljNDMtYjUwNTYzYjIwNzk1XC9kNXkwNjU1LWY0MGM1ODMxLWZhOWItNGY3Yy05YTVlLTc3MTIyMzMzZmVhOC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.OWHRHlW1dr2D1XRb5DGPNIV_cH0kSCKOk7UbSeS7wEY'
)

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusPicture,
  })
)
scene.add(venus)

venus.position.z = 63
venus.position.setX(-10)

//moon
const moonTexture = new THREE.TextureLoader().load(
  'https://mattloftus.github.io/images/moon_texture.jpg'
)
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)
scene.add(moon)

moon.position.z = 73
moon.position.setX(-17)

//earth
const earthPicture = new THREE.TextureLoader().load(
  'https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg'
)
const earthCloudTexture = new THREE.TextureLoader().load(
  'https://1.bp.blogspot.com/-puWLaF31coQ/Ukb49iL_BgI/AAAAAAAAK-k/mI7c24mkpj8/s640/fair_clouds_8k.jpg'
)

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 30, 30),
  new THREE.MeshStandardMaterial({
    map: earthPicture,
    normalMap: earthCloudTexture,
  })
)
scene.add(earth)
earth.position.z = 75
earth.position.setX(-10)

function UserScroll() {
  const top = document.body.getBoundingClientRect().top //top property (how far we are from the webpage)
  moon.rotation.x += 0.01
  moon.rotation.y += 0.1
  moon.rotation.z += 0.01

  camera.position.z = top * -0.01
  camera.position.x = top * -0.0002
  camera.rotation.y = top * -0.0003
}

document.body.onscroll = UserScroll
UserScroll()

//making things move
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01 //making it rotate automatically
  torus.rotation.y += 0.005
  // torus.rotation.z += 0.01

  sun.rotation.x += 0.01 //making it rotate automatically
  sun.rotation.y += 0.005
  sun.rotation.z += 0.01

  mercury.rotation.y += 0.005
  mercury.rotation.z += 0.01

  venus.rotation.y += 0.003
  venus.rotation.z += 0.02
  venus.rotation.y += 0.005

  moon.rotation.x += 0.005

  earth.rotation.y += 0.01

  // controls.update()

  renderer.render(scene, camera)
}

animate()
