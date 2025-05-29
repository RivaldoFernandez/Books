class FlipBook {
  constructor(bookElem) {
    this.elems = {
      book: bookElem,
      leaves: bookElem.querySelectorAll(".leaf"),
    };
    this.setupEvents();
    this.currentPagePosition = 0;
    this.turnPage(0);
  }
  setPagePosition(page, position, index) {
    var transform = "";
    transform =
      "translate3d(0,0," + (position < 0 ? 1 : -1) * Math.abs(index) + "px)";

    if (position < 0) {
      transform += "rotate3d(0,1,0,-180deg)";

      page.classList.add("turned");
    } else {
      page.classList.remove("turned");
    }
    if (page.style.transform != transform) {
      page.style.transform = transform;
    }
  }
  turnPage(delta) {
    this.currentPagePosition += delta;
    if (this.currentPagePosition < 0) {
      this.currentPagePosition = 0;
      return;
    }
    if (this.currentPagePosition > this.elems.leaves.length) {
      this.currentPagePosition = this.elems.leaves.length;
      return;
    }
    this.elems.leaves.forEach((page, index) => {
      var pageNumber = index;
      this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
    });
  }

  setupEvents() {
    this.elems.leaves.forEach((leaf, index) => {
      leaf.addEventListener("click", (event) => {
        const rect = leaf.getBoundingClientRect();
        const x = event.clientX - rect.left;

        if (x < rect.width / 2) {
          // Click en lado izquierdo: retroceder
          this.turnPage(-1);
        } else {
          // Click en lado derecho: avanzar
          this.turnPage(1);
        }
      });
    });
  }
}
var flipBook = new FlipBook(document.getElementById("flipbook"));


const musica = new Audio("img/quédate-letra.mp3");
musica.volume = 0.6;
musica.loop = true; // 🔁 Hace que la música se repita automáticamente

const boton = document.getElementById("botonAudio");

boton.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        boton.textContent = "⏸️ Pause";
    } else {
        musica.pause();
        boton.textContent = "▶️ Play";
    }
});
