import { Time } from "./Time.js";
import { Input } from "./Input.js";

let wScale = 16;
let hScale = 9;

let game = document.querySelector("#game");
let elem = document.querySelector(".rorate-me");
let text = document.querySelector("span.rot");
let frametime = document.querySelector("span.time");
let eng = 0;
let degToRad = Math.PI/180;
let speed = 200;
let rotateSpeed = 60;
let scale = 1;
let wSize = document.querySelector("#game").clientWidth;
let hSize =  document.querySelector("#game").clientHeight;
UpdateSize();
console.log(document.querySelector("#game").clientWidth);


window.onresize = UpdateSize;

function UpdateSize(){
    console.log(`Width: ${window.innerWidth}; Heigth ${window.innerHeight}`);
    let w = window.innerWidth/wScale;
    let h = window.innerHeight/hScale;   
    let windowScale = Math.min(w, h);
    scale = windowScale/120;
    wSize =  windowScale * wScale;
    hSize =  windowScale * hScale;
    game.setAttribute("style", `width: ${wSize}px; height: ${hSize}px;`);
}

function Update(){
    let tSpeed = speed * scale;
    Time.UpdateTime();
    text.innerText = "Engle: " + eng;
    frametime.innerText = "Frame time: " + Time.DeltaTime;
    if(Input.GetKeyState(65)){
        eng -= rotateSpeed * Time.DeltaTime;
        elem.style.transform= `rotate(${eng}deg)`;
    }
    if(Input.GetKeyState(68)){
        eng += rotateSpeed * Time.DeltaTime;
        elem.style.transform= `rotate(${eng}deg)`;
    }
    if(Input.GetKeyState(87)){
        elem.style.left =  `${(elem.offsetLeft  + (tSpeed * Math.cos(eng * degToRad) * Time.DeltaTime)) / (wSize / 100)}%`;
        elem.style.top =  `${(elem.offsetTop  + (tSpeed * Math.sin(eng * degToRad) * Time.DeltaTime)) / (hSize / 100)}%`;
    }
    if(Input.GetKeyState(83)){
        elem.style.left =  `${(elem.offsetLeft  - (tSpeed * Math.cos(eng * degToRad) * Time.DeltaTime)) / (wSize / 100)}%`;
        elem.style.top =  `${(elem.offsetTop  - (tSpeed * Math.sin(eng * degToRad) * Time.DeltaTime)) / (hSize / 100)}%`;
    }
    if(eng > 360){
        eng = 0;
    }
    else if(eng < 0){
        eng = 360;
    }
    console.log(wSize);
    window.requestAnimationFrame(Update);
}


Input.Init();
Time.Init();
window.requestAnimationFrame(Update);