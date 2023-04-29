'use strict'

let gImgs = createImgs()
// console.log(gImgs)
let gFilterBy = 'All'
const gKeywords = ['happy', 'angry', 'cute', 'animal', 'famous', 'human', 'funny', 'love']


function filterUpdate(keyWord) {
    gFilterBy = keyWord
    // console.log(gFilterBy)
}

function getImgs() {
    if (gFilterBy === 'All') return gImgs
    let currKeyword = gFilterBy.toLowerCase()
    return gImgs.filter(img => img.keywords.includes(currKeyword))
}

function createImgs() {
    return [
        createImg(0, 'img/1.jpg', ['funny', 'angry', 'human']),
        createImg(1, 'img/2.jpg', ['cute', 'love', 'animal']),
        createImg(2, 'img/3.jpg', ['cute', 'love', 'animal']),
        createImg(3, 'img/4.jpg', ['cute', 'love', 'animal']),
        createImg(4, 'img/5.jpg', ['cute', 'happy', 'funny']),
        createImg(5, 'img/6.jpg', ['funny', 'human']),
        createImg(6, 'img/7.jpg', ['cute', 'human', 'happy']),
        createImg(7, 'img/8.jpg', ['happy', 'funny', 'human']),
        createImg(8, 'img/9.jpg', ['funny', 'cute', 'happy']),
        createImg(9, 'img/10.jpg', ['funny', 'famous', 'human']),
        createImg(10, 'img/11.jpg', ['funny', 'love', 'human']),
        createImg(11, 'img/12.jpg', ['funny', 'famous', 'human']),
        createImg(12, 'img/13.jpg', ['funny', 'famous', 'human']),
        createImg(13, 'img/14.jpg', ['funny', 'angry', 'human']),
        createImg(14, 'img/15.jpg', ['funny', 'trump', 'human']),
        createImg(15, 'img/16.jpg', ['funny', 'famous', 'human']),
        createImg(16, 'img/17.jpg', ['funny', 'famous', 'human']),
        createImg(17, 'img/18.jpg', ['angry', 'cute', 'love']),
    ]
}

function createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords
    }
}