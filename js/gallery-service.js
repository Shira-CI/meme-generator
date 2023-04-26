'use strict'

// let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
let gImgs = createImgs()
// console.log(gImgs)

function getImgs(){
return gImgs
}

function createImgs() {
    return [
        createImg(0, 'img/1.jpg', ['funny', 'trump', 'human']),
        createImg(1, 'img/2.jpg', ['funny', 'trump', 'human']),
        createImg(2, 'img/3.jpg', ['funny', 'trump', 'human'])
    ]
}


function createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords
    }
}