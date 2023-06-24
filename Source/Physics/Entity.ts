import { Transform } from "./Transform";
import { Vector2 } from "../Math/Vector2";
export abstract class Entity{
    transform: Transform;
    IsActive: boolean = true;
    Image: HTMLImageElement; 
    constructor(transform: Transform, Image: HTMLImageElement, Layer: number){
        this.transform = transform;
        this.Image = Image;
    }
    Update(): void{

    }
    Draw(Context: CanvasRenderingContext2D, CameraPosition: Vector2):void{
        if(this.IsActive){
            Context.drawImage(this.Image, this.transform.Position.X + CameraPosition.X, this.transform.Position.Y  + CameraPosition.Y, this.transform.Size.X, this.transform.Position.Y);
        }
    }
    SetActive(value: boolean): void{
        this.IsActive = value;
    }
}