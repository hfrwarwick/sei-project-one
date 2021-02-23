function init() {

  // * Variables

  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score') 
  const livesDisplay = document.querySelector('#lives')
  const width = 15
  const cellCount = width * width
  const cells = []
  let livesRemaining = 3
  let score = 0

  const mandoClass = 'mando'
  const trooperClass = 'troopers'
  const mandoStartPosition = 202
  let mandoCurrentPosition = 202
  let troopersCurrentPosition = 0
  let trooperDestroyed = [] 
  let trooperID
 
  
  // const scoreDisplay = document.querySelector('#score-display')
  // const livesDisplay = document.querySelector('#lives-display')
  

  // * Make a grid

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
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

  const stormTroopers = [
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

  function moveTroopers() {

    for (let i = 0; i <= stormTroopers.length - 1; i++) {
      cells[stormTroopers[i]].classList.remove('troopers') 
    }
    for (let i = 0; i <= stormTroopers.length - 1; i++) {
      stormTroopers[i] += direction
    }
    for (let i = 0; i <= stormTroopers.length - 1; i++) {
      cells[stormTroopers[i]].classList.add('troopers')
    }
  }
  trooperID = setInterval(moveTroopers, 500)

  // * Lasers

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
        clearInterval(laserId)
      }
      if (laserCurrentPosition < width) {
        cells[laserCurrentPosition].classList.remove('laser') 
        clearInterval(laserId)
      }
    }, 100)
    
        
    //   const trooperKill = stormTroopers.indexOf(laserCurrentPosition)
    //   trooperDestroyed.push(trooperKill)
    //   score++
    //   scoreDisplay.textContent = score
      
  
  }
  
  // * Event listener to shoot laser

    
  document.addEventListener('keyup', event => {
    if (event.keyCode === 32) {
      shoot()
    } 
  })

  // * Event listeners

  document.addEventListener('keyup', handleKeyUp)
  //document.addEventListener('keyup', shoot)

  createGrid(mandoStartPosition) 






}










window.addEventListener('DOMContentLoaded', init)