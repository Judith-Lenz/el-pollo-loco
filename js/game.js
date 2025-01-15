let canvas
let world
let keyboard = new Keyboard()

/**
 * Initializes the canvas element for the game.
 */
function init() {
  canvas = document.getElementById('canvas')
}

/**
 * Starts the game by hiding the start screen, setting up the UI,
 * and initializing the game world after a delay.
 */
function startGame() {
  if (world) {
    world.stop()
  }
  document.getElementById('startScreen').classList.add('fade-out')
  document.getElementById('home').classList.add('d-none')
  document.getElementById('btnNewGame').classList.add('d-none')
  document.getElementById('muteDiv').classList.remove('d-none')
  toggleMobileButtons()
  bindMobileButtonEvents()
  window.addEventListener('resize', toggleMobileButtons)
  setTimeout(initializeGameWorld, 300)
}

/**
 * Sets up the game world, hides unnecessary screens, and initializes the world object.
 */
function initializeGameWorld() {
  document.getElementById('startScreen').classList.add('d-none')
  document.getElementById('gameOverScreen').classList.add('d-none')
  document.getElementById('winningScreen').classList.add('d-none')
  const canvasElement = document.getElementById('canvas')
  canvasElement.classList.remove('d-none')
  canvasElement.classList.add('show')
  initLevel()
  world = new World(canvas, keyboard)
}

/**
 * Toggles the visibility of mobile buttons based on the screen size and orientation.
 */
function toggleMobileButtons() {
  const isMobile = window.innerWidth <= 768 || window.matchMedia('(orientation: portrait)').matches
  const btnArrows = document.getElementById('mblTouchBtnArrows')
  const btnAction = document.getElementById('mblTouchBtnAction')
  if (isMobile) {
    btnArrows.classList.remove('d-none')
    btnAction.classList.remove('d-none')
  } else {
    btnArrows.classList.add('d-none')
    btnAction.classList.add('d-none')
  }
}

/**
 * Handles keyboard events to track the state of arrow keys, spacebar, and "D" key.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowLeft':
      keyboard.LEFT = true
      break
    case 'ArrowRight':
      keyboard.RIGHT = true
      break
    case 'ArrowUp':
      keyboard.UP = true
      break
    case 'ArrowDown':
      keyboard.DOWN = true
      break
    case 'Space':
      keyboard.SPACE = true
      break
    case 'KeyD':
      keyboard.D = true
      break
  }
})

/**
 * Handles keyboard events to reset the state of arrow keys, spacebar, and "D" key.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowLeft':
      keyboard.LEFT = false
      break
    case 'ArrowRight':
      keyboard.RIGHT = false
      break
    case 'ArrowUp':
      keyboard.UP = false
      break
    case 'ArrowDown':
      keyboard.DOWN = false
      break
    case 'Space':
      keyboard.SPACE = false
      break
    case 'KeyD':
      keyboard.D = false
      break
  }
})

/**
 * Binds touch events to the mobile buttons for controlling the game using touch input.
 */
function bindMobileButtonEvents() {
  document.getElementById('mblTouchBtnLeft').addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault()
      keyboard.LEFT = true
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnLeft').addEventListener(
    'touchend',
    (e) => {
      e.preventDefault()
      keyboard.LEFT = false
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnRight').addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault()
      keyboard.RIGHT = true
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnRight').addEventListener(
    'touchend',
    (e) => {
      e.preventDefault()
      keyboard.RIGHT = false
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnJump').addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault()
      keyboard.SPACE = true
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnJump').addEventListener(
    'touchend',
    (e) => {
      e.preventDefault()
      keyboard.SPACE = false
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnThrow').addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault()
      keyboard.D = true
    },
    { passive: false }
  )
  document.getElementById('mblTouchBtnThrow').addEventListener(
    'touchend',
    (e) => {
      e.preventDefault()
      keyboard.D = false
    },
    { passive: false }
  )
}
