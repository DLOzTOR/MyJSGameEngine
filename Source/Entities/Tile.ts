import { Vector2 } from "../Math/Vector2";

export class Tile{
    position: Vector2;
    img: HTMLImageElement;
    constructor(position: Vector2, img: HTMLImageElement){
        this.position = position;
        this.img = img;
    }
    Draw(Context:CanvasRenderingContext2D, Camera: Vector2){
        Context.drawImage(this.img,this.position.X + Camera.X,this.position.Y + Camera.Y, 100, 100);
    }
}