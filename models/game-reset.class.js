class GameReset {
  constructor(world, canvas) {
    this.world = world; // Referenz zur aktuellen World-Instanz
    this.canvas = canvas; // Canvas-Element
  }

  resetGame() {
    this.stopIntervals(); // Stoppe alle Intervalle
    this.stopSounds(); // Stoppe alle Sounds
    this.clearCanvas(); // Leere den Canvas
    this.clearKeyboard(); // Setze die Tastatur-Flags zurück
    console.log("Spiel wurde vollständig zurückgesetzt.");
  }

  stopIntervals() {
    if (this.world && this.world.intervals) {
      this.world.intervals.forEach((interval) => clearInterval(interval));
      this.world.intervals = [];
      console.log("Alle Intervalle gestoppt.");
    }
  }

  stopSounds() {
    if (this.world && this.world.backgroundMusic) {
      this.world.backgroundMusic.pause();
      this.world.backgroundMusic.currentTime = 0;
      console.log("Hintergrundmusik gestoppt.");
    }
  }

  clearCanvas() {
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log("Canvas wurde geleert.");
    }
  }

  clearKeyboard() {
    for (let key in keyboard) {
      keyboard[key] = false;
    }
    console.log("Tastatur-Flags zurückgesetzt.");
  }
}
