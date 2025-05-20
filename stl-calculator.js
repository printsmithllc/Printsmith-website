function calculateMaterialAndCost(stlData, fileName) {
    const loader = new THREE.STLLoader();
    loader.load(URL.createObjectURL(new Blob([stlData])), function(geometry) {
        // Calculate volume (in cubic mm)
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const dimensions = {
            x: box.max.x - box.min.x,
            y: box.max.y - box.min.y,
            z: box.max.z - box.min.z
        };
        // Simplified volume calculation (assumes solid model)
        const volume = dimensions.x * dimensions.y * dimensions.z;
        const materialCost = volume * 0.20; // $0.20 per cubic mm

        document.getElementById('result').innerHTML = `
            <p>File: ${fileName}</p>
            <p>Dimensions: ${dimensions.x.toFixed(2)} x ${dimensions.y.toFixed(2)} x ${dimensions.z.toFixed(2)} mm</p>
            <p>Estimated Material Volume: ${volume.toFixed(2)} cubic mm</p>
            <p>Estimated Cost: $${materialCost.toFixed(2)}</p>
        `;
    });
}

function renderSTL(stlData) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 256);
    document.getElementById('viewer').innerHTML = '';
    document.getElementById('viewer').appendChild(renderer.domElement);

    const loader = new THREE.STLLoader();
    loader.load(URL.createObjectURL(new Blob([stlData])), function(geometry) {
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 200 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 100;
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    });
}