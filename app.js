document.addEventListener('DOMContentLoaded', function(){
  
  let score = 0
  const scoreDisplay = document.getElementById('score-display')
  const board = document.getElementById('board')
  const startBtn = document.getElementById('start-btn')
  const timerDisplay = document.getElementById('timer')
  const gameOverHeading = document.getElementById('game-finshed-title')

  let time = Date.now()
  const imagesArray = []
  let gameOn = false



  createBoard()

  function createBoard() {
    for(let i = 0; i < 12; i++) {
      let square = document.createElement('div')
      let img = document.createElement('img')
      square.className = "square"
      img.setAttribute('src', './images/brown.jpg')
      img.setAttribute('data-id', i)
      img.setAttribute('data-has-mole', 'false')
      img.setAttribute('wacked', 'false')
      img.addEventListener('click', handleClick)
      board.appendChild(square)
      square.appendChild(img)
      imagesArray.push(img)
    }
  }

  startBtn.addEventListener('click', () => setTimeout(playGame, 1000))
  
  function playGame() {
    console.log("Game is playing")
    score = 0
    scoreDisplay.textContent = score
    gameOverHeading.className = 'hidden'

    gameOn = true
    setGameDurationTimer()
    
    recursiveMole()
  }

  function generateRandomMoleTime() {
    return Math.ceil(Math.random() * 4) * 500
  }

  function recursiveMole(prevMole) {
    console.log('new mole')
    if(!gameOn) return //to stop a mole appear at the end

    //to accomodate for no mole on initial call
    if(typeof prevMole !== 'undefined') {
      prevMole.setAttribute('data-has-mole', 'false')
      prevMole.setAttribute('src', './images/brown.jpg')
      prevMole.setAttribute('wacked', 'false')
    }

    let nextMole = imagesArray[Math.floor(Math.random() * 12)]
    nextMole.setAttribute('data-has-mole', 'true')
    nextMole.setAttribute('src', './images/mole.png')

    if(gameOn) setTimeout(() => recursiveMole(nextMole), generateRandomMoleTime())    
  }

  function setGameDurationTimer() {
    let startTime = Date.now()
    let endTime = startTime + (10 * 1000)
    let timer = setInterval(function() {
      let now = new Date().getTime();
      let distance = endTime - now;
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timerDisplay.textContent = seconds
      if (distance < 0) {
        timerDisplay.textContent = 0
        clearInterval(timer);
        gameOver()
      }
    }, 1000);
  }

  function handleClick() {
    console.log("clicked")
    const hasMole = JSON.parse(this.getAttribute('data-has-mole'))
    const isWacked = JSON.parse(this.getAttribute('wacked'))
    if(hasMole && !isWacked){
      console.log("plus one point")
      this.setAttribute('wacked', 'true')
      this.setAttribute('src', './images/wacked-mole.png')
      updateScore()
    } else {
      console.log("clicked a blank or already wacked mole")
    }
  }

  function updateScore() {
    score += 1
    scoreDisplay.textContent = score
  }

  function gameOver() {
    gameOn = false

    for(img of imagesArray) {
      img.setAttribute('src', './images/brown.jpg')
      img.setAttribute('data-has-mole', 'false')
    }
    gameOverHeading.className = ''

    console.log("Game Over")
  }
})