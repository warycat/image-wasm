import("../pkg/index.js").catch(console.error).then((wasm) => {
    var change_button = document.getElementById("change");
    change_button.onclick = function (e) {
        console.log(e);
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = readerEvent => {
                var content = readerEvent.target.result;
                document.querySelector('#scream').src = content;
            }

        }
        input.click();
    }
    var buttons = document.getElementById("buttons");
    var filters = ["oceanic", "islands", "marine", "seagreen", "flagblue", "liquid", "diamante", "radio", "twenties", "rosetint", "mauve", "bluechrome", "vintage", "perfume", "serenity"];
    filters.forEach(filter => {
        var filter_button = document.createElement("button");
        filter_button.innerText = filter;
        buttons.appendChild(filter_button);
        filter_button.onclick = function (e) {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var img = document.getElementById("scream");
            ctx.drawImage(img, 0, 0);
            var imgData = ctx.getImageData(0, 0, c.width, c.height);
            ctx.putImageData(wasm.filter_image(imgData, filter), 0, 0);
            console.log(filter)
        }
    });
});

