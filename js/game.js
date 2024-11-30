let canvas; //brauch ich hier außerhalb, weil ich woanders auch noch benutzen möchte.
let world; // Globale Variable für die World-Instanz
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  // console.log(e.key); // Zeigt die Taste
  // console.log("Tastencode:", e.code); // Zeigt den Tastencode in Sprache an, ist wohl moderner.
  // console.log("KeyCode der gedrückten Taste:", e.keyCode); //Code als Zahl,ist veraltet, klappt aber trotzdem noch.
});
