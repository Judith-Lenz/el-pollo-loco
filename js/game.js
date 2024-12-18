let canvas; //brauch ich hier außerhalb, weil ich woanders auch noch benutzen möchte.
let world; // Globale Variable für die World-Instanz
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  if (world) {
    // <-- Prüfe, ob es schon eine Welt gibt
    world.stop(); // <-- neu: Alte Welt stoppen, bevor neue erstellt wird
  }
  // resetGame();
  // Blende den StartScreen langsam aus
  document.getElementById("startScreen").classList.add("fade-out");
  // Warte 300ms, um den Fade-Out abzuschließen
  setTimeout(() => {
    document.getElementById("startScreen").classList.add("d-none"); // Verstecke den StartScreen endgültig
    const canvasElement = document.getElementById("canvas");
    canvasElement.classList.remove("d-none"); // Zeige das Canvas
    canvasElement.classList.add("show"); // Sanftes Einblenden des Canvas
    // Initialisiere das Level und die Spielwelt, immer zuerst level erstellen und dann erst die Welt, sonst wird mit der welt noch ein altes level erstellt.
    initLevel(); //damit sind alle Gegenstände wieder am ursprünglichen Platz
    world = new World(canvas, keyboard);
  }, 300); // Die 300ms sollten mit dem CSS-Fade-Out synchronisiert sein
}

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "Space":
      keyboard.SPACE = true;
      break;
    case "KeyD":
      keyboard.D = true;
      break;
  }
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case "Space":
      keyboard.SPACE = false;
      break;
    case "KeyD":
      keyboard.D = false;
      break;
  }
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
});
