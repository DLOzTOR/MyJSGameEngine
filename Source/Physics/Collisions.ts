import { Colliders } from "./Colliders";

export class Collisions{
    static AABBtoAABB(col1: Colliders.AABBCollider, col2: Colliders.AABBCollider): boolean{
        let axmin = col1.Bottom.X;
        let axmax = col1.Top.X;
        let aymin = col1.Bottom.Y;
        let aymax = col1.Top.Y;
        let bxmin = col2.Bottom.X;
        let bxmax = col2.Top.X;
        let bymin = col2.Bottom.Y;
        let bymax = col2.Top.Y;
        if(axmin <= bxmax && bxmin <= axmax && aymin <= bymax && bymin <= aymax){
            return true;
        }
        else{
            return false;
        }
    }
}