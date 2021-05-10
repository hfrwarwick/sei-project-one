<h1> Space Invaders - GA Project One</h1>

My first dev project for the Software Engineering Immersive course and also my first ever project using JavaScript.

<img src="https://media.giphy.com/media/2OMgHz7W3NgXFvBH4Y/giphy.gif"/>

<h2>Deployment</h2>
The game has been deployed with GitHub Pages and is available [link](https://hfrwarwick.github.io/sei-project-one/)

<h2>Goal and Timeframe:</h2>
To build a functioning browser game with pure JavaScript in 8 days.

<h2>Technologies used:</h2>
• HTML5</br>
• CSS3 </br>
• JavaScript </br>
• GitHub </br>

<h2>Brief:</h2>
Space Invaders is a classic 80s arcade game. The player, moving left or right, aims to shoot an invading alien armada and achieve the highest score possible before either being eradicated by lasers that the aliens shoot periodically, or allowing the armada to reach Planet Earth's surface. Each time the aliens reach the edge of the grid, they increase in speed. My iteration pays tribute to Star War’s The Mandolarian. The user plays and controls The Madolorian. Shooting and avoiding lasers from the approaching Stormtroopers

<h2>Process</h2>
I started developing the game by sketching out a plan on Trello of all the different functionalities the game should have, and ranked them to critical for MVP and stretch goals. I then started pseudocoding my MVP down into bite size chunks to make sure I could deliver it in time to allow time for polishing and styling. 
</br>


• I created the game grid square by setting a value for width, using a for-loop to create a div element while the index value was less than width times width. I then pushed these divs to an empty array and appended them to the grid div in my HTML.</br>

• I made one div for player spaceship, and created keydown event listeners to allow the player to move and fire when the corresponding keys are pressed, with logic to refrain player from moving off the grid.
```
function createGrid() {
   for (let i = 0; i < cellCount; i++) {
     const cell = document.createElement('div')
     grid.appendChild(cell)
     cells.push(cell)
   }
   addMando(mandoStartPosition)
   addTroopers(troopersCurrentPosition)
 }
```
• To cause the player to move, I created an if statement that the left or right arrow was pressed it would move the player left or right from its current possition.

```
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
```
• I placed the invaders on the grid by creating an invaders array, which included the index values of the squares on the grid</br>

• Then I worked on the invader movement logic, which moves the invaders right, down, left and down following a lead invader. I created a timer to move the invader armada until the invaders reach the bottom row.
```
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
```
• When the invaders reach the bottom row or when the player is hit by invader fire, this calls a Game Over function which displays player's score and clears the grid and resets the game variables. </br>

• So the alien would be removed from the grid if the laser hit it, I created an if statement. If the laser is in the same grid as the alien, it would remove the alien, if it wasn't it would continue up the grid.
```
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
```
<h2>Known errors or bugs</h2>
When the Storm Troopers shoot back, the lasers don’t travel down the grid all the way, and due to this the player doesn’t lose lives. Can only die when the troopers reach the player at the bottom(CHECK WHY THAT MIGHT BE)

<h2>Challenges</h2>
This was my first project using JavaScript so I faced many challenges, of which the biggest were: </br> </br>
• Collision detection logic,</br>
• Getting the Aliens to speed up when they hit the edge of the grid, </br>
• Getting the player’s laser to move up the grid,</br>
• Working with various set timers to create movement</br>

<h2>Wins</h2>
• Creating my first project by myself, </br>
• Boosting my own confidence in my coding abilities,</br>
• Fun and satisfying. </br>

<h2>Future improvements</h2>
A few issues remain to be ironed out, and there are also a few features I would like to add going forward:</br> </br>
• I would like another couple levels that increase in difficulty, and change the starting position of the Troopers. </br>
• Create a better starting menu when the user joins.</br>
• Create a better ‘You Win’ menu</br>
• Clean up the code

<h2>Key learnings</h2>
Making my first static JS browser game from scratch was a great learning exercise and a fun way to consolidate my learnings. In particular, I learnt a lot about DOM manipulation, different use cases for different JS array methods, and working with timers.

<h2>About</h2>
Space Invaders implementation built with pure JavaScript, HTML and CSS. My first project for GA's Software Engineering Immersive.


