'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍎'
const CHERRY = '🍒'
const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    setInterval(addCherry,15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1]=  SUPERFOOD
    board[8][8]=  SUPERFOOD
    board[1][8]=  SUPERFOOD
    board[8][1]=  SUPERFOOD
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            if (cell === GHOST){
                strHTML += `<td class="${className} ghost">${cell}</td>`
            }else{
                strHTML += `<td class="${className}">${cell}</td>`
            }
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 } , ''
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
function renderGhostColor(location,value ) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
   // elCell.style.backgroundColor = color
}
function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    gGame.score = 0
    updateScore(gGame.score)
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    var modal = document.getElementById("myModal")
    modal.style.display = "block";
}
function restartModal() {
    onInit()
    var modal = document.getElementById("myModal")
    modal.style.display = "none";
}
function closeModal() {
    var modal = document.getElementById("myModal")
    modal.style.display = "none"
}
function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++){
            if (gBoard[i][j]=== FOOD) return false
        }
    }
    return true
}
function addCherry(){
    var randPos = findEmptyCell()
    gBoard[randPos.i][randPos.j] = CHERRY
    renderCell(randPos,CHERRY)
}
