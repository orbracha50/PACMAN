'use strict'

const GHOST = '👻'
var gGhosts
var gIntervalGhosts
var gDeadGhosts = []
function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost === EMPTY) return
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost:', ghost)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)
    //console.log(ghost)
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation) //{i,j}

    var nextCell = gBoard[nextLocation.i][nextLocation.j] //'.'
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL || nextCell === GHOST || nextCell === SUPERFOOD || (nextCell === PACMAN && gPacman.isSuper)) return

    // hitting a pacman? call gameOver
    if (nextCell === PACMAN && gPacman.isSuper === false) {
        gameOver()
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost, GHOST))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost, value) {
    var color = (gPacman.isSuper)? 'white': ghost.color
    return `<span class="ghost${ghost.location.i}" style="background-color:${color};">${value}</span>`
}
function ghostBack(){
    for(var i = 0; i< gDeadGhosts.length;i++){
        var currGhost = gDeadGhosts[i]
         gGhosts.push(currGhost)
    }
}
function onEatGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)
            console.log(deadGhost)
            gDeadGhosts.push(deadGhost[0])
            
            setTimeout(ghostBack, 5000)
        }
    }
}