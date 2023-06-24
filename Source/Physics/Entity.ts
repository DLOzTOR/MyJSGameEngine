import { Transform } from "./Transform";
import { Vector2 } from "../Math/Vector2";
import { Colliders } from "./Colliders";
export abstract class Entity{
    transform: Transform;
    collider: Colliders.Collider;
    velocity: Vector2;
    DOMelement: ;
    Active: boolean;
    constructor(transform: Transform, collider: Colliders.Collider, velocity: Vector2, DOMelement: HTMLDivElement, Active: boolean){
        this.transform = transform;
        this.collider = collider;
        this.velocity = velocity;
        this.DOMelement = DOMelement;
        this.Active = Active;
    }
    Update(): void{

    }
    Draw(context: CanvasRenderingContext2D):void{
        
    }
    SetActive(value: boolean): void{
        this.Active = value;
    }
}