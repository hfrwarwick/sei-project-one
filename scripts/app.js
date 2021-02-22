function init() {

  // * Variables
  const grid = document.querySelector('.grid')
  
  const width = 15
  const cellCount = width * width
  const cells = []

  // const scoreDisplay = document.querySelector('#score-display')
  // const livesDisplay = document.querySelector('#lives-display')

  const mandoClass = 'mando'
  // const trooperCLass = 'trooper'
  const mandoStartPosition = 202
  let mandoCurrentPosition = 202
  // let trooperCurrentPosition = 0
  // let trooperDestroyed = []

  // * Make a grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addMando(mandoStartPosition)
    
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

  



  // * Move Mando left to right

  function handleKeyUp(event) {
    const key = event.keyCode

    removeMando(mandoCurrentPosition)
    
    if (key === 39 && mandoCurrentPosition % width !== width - 1) {
      mandoCurrentPosition++
    } else if (key === 37 && mandoCurrentPosition % width !== 0) {
      mandoCurrentPosition--
    } else {
      console.log('INVALID KEY')
    }
    
    addMando(mandoCurrentPosition)
  }

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)

  createGrid(mandoStartPosition) 






}










window.addEventListener('DOMContentLoaded', init)