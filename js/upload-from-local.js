// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {

    loadImageFromInput(ev, renderImg)
}
// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
        setImg(100, img.src)
        showMeme()
        renderMeme()
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function setImg(id, src) {
    if (id === 100) {
        id = makeId();
        gImgs.push({ id, url: src, keywords: ['upload'] });
    }
    gMeme.selectedImgId = id;
}




