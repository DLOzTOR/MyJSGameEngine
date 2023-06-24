(() => {
  // source/Graphics/Canvas.ts
  var Canvas = class {
    Layers = [];
    LayersCount;
    canvas;
    Context;
    WScale;
    HScale;
    Scale;
    WSize;
    HSize;
    constructor(widthScale, heightScale, LayersCount) {
      this.LayersCount = LayersCount;
      this.canvas = document.querySelector("#game");
      this.Context = this.canvas.getContext("2d");
      this.WScale = widthScale;
      this.HScale = heightScale;
      this.Scale = 1;
      this.WSize = 0;
      this.HSize = 0;
      this.canvas.width = 1920;
      this.canvas.height = 1080;
      this.updateSize();
      window.addEventListener("resize", () => this.updateSize());
    }
    updateSize() {
      let w = window.innerWidth / this.WScale;
      let h = window.innerHeight / this.HScale;
      let windowScale = Math.min(w, h);
      this.Scale = windowScale / 120;
      this.WSize = windowScale * this.WScale;
      this.HSize = windowScale * this.HScale;
      this.canvas.width = 1920;
      this.canvas.height = 1080;
      this.canvas.setAttribute("style", `width: ${this.WSize}px; height: ${this.HSize}px;`);
    }
    AddElementToLeyer(DOMelement, layer) {
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

  // source/Logic/Input.ts
  var Input = class _Input {
    static activeKeys = [];
    static Init() {
      document.onkeydown = _Input.#onKeyDown;
      document.onkeyup = _Input.#onKeyUP;
      window.addEventListener("blur", () => {
        _Input.#onChangeFocus();
      });
    }
    static #onKeyDown(e) {
      _Input.#SetKeyState(e, true);
    }
    static #onKeyUP(e) {
      _Input.#SetKeyState(e, false);
    }
    static #onChangeFocus() {
      _Input.activeKeys = [];
    }
    static #SetKeyState(e, state) {
      if (e.keyCode == 9) {
        return;
      }
      if (state == true) {
        if (!_Input.activeKeys.includes(e.keyCode)) {
          _Input.activeKeys.push(e.keyCode);
        }
      } else {
        if (_Input.activeKeys.includes(e.keyCode)) {
          _Input.activeKeys.splice(_Input.activeKeys.indexOf(e.keyCode), 1);
        }
      }
    }
    static GetKeyState(keyCode) {
      return this.activeKeys.includes(keyCode);
    }
  };

  // source/Logic/Time.ts
  var Time = class _Time {
    static prevTime;
    static curTime;
    static deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
    static Init() {
      _Time.prevTime = performance.now();
      _Time.curTime = performance.now();
    }
    static Update() {
      _Time.curTime = performance.now();
      _Time.deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
      _Time.prevTime = _Time.curTime;
    }
    static get DeltaTime() {
      return _Time.deltaTime;
    }
  };

  // source/Logic/Game.ts
  var Game = class {
    onStart;
    onUpdate;
    onStop;
    onStartPause;
    onClearPause;
    ShouldStop = false;
    IsPause = false;
    constructor(onStart, onUpdate, onStop, onStartPause, onClearPause) {
      this.onStart = onStart;
      this.onUpdate = onUpdate;
      this.onStop = onStop;
      this.onStartPause = onStartPause;
      this.onClearPause = onClearPause;
    }
    Start() {
      this.onStart();
      Time.Init();
      Input.Init();
    }
    Update() {
      if (!this.ShouldStop) {
        Time.Update();
        this.onUpdate();
        window.requestAnimationFrame(this.Update.bind(this));
      }
    }
  };

  // source/Entities/Tile.ts
  var Tile = class {
    position;
    img;
    constructor(position, img2) {
      this.position = position;
      this.img = img2;
    }
    Draw(Context, Camera) {
      Context.drawImage(this.img, this.position.X + Camera.X, this.position.Y + Camera.Y, 100, 100);
    }
  };

  // source/main.ts
  var canvas = new Canvas(16, 9, 5);
  var game = new Game(Start, Update, () => {
  }, () => {
  }, () => {
  });
  var img = new Image();
  img.src = "Res/img/1085818.jpg";
  var tile1 = new Image();
  tile1.src = "Res/img/Tile1.png";
  var tile2 = new Image();
  tile2.src = "Res/img/Tile2.png";
  var playerImg = new Image();
  playerImg.src = "Res/img/idel1.png";
  canvas.Context.scale(0.1, 0.1);
  canvas.Context.drawImage(img, 0, 0);
  setInterval(Update, 16);
  var pos = Vector2.Zero;
  var Tiles = [];
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 5; y++) {
      if (y == 0) {
        Tiles.push(new Tile(new Vector2(0 + 100 * x, 600 + 100 * y), tile1));
      } else {
        Tiles.push(new Tile(new Vector2(0 + 100 * x, 600 + 100 * y), tile2));
      }
    }
  }
  window.onload = () => game.Start();
  var speed = 300;
  function Start() {
    canvas.updateSize();
  }
  var Player = new Tile(new Vector2(800, 500), playerImg);
  function Update() {
    canvas.Context.clearRect(0, 0, 1920, 1080);
    canvas.Context.save();
    canvas.Context.drawImage(img, 0, 0);
    Player.Draw(canvas.Context, Vector2.Zero);
    Tiles.forEach((tile) => {
      tile.Draw(canvas.Context, pos);
    });
    if (Input.GetKeyState(65)) {
      pos = pos.Add(Vector2.Right.Scale(speed * 0.016));
    }
    if (Input.GetKeyState(68)) {
      pos = pos.Add(Vector2.Left.Scale(speed * 0.016));
    }
    pos = new Vector2(Math.floor(pos.X), Math.floor(pos.Y));
    canvas.Context.restore();
  }
})();
