'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gCurrColor

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        // {
        //     txt: 'I sometimes eat Falafel',
        //     size: 20,
        //     align: 'center',
        //     color: 'yellow',
        //     posX: gElCanvas.width / 2,
        //     posY: gElCanvas.height / 2
        // }
        // {
        //     txt: ' Falafel',
        //     size: 10,
        //     align: 'left',
        //     color: 'red',
        //     pos: {x,y}

        // }
    ]
}





function switchLine() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    createFocus()
}

function getLines(){
    return gMeme.lines
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function createLine() {
    if (gMeme.lines.length > 2) return
    let positionX
    let positionY

    if (gMeme.lines.length === 0) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height / 2
    } else if (gMeme.lines.length === 1) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height / 4
        gMeme.selectedLineIdx++
    } else if (gMeme.lines.length === 2) {
        positionX = gElCanvas.width / 2
        positionY = gElCanvas.height * 0.75
        gMeme.selectedLineIdx++
    }

    const newLine = {
        txt: 'Write your text here',
        size: 20,
        align: 'center',
        color: 'yellow',
        posX: positionX,
        posY: positionY
    }

    gMeme.lines.push(newLine)
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



function drawText() {
    let lines = gMeme.lines
    lines.map((line) => {
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.color
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px Arial'
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
    })
}

function showMeme() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'none'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'flex'
}



