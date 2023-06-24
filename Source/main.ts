import { Canvas } from "./Graphics/Canvas";
import { Vector2 } from "./Math/Vector2";
import { Input } from "./Logic/Input"; 
import { Game } from "./Logic/Game";
import { Time } from "./Logic/Time";
import { Tile } from "./Entities/Tile";
let canvas:Canvas = new Canvas(16, 9, 5);
let game = new Game(Start,Update, ()=>{},()=>{},()=>{});
let img = new Image();
img.src = "Res/img/1085818.jpg";
let tile1 = new Image();
tile1.src = "Res/img/Tile1.png";
let tile2 = new Image();
tile2.src = "Res/img/Tile2.png";
let playerImg = new Image();
playerImg.src = "Res/img/idel1.png";
canvas.Context.scale(0.1,0.1);
canvas.Context.drawImage(img, 0, 0,)
setInterval(Update, 16)
let pos:Vector2 = Vector2.Zero;

let Tiles: Array<Tile> = [];

for(let x = 0; x < 20; x++){
    for(let y = 0; y < 5; y++){
        if(y == 0){
            Tiles.push(new Tile(new Vector2(0 + 100 * x ,600 + 100 * y), tile1));
        }
        else{
            Tiles.push(new Tile(new Vector2(0 + 100 * x ,600 + 100 * y), tile2));
        }
    }
}

window.onload = ()=> game.Start();
let speed = 300;
function Start(){
    canvas.updateSize();
}
let Player = new Tile(new Vector2(800,500), playerImg);
function Update(){
    canvas.Context.clearRect(0 , 0, 1920, 1080);
    canvas.Context.save();
    canvas.Context.drawImage(img, 0, 0);
    Player.Draw(canvas.Context, Vector2.Zero);
    Tiles.forEach(tile => {
        tile.Draw(canvas.Context, pos);
    });
    if(Input.GetKeyState(65)){
        pos = pos.Add(Vector2.Right.Scale(speed * 0.016))
    }
    if(Input.GetKeyState(68)){
        pos = pos.Add(Vector2.Left.Scale(speed * 0.016))
    }
    pos = new Vector2(Math.floor(pos.X), Math.floor(pos.Y));
    canvas.Context.restore();
}