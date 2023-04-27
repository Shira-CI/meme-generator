'use strict'

let gCtx = ''
let gElCanvas = ''


function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    createLine()
    renderMeme()
    renderGallery()
    addListeners()
}


function onDeleteLine(){
    deleteLine()
}


function onFontChange(value){
    fontChange(value)
    renderMeme()
}

function onAlignBtn(value) {
    alignText(value , gElCanvas.width)
    drawText()
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    // Listen for resize ev
    // window.addEventListener('resize', () => {
    //   onInit()
    // })
}

function checkPos(pos) {
    const meme = getMeme()
    const lines = getLines()
    if (!lines.length) return
    // console.log(lines)

    const lineIdx = lines.findIndex(line => {
        const minX = line.posX - (gCtx.measureText(line.txt).width) / 2 - 10
        const maxX = line.posX + (gCtx.measureText(line.txt).width) / 2 + 10
        const minY = line.posY - 20
        const maxY = line.posY + 20
        return pos.x > minX && pos.x < maxX && pos.y > minY && pos.y < maxY
    })
    // console.log(lineIdx)
    if (lineIdx === -1) {
        meme.lines[meme.selectedLineIdx].isClicked = false
        resetTextBox()
        renderMeme()
    } else {
        meme.lines[meme.selectedLineIdx].isClicked = true
        meme.selectedLineIdx = lineIdx
        createFocus()
        updateTextBox()
        renderMeme()
    }
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log(pos)
    checkPos(pos)
    // console.log('pos:', pos)
    // if (!isCircleClicked(pos)) return

    // console.log('Down')
    // setCircleDrag(true)
    //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    console.log('pos:', pos)
    // Check if its a touch ev
    // if (TOUCH_EVS.includes(ev.type)) {
    //   //soo we will not trigger the mouse ev
    //   ev.preventDefault()
    //   //Gets the first touch point
    //   ev = ev.changedTouches[0]
    //   //Calc the right pos according to the touch screen
    //   // console.log('ev.pageX:', ev.pageX)
    //   // console.log('ev.pageY:', ev.pageY)
    //   pos = {
    //     x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //     y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //   }
    //   // console.log('pos:', pos)
    // }
    return pos
}


function drawText() {
    let lines = gMeme.lines
    lines.map((line) => {
   
        gCtx.lineWidth = 1
        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'middle'

        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
    })
}


function createFocus() {
    const line = getLine()
    // console.log(line)

    if (!line) return
    if (!line.isClicked) return
    
    const txtWidth = gCtx.measureText(line.txt).width
    line.txtWidth = txtWidth

    gCtx.beginPath()
    gCtx.rect(
        line.posX - line.txtWidth / 2 -10,
        line.posY - 20,
        line.txtWidth +20,
        line.size + 20
    );
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.closePath();
}


function onAddLine() {
    createLine()
    resetTextBox()
    renderMeme()
    //להוסיף תנאי כשמגיעים ל3 שורות יופיע מודל שאומר הגעת למקסימום
}

function renderMeme() {

    const elImg = new Image()
    elImg.src = gImgs[gMeme.selectedImgId].url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        // let currMeme = getMeme()
        drawText()

        createFocus()
        // drawText(currMeme.lines[0].txt, , gElCanvas.height / 2)
    }
}

function OnEditorBtn() {
    showMeme()
}

function updateTextBox() {
    let currLine = getLine()
    let elTextBox = document.querySelector('.text-box')
    // console.log(elTextBox)
    elTextBox.value = currLine.txt
}

function resetTextBox() {
    // let currLine = getLine()
    let elTextBox = document.querySelector('.text-box')
    // console.log(elTextBox)
    elTextBox.value = ''
}


function onSwitchLine() {
    switchLine()
    updateTextBox()
    renderMeme()
}


function onDecreaseTxt() {
    decreaseTxt()
    renderMeme()

}

function onIncreaseTxt() {
    increaseTxt()
    renderMeme()

}


function onColorPick(color) {
    // console.log(color)
    setColor(color)
    renderMeme()
}

function onTxtInput(txt) {
    // console.log(txt)
    setLineTxt(txt)
    renderMeme()
}



