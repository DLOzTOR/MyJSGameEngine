import { MathConstants } from "./MathConstants";
export class Vector2{
    X:number;
    Y:number;
    constructor(X: number,Y: number){
        this.X = X;
        this.Y = Y;
    }
    Add(vector:Vector2):Vector2{
        return Vector2.Add(this, vector);
    }
    Angle(vector:Vector2):number{
        return Vector2.Angle(this, vector);
    }
    Dot(vector:Vector2):number{
        return Vector2.Dot(this, vector);
    }
    Rotate(angle:number):Vector2{
        return Vector2.Rotate(this, angle);
    }
    Magnitude():number{
        return Vector2.Magnitude(this);
    }
    Normilize():Vector2{
        return Vector2.Normilize(this);
    }
    Equals(vector:Vector2):boolean{
        return Vector2.Equals(this, vector);
    }
    ToSting():string{
        return `X: ${this.X}; Y: ${this.Y}`;
    }
    Scale(number:number):Vector2{
        return Vector2.Scale(this, number);
    }
    Set(X:number, Y:number):void{
        this.X = X;
        this.Y = Y;
    }
    static get Zero():Vector2{
        return new Vector2(0, 0);
    }    
    static get One():Vector2{
        return new Vector2(1, 1);
    }
    static get Right():Vector2{
        return new Vector2(1, 0);
    }
    static get Left():Vector2{
        return new Vector2(-1, 0);
    }
    static get Up():Vector2{
        return new Vector2(0, 1);
    }
    static get Down():Vector2{
        return new Vector2(0, -1);
    }
    static Equals(vector1:Vector2, vector2:Vector2):boolean{
        return (vector1.X == vector2.X && vector1.Y == vector2.Y);
    }
    static Add(vector1:Vector2, vector2:Vector2):Vector2{
        return new Vector2(vector1.X + vector2.X, vector1.Y + vector2.Y);
    }
    static Angle(vector1:Vector2, vector2:Vector2):number{
        if(!Vector2.Equals(vector1, Vector2.Zero) && !Vector2.Equals(vector1, Vector2.Zero)){    
            return Math.acos(Vector2.Dot(vector1, vector2) / (vector1.Magnitude() * vector2.Magnitude())) * MathConstants.RadianToDegrees;
        }
        return NaN;
    }
    static Dot(vector1:Vector2, vector2:Vector2):number{
        return vector1.X * vector2.X + vector1.Y * vector2.Y;
    }
    static Distance(vector1:Vector2, vector2:Vector2):number{
        return Math.sqrt(Math.pow(vector2.X - vector1.X, 2) + Math.pow(vector2.Y - vector1.Y, 2));
    }
    static Magnitude(vector:Vector2):number{
        return Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2));
    }
    static Normilize(vector:Vector2):Vector2{
        let m = Vector2.Magnitude(vector);
        return new Vector2(vector.X / m, vector.Y / m);
    }
    static Scale(vector:Vector2, number:number):Vector2{
        return new Vector2(vector.X * number, vector.Y * number);
    }
    static LineNormal(vector1:Vector2, vector2:Vector2):Vector2{
        return new Vector2(-(vector2.X - vector1.X), (vector2.Y - vector1.Y));
    }
    static Rotate(vector:Vector2, angle:number):Vector2{
        angle = angle * MathConstants.DegreesToRadian;
        let m = vector.Magnitude();
        vector = vector.Normilize();
        return new Vector2(Math.cos(angle) * m, Math.sin(angle) * m);
    }
}