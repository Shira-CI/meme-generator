'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gCurrColor

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

function moveLine(dx, dy) {
    const line = getLine()
    // console.log('dx:', dx)
    // console.log('dy:', dy)
    line.posX += dx
    line.posY += dy
  }
  

function setLineDrag(isDrag) {
    const line = getLine()
    line.isDrag = isDrag
    // console.log(line)
  }



function deleteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx , 1)
    if (gMeme.selectedLineIdx === 0) return
    else gMeme.selectedLineIdx--
    // console.log('after' , gMeme)
}

function fontChange(value){
    const line = getLine()
    line.font = value
}

function moveUpTxt(){
    const line = getLine()
    // console.log(line)
    line.posY -= 5
}

function movedownTxt(){
    const line = getLine()
    // console.log(line)
    line.posY += 5

}


function alignText(value, canvasWidth) {
    if (value === 'left') gMeme.lines[gMeme.selectedLineIdx].posX = gMeme.lines[gMeme.selectedLineIdx].txtWidth / 2 + 12
    else if (value === 'right') gMeme.lines[gMeme.selectedLineIdx].posX = canvasWidth - gMeme.lines[gMeme.selectedLineIdx].txtWidth / 2 - 12
    else gMeme.lines[gMeme.selectedLineIdx].posX = canvasWidth / 2 
}



function switchLine() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    createFocus()
}

function getLines() {
    return gMeme.lines
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function createLine() {
    let positionX
    let positionY

    if (gMeme.lines.length === 0) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height / 4
    }  else if (gMeme.lines.length === 1) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height * 0.75
        gMeme.selectedLineIdx++
    } else if (gMeme.lines.length >= 2 ) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height / 2
        gMeme.selectedLineIdx++
    }
        
  
    const newLine = {
        txt: 'Write your text here',
        size: 20,
        align: 'center',
        color: 'white',
        font: 'Impact',
        stroke: 'black',
        posX: positionX,
        posY: positionY,
        isClicked: true,
        isDrag: false,
        txtWidth: 0
    }

    gMeme.lines.push(newLine)
    // updateTxtWidth()
    // console.log(gMeme)
}




function decreaseTxt() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}



function increaseTxt() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}


function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    // console.log(gMeme)
}


function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(userTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = userTxt
    // console.log(gMeme)
}

function getMeme() {
    return gMeme
}



function showMeme() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'none'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'flex'
}



