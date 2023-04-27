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

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    // Listen for resize ev
    // window.addEventListener('resize', () => {
    //   onInit()
    // })
}

function checkPos(pos) {
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
    if (lineIdx === -1) return
    const meme = getMeme()
    // console.log(meme)
    meme.selectedLineIdx = lineIdx
    createFocus()
    updateTextBox()
    renderMeme()

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
    // console.log(pos)

    // console.log('pos:', pos)
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


function createFocus() {
    const line = getLine();
    // console.log(line)
    if (!line) return;
    gCtx.beginPath();
    gCtx.rect(
        line.posX - (gCtx.measureText(line.txt).width) / 2 - 10,
        line.posY - 20,
        gCtx.measureText(line.txt).width + 20,
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
    let currLine = getLine()
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



