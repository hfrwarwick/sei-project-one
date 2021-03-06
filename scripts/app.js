function init() {

  // * Variables

  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const livesDisplay = document.querySelector('#lives')
  const startButton = document.querySelector('.startGame')
  const audioTag = document.querySelector('audio')
  const width = 15
  const cellCount = width * width
  const cells = []
  let livesRemaining = 3
  let score = 0
  const mandoClass = 'mando'
  const trooperClass = 'troopers'
  const mandoStartPosition = 202
  let mandoCurrentPosition = 202
  const troopersCurrentPosition = 0
  const trooperDestroyed = []
  let trooperID

  // * Start Game

  function startGame() {
    console.log('Game Started!')
    moveTroopers()
    trooperAttack()
  }
  startButton.addEventListener('click', startGame)

  // * Make a grid

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      //cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addMando(mandoStartPosition)
    addTroopers(troopersCurrentPosition)
  }

  // * Add Mando to grid

  function addMando(position) {
    cells[position].classList.add(mandoClass)
  }

  // * Remove Mando from the grid

  function removeMando(position) {
    cells[position].classList.remove(mandoClass)
  }
  // * Add Troopers

  let stormTroopers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
  ]
  function addTroopers(troopersCurrentPosition) {
    stormTroopers.forEach(troopers => cells[troopersCurrentPosition + troopers].classList.add('troopers'))
  }

  // * Move Mando left to right

  function handleKeyUp(event) {
    const key = event.keyCode
    removeMando(mandoCurrentPosition)
    if (key === 39 && mandoCurrentPosition % width !== width - 1) {
      mandoCurrentPosition++
    } else if (key === 37 && mandoCurrentPosition % width !== 0) {
      mandoCurrentPosition--
    }
    addMando(mandoCurrentPosition)
  }

  // * Move Troopers

  let direction = 1
  let speed = 700
  function moveTroopers() {
    trooperID = setInterval(() => {
      const leftSide = stormTroopers[0] % width === 0
      const rightSide = stormTroopers[stormTroopers.length - 1] % width === width - 1
      if ((leftSide && direction === -1) || (rightSide && direction === 1)){
        clearInterval(trooperID)
        direction = width
        speed = speed - 30
        moveTroopers()
      } else if (direction === width) {
        clearInterval(trooperID)
        if (leftSide) {
          direction = 1
        } else {
          direction = -1
        }
        speed = speed - 30
        moveTroopers()
      }
      for (let i = 0; i <= stormTroopers.length - 1; i++) {
        cells[stormTroopers[i]].classList.remove('troopers')
      }
      for (let i = 0; i <= stormTroopers.length - 1; i++) {
        stormTroopers[i] += direction
      }
      for (let i = 0; i <= stormTroopers.length - 1; i++) {
        if (!trooperDestroyed.includes(i)) {
          cells[stormTroopers[i]].classList.add('troopers')
        }
      }

      // * To Win

      console.log('length of troopers', stormTroopers.length)
      if (stormTroopers.length === 0) {
        livesDisplay.textContent = 'YOU SURVIVED! YOU WIN!'
        clearInterval(trooperID)
      }

      // * Game Over

      if (cells[mandoCurrentPosition].classList.contains('troopers', 'mando')) {
        cells[mandoCurrentPosition].classList.add('kill')
        livesRemaining--
      } if (livesRemaining <= 0) {
        livesDisplay.textContent = 'YOU DIED! GAME OVER!'
        cells[mandoCurrentPosition].classList.add('kill')
        clearInterval(trooperID)
      }
      for (let i = 0; i <= stormTroopers.length - 1; i++) {
        if (stormTroopers[i] > (cells.length - (width - 1))) {
          livesDisplay.textContent = 'YOU DIED! GAME OVER!'
          clearInterval(trooperID)
        }
      }
      console.log(speed)
    }, speed)
  }

  // * Player shoots lasers

  function shoot(event) {
    console.log('shoot')
    let laserId
    let laserCurrentPosition = mandoCurrentPosition
    laserId = setInterval(() => {
      cells[laserCurrentPosition].classList.remove('laser')
      laserCurrentPosition -= width
      cells[laserCurrentPosition].classList.add('laser')
      if (cells[laserCurrentPosition].classList.contains('troopers')) {
        cells[laserCurrentPosition].classList.remove('laser')
        cells[laserCurrentPosition].classList.remove('troopers')
        cells[laserCurrentPosition].classList.add('kill')
        stormTroopers = stormTroopers.filter( kill => {
          return laserCurrentPosition !== kill
        })
        score += 100
        scoreDisplay.textContent = score
        clearInterval(laserId)
        setTimeout(() => cells[laserCurrentPosition].classList.remove('kill'), 250)
      }
      if (laserCurrentPosition < width) {
        cells[laserCurrentPosition].classList.remove('laser')
        clearInterval(laserId)
      }
    }, 100)
    const trooperKill = stormTroopers.indexOf(laserCurrentPosition)
    trooperDestroyed.push(trooperKill)
  }

  // * Trooper shoots laser

  let randomCell = 0
  let attackExists = false
  let attackPosition = 0

  function trooperAttack() {
    let randomCell = cells[Math.floor(Math.random() * (cells.length))]
    let randomNumber = Number(randomCell.innerText)
    console.log(randomNumber)
    let livesRemaining = 3

    const attackTimer = setInterval(() => {

      if (attackExists === false) {
        randomCell = cells[Math.floor(Math.random() * (cells.length))]
        console.log(randomCell)
        randomNumber = Number(randomCell.innerText)
        attackPosition = randomNumber + 10

        if (randomCell.className === trooperClass && randomNumber % 2 === 0 && cells[randomNumber + 10].className !== trooperClass) {
          cells[attackPosition].classList.add('laser')
          //console.log('Fire!')
          attackExists = true
        }

      } else if (attackExists === true) {
        if (attackPosition < 90) {
          cells[attackPosition].classList.remove('laser')
          attackPosition = attackPosition + 10
          cells[attackPosition].classList.add('laser')
        } 
        if (attackPosition >= 90) {
          if (cells.className !== mandoClass ) {
            cells[attackPosition].classList.remove('laser')
            attackExists = false

          } else if (cells.className === mandoClass && cells.className === 'laser') {
            console.log('Lose Life!')
            livesRemaining = livesRemaining - 1
            attackExists = false

          } else {
            console.log('INNER WRONG!')
          }
        }
      } else {
        console.log('OUTER WRONG!')
      }
    }, 700)
  }

  // * Event listener to shoot laser

  document.addEventListener('keyup', event => {
    if (event.keyCode === 32) {
      event.preventDefault()
      shoot()
    }
  })

  // * Event listeners

  document.addEventListener('keyup', handleKeyUp)
  //document.addEventListener('keyup', shoot)
  createGrid(mandoStartPosition)

  document.addEventListener('keyup', event =>{
    if (event.keyCode === 32) {
      var audio = new Audio('http://www.sa-matra.net/sounds/starwars/ISD-Laser3.wav')
      audio.play()
      return false
    }
  })

  document.addEventListener('keyup', event =>{
    if (event.keyCode === 77) {
      var audio = new Audio('audio')
      audioTag.src = './assets/35088_25-galaxy_wars-v.chiaravalle_proud_music_preview.mp3'
      audioTag.play()
      return false
    }
  })

  // window.addEventListener('DOMContentLoaded', event => {
  //   const audio = document.querySelector('audio')
  //   audio.volume = 0.2
  //   audio.play()
  // })
  
}
window.addEventListener('DOMContentLoaded', init)

