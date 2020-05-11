import("../pkg/index.js").catch(console.error).then((wasm) => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    ctx.putImageData(wasm.grey(imgData), 0, 0);
});

