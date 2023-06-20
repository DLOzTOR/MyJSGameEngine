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

  // source/Math/MathConstants.js
  var MathConstants = class {
    static RadianToDegrees = 180 / Math.PI;
    static DegreesToRadian = Math.PI / 180;
  };

  // source/Math/Vector2.js
  var Vector2 = class _Vector2 {
    constructor(X, Y) {
      this.X = X;
      this.Y = Y;
    }
    Add(vector) {
      return _Vector2.Add(this, vector);
    }
    Angle(vector) {
      return _Vector2.Angle(this, vector);
    }
    Dot(vector) {
      return _Vector2.Dot(this, vector);
    }
    Magnitude() {
      return _Vector2.Magnitude(this);
    }
    Normilize() {
      return _Vector2.Normilize(this);
    }
    Equals(vector) {
      return _Vector2.Equals(this, vector);
    }
    ToSting() {
      return `X: ${this.X}; Y: ${this.Y}`;
    }
    Scale(number) {
      return _Vector2.Scale(this, number);
    }
    Set(X, Y) {
      this.X = X;
      this.Y = Y;
    }
    static get Zero() {
      return new _Vector2(0, 0);
    }
    static get One() {
      return new _Vector2(1, 1);
    }
    static get Right() {
      return new _Vector2(1, 0);
    }
    static get Left() {
      return new _Vector2(-1, 0);
    }
    static get Up() {
      return new _Vector2(0, 1);
    }
    static get Down() {
      return new _Vector2(0, -1);
    }
    static Equals(vector1, vector2) {
      return vector1.X == vector2.X && vector1.Y == vector2.Y;
    }
    static Add(vector1, vector2) {
      return new _Vector2(vector1.X + vector2.X, vector1.Y + vector2.Y);
    }
    static Angle(vector1, vector2) {
      if (!_Vector2.Equals(vector1, _Vector2.Zero) && !_Vector2.Equals(vector1, _Vector2.Zero)) {
        return Math.acos(vector2.Dot(vector1, vector2) / (vector1.Magnitude() * vector2.Magnitude())) * MathConstants.RadianToDegrees;
      }
      return NaN;
    }
    static Dot(vector1, vector2) {
      return vector1.X * vector2.X + vector1.Y * vector2.Y;
    }
    static Distance(vector1, vector2) {
      return Math.sqrt(Math.pow(vector2.X - vector1.X, 2) + Math.pow(vector2.Y - vector1.Y, 2));
    }
    static Magnitude(vector) {
      return Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2));
    }
    static Normilize(vector) {
      let m = _Vector2.Magnitude(vector);
      return new _Vector2(vector.X / m, vector.Y / m);
    }
    static Scale(vector, number) {
      return new _Vector2(vector.X * number, vector.Y * number);
    }
    static LineNormal(vector1, vector2) {
      return new _Vector2(-(vector2.X - vector1.X), vector2.Y - vector1.Y);
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
  var myVec = Vector2.One;
  console.log(myVec.ToSting());
  console.log(Vector2.Dot(Vector2.Up, Vector2.One));
  console.log(Vector2.Angle(Vector2.One, Vector2.Up));
  console.log(Vector2.Angle(Vector2.Up, Vector2.Zero));
  console.log(Vector2.LineNormal(Vector2.Zero, Vector2.One.Scale(5)).ToSting());
  console.log(Vector2.Normilize(myVec).ToSting());
})();
