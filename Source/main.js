import { Canvas } from "./Canvas.js";
let canvas = new Canvas(16, 9, 5);
let colors = ["blue", "red", "green", "yellow", "violet"];
for(let i = 0; i < 5; i++){
    let elem = document.createElement("div");
    elem.setAttribute("style", `width: 40%; height: 40%; top: ${15 + 5 * i}%; left: ${10 + 10 * i}%; background-color: ${colors[i]};`);
    canvas.AddElementToLeyer(elem, i);
}