
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0, 1000 );

camera.updateProjectionMatrix()
camera.position.z = 100;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

var ambient = new THREE.AmbientLight( 0xffffff )
scene.add(ambient);

document.body.appendChild( renderer.domElement );

var render = function () {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

render();
