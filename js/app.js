import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

export default class Sketch{
    constructor(options){
        this.time = 0;
        this.container = options.dom;

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // SETUP
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.01, 10);
        this.camera.position.z = 1;
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();

        this.container.appendChild( this.renderer.domElement );

        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }

    setupResize(){
        window.addEventListener('resize', this.resize.bind(this));
    }

    /**
     * Resize the canvas and it's content in regards to the viewport dimensions
     */
    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects(){
        this.geometry = new THREE.PlaneGeometry(.5,.5, 50, 50);
        this.material = new THREE.MeshNormalMaterial();

        this.material = new THREE.ShaderMaterial({
            side : THREE.DoubleSide,
            fragmentShader : fragment,
            vertexShader : vertex,
            wireframe : true
        })

        this.mesh = new THREE.Mesh(this.geometry,this.material);
        this.scene.add(this.mesh);
    }

    render(){
        // this.time += 0.05;
        this.mesh.rotation.x = this.time/2000;
        this.mesh.rotation.y = this.time/1000;
    
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom : document.getElementById('container')
});