import { Vector2 } from "../Math/Vector2";
export class Transform{
    Position: Vector2 = Vector2.Zero;
    Size: Vector2 = Vector2.One;
    constructor(Position: Vector2, size: Vector2){
        this.Position = Position;
        this.Size = size;
    }
} 