'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function findEmptyCell(){
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++){
        for (var j = 0; j < gBoard[0].length; j++){
            if(gBoard[i][j]===EMPTY) emptyCells.push({i:i,j:j})
        }
    }
    var randCellPos = emptyCells[getRandomIntInclusive(0,emptyCells.length-1)]
    return randCellPos
}