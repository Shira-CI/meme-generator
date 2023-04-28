'use strict'

let gImgs = createImgs()
// console.log(gImgs)




function getImgs() {
    return gImgs
}

function createImgs() {
    return [
        createImg(0, 'img/1.jpg', ['funny', 'trump', 'human']),
        createImg(1, 'img/2.jpg', ['funny', 'trump', 'human']),
        createImg(2, 'img/3.jpg', ['funny', 'trump', 'human']),
        createImg(3, 'img/4.jpg', ['funny', 'trump', 'human']),
        createImg(4, 'img/5.jpg', ['funny', 'trump', 'human']),
        createImg(5, 'img/6.jpg', ['funny', 'trump', 'human']),
        createImg(6, 'img/7.jpg', ['funny', 'trump', 'human']),
        createImg(7, 'img/8.jpg', ['funny', 'trump', 'human']),
        createImg(8, 'img/9.jpg', ['funny', 'trump', 'human']),
        createImg(9, 'img/10.jpg', ['funny', 'trump', 'human']),
        createImg(10, 'img/11.jpg', ['funny', 'trump', 'human']),
        createImg(11, 'img/12.jpg', ['funny', 'trump', 'human']),
        createImg(12, 'img/13.jpg', ['funny', 'trump', 'human']),
        createImg(13, 'img/14.jpg', ['funny', 'trump', 'human']),
        createImg(14, 'img/15.jpg', ['funny', 'trump', 'human']),
        createImg(15, 'img/16.jpg', ['funny', 'trump', 'human']),
        createImg(16, 'img/17.jpg', ['funny', 'trump', 'human']),
        createImg(17, 'img/18.jpg', ['funny', 'trump', 'human']),
    ]
}


function createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords
    }
}