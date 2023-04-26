'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gCurrColor

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'yellow'
        },
        {
            txt: ' Falafel',
            size: 10,
            align: 'left',
            color: 'red'
        }
    ]
}

function handleLine(){
    gMeme.lines.map
}

function switchLine(){

}

function decreaseTxt(){
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}



function increaseTxt(){
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



function drawText(text, x, y) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx]

    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.color
    gCtx.fillStyle = currLine.color
    gCtx.font = currLine.size + 'px Arial'
    gCtx.textAlign = currLine.align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function showMeme() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'none'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'flex'
}

