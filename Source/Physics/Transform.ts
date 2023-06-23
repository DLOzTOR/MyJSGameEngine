import { Vector2 } from "../Math/Vector2";
export class Transform{
    Position: Vector2 = Vector2.Zero;
    private rotation: number = 0;
    constructor(Position: Vector2, Rotation: number){
        this.Position = Position;
        this.rotation = Rotation;
    }
    get Rotation(): number{
        return this.rotation;
    }
    set Rotation(value: number){
        if(value > 360){
            this.rotation = value % 360;
        }
        else if(value < 360){
            value = value % 360;
            this.rotation = 360 + value;
        }
        else{
            this.rotation = value;
        }
    }
} 