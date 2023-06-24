import { Vector2 } from "../Math/Vector2";
import { Entity } from "../Physics/Entity";
import { Transform } from "../Physics/Transform";

export class Tile extends Entity{
    constructor(position: Vector2, size: Vector2,Image: string, Layer: number){
        super(new Transform(position, size), Image, Layer);
    }
    Draw(Context:CanvasRenderingContext2D, Camera: Vector2){
        Context.drawImage(this.Image, this.transform.Position.X + Camera.X,this.transform.Position.Y - Camera.Y, this.transform.Size.X, this.transform.Size.Y);
    }
}