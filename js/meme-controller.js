'use strict'
let gCtx = ''
let gElCanvas = ''
let gStartPos
let gSavedMemes = []
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    createLine()
    renderMeme()
    renderGallery()
    showGallery()
    gSavedMemes = loadSavedMemes()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onMoveUp() {
    moveUpTxt()
    renderMeme()
}

function onMoveDown() {
    movedownTxt()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onFontChange(value) {
    fontChange(value)
    renderMeme()
}

function onAlignBtn(value) {
    alignText(value, gElCanvas.width)
    drawText()
    renderMeme()
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
        return false
    } else {
        meme.lines[meme.selectedLineIdx].isClicked = true
        meme.selectedLineIdx = lineIdx
        createFocus()
        updateTextBox()
        renderMeme()
        return true
    }
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elCanvasContainer.offsetWidth;
    gElCanvas.height = elCanvasContainer.offsetHeight
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    checkPos(pos)
    // console.log('pos:', pos)
    if (!checkPos(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return
    // console.log('Move')

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    // console.log('Up')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function drawText() {
    const meme = getMeme()
    const lines = meme.lines
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

    if (!line) return
    if (!line.isClicked) return

    const txtWidth = gCtx.measureText(line.txt).width
    line.txtWidth = txtWidth

    gCtx.beginPath()
    gCtx.rect(
        line.posX - line.txtWidth / 2 - 10,
        line.posY - 25,
        line.txtWidth + 20,
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
}

// function renderMeme() {
//     const elImg = new Image()
//     elImg.src = gImgs[gMeme.selectedImgId].url
//     elImg.onload = () => {
//         resizeCanvas()
//         gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
//         drawText()
//         createFocus()
//     }
// }


function renderMeme() {
    const meme = getMeme()
    const elImg = new Image()

    const currImg = gImgs.find(img => img.id === meme.selectedImgId)
    if (!currImg) return

    const isUploadedImg = currImg.keywords.includes('upload')
    if (isUploadedImg) elImg.src = `${currImg.url}`
    else elImg.src = `img/${(meme.selectedImgId) + 1}.jpg`

    elImg.onload = () => {
        resizeCanvas()
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
        createFocus()
    }
}

function OnEditorBtn() {
    showMeme()
}

function updateTextBox() {
    let currLine = getLine()
    let elTextBox = document.querySelector('.text-box')
    elTextBox.value = currLine.txt
}

function resetTextBox() {
    let elTextBox = document.querySelector('.text-box')
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
    setColor(color)
    renderMeme()
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function showMeme() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'none'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'flex'

    const elSavedContainer = document.querySelector('.main-saved-page')
    elSavedContainer.style.display = 'none'
}

function showSavedMemesPage() {
    const elGalleryContainer = document.querySelector('.main-gallery-page')
    elGalleryContainer.style.display = 'none'

    const elEditorContainer = document.querySelector('.main-editor-page')
    elEditorContainer.style.display = 'none'

    const elSavedContainer = document.querySelector('.main-saved-page')
    elSavedContainer.style.display = 'flex'
}

function onSaveBtn() {
    const memeUrl = gElCanvas.toDataURL()
    const id = makeId()
    const savedGMeme = Object.assign({}, getMeme())
    gSavedMemes.push({ id, memeUrl, savedGMeme })
    saveMemeToStorage(gSavedMemes)
    renderSavedMemes()
    showSavedMemesPage()
}

function onSavedMemePage() {
    showSavedMemesPage()
    gSavedMemes = loadSavedMemes()
    renderSavedMemes()
}

function onEditMeme(id) {
    let currMeme = gSavedMemes.find(meme => meme.id === id)
    gMeme = currMeme.savedGMeme
    renderMeme()
    showMeme()
}

function renderSavedMemes() {
    let strHTML = ''
    gSavedMemes.map(meme => {
        strHTML += `<article class="saved-meme" data-id="${meme.id}" onclick="">
    <img src="${meme.memeUrl}">
    <button class="edit-meme" onclick="onEditMeme('${meme.id}')">Edit</button>
    </article>
    `
        document.querySelector('.saved-memes-container').innerHTML = strHTML
    })
}
