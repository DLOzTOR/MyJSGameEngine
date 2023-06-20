import { Canvas } from "./Graphics/Canvas";
import { Vector2 } from "./Math/Vector2";
let canvas:Canvas = new Canvas(16, 9, 5);
let colors:Array<string> = ["blue", "red", "green", "yellow", "violet"];
for(let i:number = 0; i < 5; i++){
    let elem:any = document.createElement("div");
    elem.setAttribute("style", `width: 40%; height: 40%; top: ${15 + 5 * i}%; left: ${10 + 10 * i}%; background-color: ${colors[i]};`);
    canvas.AddElementToLeyer(elem, i);
}

let myVec:Vector2 = Vector2.One;
console.log(myVec.ToSting());
console.log(Vector2.Dot(Vector2.Up, Vector2.One));
console.log(Vector2.Angle(Vector2.One, Vector2.Up));
console.log(Vector2.Angle(Vector2.Up, Vector2.Zero));
console.log(Vector2.LineNormal(Vector2.Zero, Vector2.One.Scale(5)).ToSting());
console.log(Vector2.Rotate(Vector2.One, 135).ToSting());
console.log(Vector2.Normilize(myVec).ToSting());