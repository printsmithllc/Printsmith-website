document.getElementById('stlFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.stl')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            calculateMaterialAndCost(contents, file.name);
            renderSTL(contents);
        };
        reader.readAsArrayBuffer(file);
    } else {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please upload a valid STL file.</p>';
    }
});