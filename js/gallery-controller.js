'use strict'

function renderGallery() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    // console.log(elGalleryContainer)
    const imgs = getImgs()
    // console.log(imgs)
    let strHTML = ''
    imgs.map((img) => {
      strHTML += `
  <div class="card">
    <img src="${img.url}" alt="meme" class="grid-btn" onclick="onImgSelect(${img.id})">
    </div>
    `
    // console.log(strHTML)
    })

    elGalleryContainer.innerHTML = strHTML
}

function onImgSelect(id){
    setImg(id)
    renderMeme()
    showMeme()
}