(() => {
  // source/Canvas.js
  var Canvas = class {
    Layers = [];
    constructor(widthScale, heightScale, LayersCount) {
      this.LayersCount = LayersCount;
      this.game = document.querySelector("#game");
      this.wScale = widthScale;
      this.hScale = heightScale;
      this.scale = 1;
      this.wSize = 0;
      this.hSize = 0;
      this.#updateSize();
      window.addEventListener("resize", () => this.#updateSize());
      for (let i = 0; i < LayersCount; i++) {
        let layer = document.createElement("div");
        layer.className = `layer layer${i}`;
        this.game.append(layer);
        this.Layers.push(layer);
      }
    }
    #updateSize() {
      let w = window.innerWidth / this.wScale;
      let h = window.innerHeight / this.hScale;
      let t = this.wScale + 1;
      let windowScale = Math.min(w, h);
      this.scale = windowScale / 120;
      this.wSize = windowScale * this.wScale;
      this.hSize = windowScale * this.hScale;
      this.game.setAttribute("style", `width: ${this.wSize}px; height: ${this.hSize}px;`);
    }
    AddElementToLeyer(DOMelement, layer) {
      if (layer < 0 || layer > this.LayersCount - 1) {
        return false;
      }
      this.Layers[layer].append(DOMelement);
    }
  };

  // source/main.js
  var canvas = new Canvas(16, 9, 5);
  var colors = ["blue", "red", "green", "yellow", "violet"];
  for (let i = 0; i < 5; i++) {
    let elem = document.createElement("div");
    elem.setAttribute("style", `width: 40%; height: 40%; top: ${15 + 5 * i}%; left: ${10 + 10 * i}%; background-color: ${colors[i]};`);
    canvas.AddElementToLeyer(elem, i);
  }
})();
