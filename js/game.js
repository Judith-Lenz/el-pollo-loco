let canvas; //brauch ich hier außerhalb, weil ich woanders auch noch benutzen möchte.
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My Character is", world.character);
}
