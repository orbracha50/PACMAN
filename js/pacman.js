'use strict'

const PACMAN = '😀'
var gPacman
var gIntervalGhostEat
function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    if (checkWin()) {
        gameOver()
        document.querySelector('p').innerText = 'YOU WIN'
    }
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    //  return if cannot move
    if (!gPacman.isSuper) {
        if (nextCell === WALL) return
        //  hitting a ghost? call gameOver
        if (nextCell === GHOST) {
            gameOver()
            gGame.score = 0
            document.querySelector('p').innerText = 'GAME OVER'

            text.innerText = 'GAME OVER'
            console.log(text.innerText)
            return
        }
        if (nextCell === FOOD) {
            updateScore(1)
        }
        if (nextCell === CHERRY) {
            updateScore(10)
        }
        if (nextCell === SUPERFOOD) {
            gPacman.isSuper = true
            // for (var i = 0; i < gGhosts.length; i++) {
            //     var ghost = gGhosts[i]
            //     ghost.color = 'white'   
            // }
            setInterval(superOver, 5000)
        }
        // moving from current location:
        // update the model
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
        renderCell(gPacman.location, EMPTY)
        // Move the pacman to new location:
        // update the model
        gPacman.location = nextLocation
        gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
        // update the DOM
        renderCell(gPacman.location, PACMAN)
    } else {
        if (nextCell === WALL) return
        if (nextCell === FOOD) {
            updateScore(1)
        }
        if (nextCell === GHOST) {
            onEatGhost(nextLocation)
        }
        if (nextCell === CHERRY) {
            updateScore(10)
        }
        if (nextCell === SUPERFOOD) {
            setInterval(superOver, 5000)
        }
        if (nextCell === GHOST || nextCell === EMPTY || nextCell === FOOD || nextCell === CHERRY || nextCell === SUPERFOOD) {
            // moving from current location:
            // update the model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            // update the DOM
            renderCell(gPacman.location, EMPTY)
            // Move the pacman to new location:
            // update the model
            gPacman.location = nextLocation
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
            // update the DOM
            renderCell(gPacman.location, PACMAN)
        }
    }

}
function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code:', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        default: return null
    }
    return nextLocation
}
function superOver() {
    gPacman.isSuper = false
}
