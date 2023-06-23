import { Vector2 } from "../Math/Vector2";
export namespace Colliders{
    export abstract class Collider{
        colliderType: ColliderType;
        constructor(colliderType: ColliderType){
            this.colliderType = colliderType;
        }
    }
    export class AABBCollider extends Collider{
        Top: Vector2;
        Bottom: Vector2;
        //top - highest right point, bottom - bottom left point  
        constructor(bottom: Vector2, top: Vector2){
            super(ColliderType.AABB);
            this.Top = top;
            this.Bottom = bottom;
        }
    } 
    export enum ColliderType{
        AABB,
        Polygone,
        Circule,
    } 
}