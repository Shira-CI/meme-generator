'use strict'

let gCtx=''
let gElCanvas=''


function onInit() {
     gElCanvas = document.querySelector('#my-canvas')
     gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}



function onSwitchLine(){

}


function onDecreaseTxt(){
    decreaseTxt()
    renderMeme()

}

function onIncreaseTxt(){
    increaseTxt()
    renderMeme()

}


function onColorPick(color){
    // console.log(color)
    setColor(color)
    renderMeme()
}

function onTxt(txt){
    // console.log(txt)
    setLineTxt(txt)
    renderMeme()
}

function renderMeme() {
    const elImg = new Image()
    elImg.src = gImgs[gMeme.selectedImgId].url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        let currMeme = getMeme()
        drawText(currMeme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 2)
    }
}



