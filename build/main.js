(() => {
  // source/Graphics/Canvas.ts
  var Canvas = class {
    Layers = [];
    LayersCount;
    Game;
    WScale;
    HScale;
    Scale;
    WSize;
    HSize;
    constructor(widthScale, heightScale, LayersCount) {
      this.LayersCount = LayersCount;
      this.Game = document.querySelector("#game");
      this.WScale = widthScale;
      this.HScale = heightScale;
      this.Scale = 1;
      this.WSize = 0;
      this.HSize = 0;
      this.#updateSize();
      window.addEventListener("resize", () => this.#updateSize());
      for (let i = 0; i < LayersCount; i++) {
        let layer = document.createElement("div");
        layer.className = `layer layer${i}`;
        this.Game.append(layer);
        this.Layers.push(layer);
      }
    }
    #updateSize() {
      let w = window.innerWidth / this.WScale;
      let h = window.innerHeight / this.HScale;
      let windowScale = Math.min(w, h);
      this.Scale = windowScale / 120;
      this.WSize = windowScale * this.WScale;
      this.HSize = windowScale * this.HScale;
      this.Game.setAttribute("style", `width: ${this.WSize}px; height: ${this.HSize}px;`);
    }
    AddElementToLeyer(DOMelement, layer) {
      if (layer < 0 || layer > this.LayersCount - 1) {
        return false;
      }
      this.Layers[layer].append(DOMelement);
      return true;
    }
  };

  // source/Math/MathConstants.ts
  var MathConstants = class {
    static RadianToDegrees = 180 / Math.PI;
    static DegreesToRadian = Math.PI / 180;
  };

  // source/Math/Vector2.ts
  var Vector2 = class _Vector2 {
    X;
    Y;
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
    Rotate(angle) {
      return _Vector2.Rotate(this, angle);
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
        return Math.acos(_Vector2.Dot(vector1, vector2) / (vector1.Magnitude() * vector2.Magnitude())) * MathConstants.RadianToDegrees;
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
    static Rotate(vector, angle) {
      angle = angle * MathConstants.DegreesToRadian;
      let m = vector.Magnitude();
      vector = vector.Normilize();
      return new _Vector2(Math.cos(angle) * m, Math.sin(angle) * m);
    }
  };

  // source/Physics/Colliders.ts
  var Colliders;
  ((Colliders2) => {
    class Collider {
      colliderType;
      constructor(colliderType) {
        this.colliderType = colliderType;
      }
    }
    Colliders2.Collider = Collider;
    class AABBCollider extends Collider {
      Top;
      Bottom;
      //top - highest right point, bottom - bottom left point  
      constructor(bottom, top) {
        super(0 /* AABB */);
        this.Top = top;
        this.Bottom = bottom;
      }
    }
    Colliders2.AABBCollider = AABBCollider;
    let ColliderType;
    ((ColliderType2) => {
      ColliderType2[ColliderType2["AABB"] = 0] = "AABB";
      ColliderType2[ColliderType2["Polygone"] = 1] = "Polygone";
      ColliderType2[ColliderType2["Circule"] = 2] = "Circule";
    })(ColliderType = Colliders2.ColliderType || (Colliders2.ColliderType = {}));
  })(Colliders || (Colliders = {}));

  // source/Physics/Collisions.ts
  var Collisions = class {
    static AABBtoAABB(col12, col22) {
      let axmin = col12.Bottom.X;
      let axmax = col12.Top.X;
      let aymin = col12.Bottom.Y;
      let aymax = col12.Top.Y;
      let bxmin = col22.Bottom.X;
      let bxmax = col22.Top.X;
      let bymin = col22.Bottom.Y;
      let bymax = col22.Top.Y;
      if (axmin <= bxmax && bxmin <= axmax && aymin <= bymax && bymin <= aymax) {
        return true;
      } else {
        return false;
      }
    }
  };

  // source/Physics/Transform.ts
  var Transform = class {
    Position = Vector2.Zero;
    rotation = 0;
    constructor(Position, Rotation) {
      this.Position = Position;
      this.rotation = Rotation;
    }
    get Rotation() {
      return this.rotation;
    }
    set Rotation(value) {
      if (value > 360) {
        this.rotation = value % 360;
      } else if (value < 360) {
        value = value % 360;
        this.rotation = 360 + value;
      } else {
        this.rotation = value;
      }
    }
  };

  // source/main.ts
  var canvas = new Canvas(16, 9, 5);
  var colors = ["blue", "red", "green", "yellow", "violet"];
  for (let i = 0; i < 5; i++) {
    let elem = document.createElement("div");
    elem.setAttribute("style", `width: 40%; height: 40%; top: ${15 + 5 * i}%; left: ${10 + 10 * i}%; background-color: ${colors[i]};`);
    canvas.AddElementToLeyer(elem, i);
  }
  var transf = new Transform(Vector2.Zero, 0);
  transf.Rotation = 370;
  console.log(transf.Rotation);
  transf.Rotation = -10;
  console.log(transf.Rotation);
  var col1 = new Colliders.AABBCollider(Vector2.Zero, Vector2.One);
  var col2 = new Colliders.AABBCollider(Vector2.Zero, Vector2.One);
  console.log(Collisions.AABBtoAABB(col1, col2));
})();
