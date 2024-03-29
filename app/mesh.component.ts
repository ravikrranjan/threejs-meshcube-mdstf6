import { Component, ViewChild, ElementRef } from '@angular/core';

declare const THREE: any;

@Component({
  selector: 'mesh',
  template: `<div #rendererContainer></div>`,
  styles: []
})
export class MeshComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.controls = new THREE.OrbitControls(this.camera);    
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();
    
    this.createMesh();

    this.animate();
  }

  configCamera() {
    this.camera.position.set(300, 300, 300);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.margin = "auto";
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan  = false;
    this.controls.update();
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
