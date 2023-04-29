'use strict'


function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onFlexibleBtn() {
    gMeme = createRandomMeme(gElCanvas)
    renderMeme()
    showMeme()
}

function onSetFilter(keyWord) {
    filterUpdate(keyWord)
    renderGallery()
}

function OnGalleryBtn() {
    showGallery()
}

function showGallery() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'grid'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'none'

    const elSavedContainer = document.querySelector('.main-saved-page')
    elSavedContainer.style.display = 'none'
}

function renderGallery() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    const imgs = getImgs()

    let strHTML = ''
    imgs.map((img) => {
        strHTML += `
  <div class="card">
    <img src="${img.url}" alt="meme" class="grid-btn" onclick="onImgSelect(${img.id})">
    </div>`
    })
    elGalleryContainer.innerHTML = strHTML
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
    showMeme()
}