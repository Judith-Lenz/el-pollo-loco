let canvas //brauch ich hier außerhalb, weil ich woanders auch noch benutzen möchte.
let world // Globale Variable für die World-Instanz
let keyboard = new Keyboard()

function init() {
  canvas = document.getElementById('canvas')
}

function startGame() {
  if (world) {
    // <-- Prüfe, ob es schon eine Welt gibt
    world.stop() // <-- neu: Alte Welt stoppen, bevor neue erstellt wird
  }

  // Blende den StartScreen langsam aus
  document.getElementById('startScreen').classList.add('fade-out')
  document.getElementById('home').classList.add('d-none')
  document.getElementById('btnNewGame').classList.add('d-none')

  // Einblendung der Touch-Buttons prüfen
  toggleMobileButtons()
  bindMobileButtonEvents()
  // Event-Listener für Änderungen der Bildschirmgröße oder Orientierung
  window.addEventListener('resize', toggleMobileButtons)
  // Warte 300ms, um den Fade-Out abzuschließen
  setTimeout(() => {
    document.getElementById('startScreen').classList.add('d-none') // Verstecke den StartScreen endgültig
    document.getElementById('gameOverScreen').classList.add('d-none')
    document.getElementById('winningScreen').classList.add('d-none')
    const canvasElement = document.getElementById('canvas')
    canvasElement.classList.remove('d-none') // Zeige das Canvas
    canvasElement.classList.add('show') // Sanftes Einblenden des Canvas

    // Initialisiere das Level und die Spielwelt
    initLevel() // Alle Gegenstände wieder am ursprünglichen Platz
    world = new World(canvas, keyboard)
  }, 300) // Die 300ms sollten mit dem CSS-Fade-Out synchronisiert sein
}

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
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
})

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
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
})

function bindMobileButtonEvents() {
  // Touch-Button Links
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

  // Touch-Button Rechts
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

  // Touch-Button Springen
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

  // Touch-Button Werfen
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
