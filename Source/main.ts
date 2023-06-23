import { Canvas } from "./Graphics/Canvas";
import { Vector2 } from "./Math/Vector2";
import { Transform } from "./Physics/Transform";
let canvas:Canvas = new Canvas(16, 9, 5);
let colors:Array<string> = ["blue", "red", "green", "yellow", "violet"];
for(let i:number = 0; i < 5; i++){
    let elem:any = document.createElement("div");
    elem.setAttribute("style", `width: 40%; height: 40%; top: ${15 + 5 * i}%; left: ${10 + 10 * i}%; background-color: ${colors[i]};`);
    canvas.AddElementToLeyer(elem, i);
}

let transf: Transform = new Transform(Vector2.Zero, 0);
transf.Rotation = 370;
console.log(transf.Rotation);
transf.Rotation = -10;
console.log(transf.Rotation);
