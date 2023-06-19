(() => {
  // source/Time.js
  var Time = class _Time {
    static #prevTime;
    static #curTime;
    static #deltaTime = (_Time.#curTime - _Time.#prevTime) / 1e3;
    static Init() {
      _Time.#prevTime = performance.now();
      _Time.#curTime = performance.now();
    }
    static UpdateTime() {
      _Time.#curTime = performance.now();
      _Time.#deltaTime = (_Time.#curTime - _Time.#prevTime) / 1e3;
      _Time.#prevTime = _Time.#curTime;
    }
    static get DeltaTime() {
      return _Time.#deltaTime;
    }
  };

  // source/Input.js
  var Input = class _Input {
    static #activeKeys = [];
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
      _Input.#activeKeys = [];
    }
    static #SetKeyState(e, state) {
      if (e.keyCode == 9) {
        return;
      }
      if (state == true) {
        if (!_Input.#activeKeys.includes(e.keyCode)) {
          _Input.#activeKeys.push(e.keyCode);
        }
      } else {
        if (_Input.#activeKeys.includes(e.keyCode)) {
          _Input.#activeKeys.splice(_Input.#activeKeys.indexOf(e.keyCode), 1);
        }
      }
    }
    static GetKeyState(keyCode) {
      return this.#activeKeys.includes(keyCode);
    }
  };

  // source/main.js
  var wScale = 16;
  var hScale = 9;
  var game = document.querySelector("#game");
  var elem = document.querySelector(".rorate-me");
  var text = document.querySelector("span.rot");
  var frametime = document.querySelector("span.time");
  var eng = 0;
  var degToRad = Math.PI / 180;
  var speed = 200;
  var rotateSpeed = 60;
  var scale = 1;
  var wSize = document.querySelector("#game").clientWidth;
  var hSize = document.querySelector("#game").clientHeight;
  UpdateSize();
  console.log(document.querySelector("#game").clientWidth);
  window.onresize = UpdateSize;
  function UpdateSize() {
    console.log(`Width: ${window.innerWidth}; Heigth ${window.innerHeight}`);
    let w = window.innerWidth / wScale;
    let h = window.innerHeight / hScale;
    let windowScale = Math.min(w, h);
    scale = windowScale / 120;
    wSize = windowScale * wScale;
    hSize = windowScale * hScale;
    game.setAttribute("style", `width: ${wSize}px; height: ${hSize}px;`);
  }
  function Update() {
    let tSpeed = speed * scale;
    Time.UpdateTime();
    text.innerText = "Engle: " + eng;
    frametime.innerText = "Frame time: " + Time.DeltaTime;
    if (Input.GetKeyState(65)) {
      eng -= rotateSpeed * Time.DeltaTime;
      elem.style.transform = `rotate(${eng}deg)`;
    }
    if (Input.GetKeyState(68)) {
      eng += rotateSpeed * Time.DeltaTime;
      elem.style.transform = `rotate(${eng}deg)`;
    }
    if (Input.GetKeyState(87)) {
      elem.style.left = `${(elem.offsetLeft + tSpeed * Math.cos(eng * degToRad) * Time.DeltaTime) / (wSize / 100)}%`;
      elem.style.top = `${(elem.offsetTop + tSpeed * Math.sin(eng * degToRad) * Time.DeltaTime) / (hSize / 100)}%`;
    }
    if (Input.GetKeyState(83)) {
      elem.style.left = `${(elem.offsetLeft - tSpeed * Math.cos(eng * degToRad) * Time.DeltaTime) / (wSize / 100)}%`;
      elem.style.top = `${(elem.offsetTop - tSpeed * Math.sin(eng * degToRad) * Time.DeltaTime) / (hSize / 100)}%`;
    }
    if (eng > 360) {
      eng = 0;
    } else if (eng < 0) {
      eng = 360;
    }
    console.log(wSize);
    window.requestAnimationFrame(Update);
  }
  Input.Init();
  Time.Init();
  window.requestAnimationFrame(Update);
})();
