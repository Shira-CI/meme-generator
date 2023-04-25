'use strict'

const gElCanvas = document.querySelector('#my-canvas')
const gCtx = gElCanvas.getContext('2d')
console.log('gCtx' , gCtx)
renderMeme()



function renderMeme(){
    drawImg()
    console.log(gMeme.lines[0].txt)
    drawText(gMeme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 2)
}


  

