(() => {
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // source/Graphics/Canvas/Layer.ts
  var Layer = class {
    constructor(parent) {
      this.Canvas = document.createElement("canvas");
      this.Canvas.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%;");
      parent.append(this.Canvas);
      this.Canvas.width = 1920;
      this.Canvas.height = 1080;
      this.Context = this.Canvas.getContext("2d");
      let img2 = new Image();
      img2.src = "Res/img/1085818.jpg";
      this.Context.drawImage(img2, 0, 0);
    }
  };

  // source/Graphics/Canvas/Canvas.ts
  var Canvas = class {
    constructor(LayersCount) {
      this.Layers = [];
      this.LayersCount = LayersCount;
      this.canvas = document.querySelector("#game");
      this.WScale = 16;
      this.HScale = 9;
      this.updateSize();
      for (let i = 0; i < LayersCount; i++) {
        this.Layers.push(new Layer(this.canvas));
      }
      window.addEventListener("resize", () => this.updateSize());
    }
    updateSize() {
      let w = window.innerWidth / this.WScale;
      let h = window.innerHeight / this.HScale;
      let windowScale = Math.min(w, h);
      let WSize = windowScale * this.WScale;
      let HSize = windowScale * this.HScale;
      this.canvas.setAttribute("style", `width: ${WSize}px; height: ${HSize}px;`);
    }
    GetLayerContext(Layer2) {
      if (Layer2 >= 0 && Layer2 < this.LayersCount) {
        return this.Layers[Layer2].Context;
      }
      return null;
    }
  };

  // source/Math/MathConstants.ts
  var MathConstants = class {
  };
  MathConstants.RadianToDegrees = 180 / Math.PI;
  MathConstants.DegreesToRadian = Math.PI / 180;

  // source/Math/Vector2.ts
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
  var _onKeyDown, onKeyDown_fn, _onKeyUP, onKeyUP_fn, _onChangeFocus, onChangeFocus_fn, _SetKeyState, SetKeyState_fn;
  var _Input = class _Input {
    static Init() {
      document.onkeydown = __privateMethod(_Input, _onKeyDown, onKeyDown_fn);
      document.onkeyup = __privateMethod(_Input, _onKeyUP, onKeyUP_fn);
      window.addEventListener("blur", () => {
        var _a;
        __privateMethod(_a = _Input, _onChangeFocus, onChangeFocus_fn).call(_a);
      });
    }
    static GetKeyState(keyCode) {
      return this.activeKeys.includes(keyCode);
    }
  };
  _onKeyDown = new WeakSet();
  onKeyDown_fn = function(e) {
    var _a;
    __privateMethod(_a = _Input, _SetKeyState, SetKeyState_fn).call(_a, e, true);
  };
  _onKeyUP = new WeakSet();
  onKeyUP_fn = function(e) {
    var _a;
    __privateMethod(_a = _Input, _SetKeyState, SetKeyState_fn).call(_a, e, false);
  };
  _onChangeFocus = new WeakSet();
  onChangeFocus_fn = function() {
    _Input.activeKeys = [];
  };
  _SetKeyState = new WeakSet();
  SetKeyState_fn = function(e, state) {
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
  };
  __privateAdd(_Input, _onKeyDown);
  __privateAdd(_Input, _onKeyUP);
  __privateAdd(_Input, _onChangeFocus);
  __privateAdd(_Input, _SetKeyState);
  _Input.activeKeys = [];
  var Input = _Input;

  // source/Logic/Time.ts
  var _Time = class _Time {
    static Init() {
      _Time.prevTime = performance.now();
      _Time.curTime = performance.now();
      window.addEventListener("focus", () => _Time.OnFocus());
    }
    static Update() {
      _Time.curTime = performance.now();
      _Time.deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
      _Time.prevTime = _Time.curTime;
    }
    static OnFocus() {
      _Time.prevTime = performance.now();
      _Time.curTime = performance.now();
      _Time.Update();
    }
    static get DeltaTime() {
      return _Time.deltaTime;
    }
  };
  _Time.deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
  var Time = _Time;

  // source/Logic/Game.ts
  var Game = class {
    constructor(onStart, onUpdate, onStop, onStartPause, onClearPause) {
      this.ShouldStop = false;
      this.IsPause = false;
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
      window.requestAnimationFrame(this.Update.bind(this));
    }
    Update() {
      if (!this.ShouldStop) {
        Time.Update();
        console.log(Time.DeltaTime);
        this.onUpdate();
        window.requestAnimationFrame(this.Update.bind(this));
      }
    }
  };

  // source/Physics/Entity.ts
  var Entity = class {
    constructor(transform, Image2, Layer2) {
      this.IsActive = true;
      this.transform = transform;
      this.Image = Image2;
      this.Layer = Layer2;
    }
    Update(Entities2) {
    }
    GetCollider() {
      return [this.transform.Position, this.transform.Position.Add(this.transform.Size)];
    }
    Draw(Context, CameraPosition) {
      if (this.IsActive) {
        Context.drawImage(this.Image, this.transform.Position.X + CameraPosition.X, this.transform.Position.Y - CameraPosition.Y, this.transform.Size.X, this.transform.Position.Y);
      }
    }
    SetActive(value) {
      this.IsActive = value;
    }
  };

  // source/Physics/Transform.ts
  var Transform = class {
    constructor(Position, size) {
      this.Position = Vector2.Zero;
      this.Size = Vector2.One;
      this.Position = Position;
      this.Size = size;
    }
  };

  // source/Entities/Tile.ts
  var Tile = class extends Entity {
    constructor(position, size, Image2, Layer2) {
      super(new Transform(position, size), Image2, Layer2);
    }
    Draw(Context, Camera) {
      Context.drawImage(this.Image, this.transform.Position.X + Camera.X, this.transform.Position.Y - Camera.Y, this.transform.Size.X, this.transform.Size.Y);
    }
  };

  // source/Physics/Collisions.ts
  var Collisions = class {
    static AABBtoAABB(col1, col2) {
      let axmin = col1[0].X;
      let axmax = col1[1].X;
      let aymin = col1[0].Y;
      let aymax = col1[1].Y;
      let bxmin = col2[0].X;
      let bxmax = col2[1].X;
      let bymin = col2[0].Y;
      let bymax = col2[1].Y;
      if (axmin <= bxmax && bxmin <= axmax && aymin <= bymax && bymin <= aymax) {
        return true;
      } else {
        return false;
      }
    }
  };

  // source/Entities/Player.ts
  var Player = class extends Entity {
    constructor(position, size, Image2, Layer2) {
      super(new Transform(position, size), Image2, Layer2);
    }
    Update(Entities2) {
      Entities2.forEach((entity) => {
        if (!(entity === this)) {
          let t = 10;
          let Left = [new Vector2(this.transform.Position.X, this.transform.Position.Y + t), new Vector2(this.transform.Position.X, this.transform.Position.Y + this.transform.Size.Y - t)];
          let Right = [new Vector2(this.transform.Position.X + this.transform.Size.X, this.transform.Position.Y + t), new Vector2(this.transform.Position.X + this.transform.Size.X, this.transform.Position.Y + this.transform.Size.Y - t)];
          let Top = [new Vector2(this.transform.Position.X + t, this.transform.Position.Y), new Vector2(this.transform.Position.X + this.transform.Size.X - t, this.transform.Position.Y)];
          let Bottom = [new Vector2(this.transform.Position.X + t, this.transform.Position.Y + this.transform.Size.Y), new Vector2(this.transform.Position.X + this.transform.Size.X - t, this.transform.Position.Y + this.transform.Size.Y)];
          if (Collisions.AABBtoAABB(entity.GetCollider(), Left)) {
          }
          if (Collisions.AABBtoAABB(entity.GetCollider(), Right)) {
          }
          if (Collisions.AABBtoAABB(entity.GetCollider(), Top)) {
          }
          if (Collisions.AABBtoAABB(entity.GetCollider(), Bottom)) {
          }
        }
      });
    }
    Draw(Context, Camera) {
      Context.drawImage(this.Image, this.transform.Position.X + Camera.X, this.transform.Position.Y - Camera.Y, this.transform.Size.X, this.transform.Size.Y);
    }
  };

  // source/Entities/TileController.ts
  var TileController = class {
    constructor(tileSize, cameraHeight) {
      this.Layers = [];
      this.LoadedLayers = [];
      this.tileSize = tileSize;
      this.cameraHeight = cameraHeight;
    }
    GetLayer(Layer2) {
      if (Layer2 > -1) {
        if (Layer2 > this.Layers.length - 1) {
          for (let i = this.Layers.length; i <= Layer2; i++) {
            this.Layers.push([]);
          }
        }
        return this.Layers[Layer2];
      }
      return null;
    }
    UpdateLoadted(cameraPosH) {
      this.LoadedLayers = [];
      for (let i = cameraPosH; i < cameraPosH + this.cameraHeight; i += this.tileSize) {
        if (i > 0) {
          this.LoadedLayers.push(this.Layers[Math.floor(i / this.tileSize)]);
        }
      }
    }
  };

  // source/main.ts
  var TC = new TileController(100, 1920);
  var canvas = new Canvas(2);
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
  playerImg.src = "Res/img/player1.png";
  var pos = Vector2.Zero;
  var player = new Player(new Vector2(900, 450), new Vector2(100, 100), playerImg, 1);
  var Entities = [];
  for (let y = 6; y < 1e3; y++) {
    for (let x = -50; x < 50; x++) {
      if (y == 6) {
        TC.GetLayer(y).push(new Tile(new Vector2(0 + 100 * x, 100 * y), new Vector2(100, 100), tile1, 1));
      } else {
        TC.GetLayer(y).push(new Tile(new Vector2(0 + 100 * x, 100 * y), new Vector2(100, 100), tile2, 1));
      }
    }
  }
  window.onload = () => game.Start();
  var speed = 500;
  function Start() {
    canvas.updateSize();
  }
  function UpdateInput() {
    let stride = Vector2.Zero;
    if (Input.GetKeyState(65)) {
      stride = stride.Add(Vector2.Right.Scale(speed * Time.DeltaTime));
    }
    if (Input.GetKeyState(68)) {
      stride = stride.Add(Vector2.Left.Scale(speed * Time.DeltaTime));
    }
    if (Input.GetKeyState(87)) {
      stride = stride.Add(Vector2.Down.Scale(speed * Time.DeltaTime));
    }
    if (Input.GetKeyState(83)) {
      stride = stride.Add(Vector2.Up.Scale(speed * Time.DeltaTime));
    }
    if (stride.X > 0) {
      stride.X = Math.floor(stride.X);
    } else if (stride.X < 0) {
      stride.X = Math.ceil(stride.X);
    }
    if (stride.Y > 0) {
      stride.Y = Math.floor(stride.Y);
    } else if (stride.Y < 0) {
      stride.Y = Math.ceil(stride.Y);
    }
    pos = pos.Add(stride);
    player.transform.Position = player.transform.Position.Add(new Vector2(-stride.X, stride.Y));
  }
  function Update() {
    UpdateInput();
    TC.UpdateLoadted(pos.Y);
    canvas.GetLayerContext(1).clearRect(0, 0, 1920, 1080);
    Entities.forEach((tile) => {
      tile.Draw(canvas.GetLayerContext(tile.Layer), pos);
    });
    TC.LoadedLayers.forEach((layer) => {
      layer.forEach((entity) => {
        entity.Draw(canvas.GetLayerContext(entity.Layer), pos);
      });
    });
    player.Draw(canvas.GetLayerContext(player.Layer), pos);
  }
})();
