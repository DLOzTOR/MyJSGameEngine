import { Time } from "./Time";
import { Input } from "./Input";
export class Game{
    onStart: Function;
    onUpdate: Function;
    onStop: Function;
    onStartPause: Function;
    onClearPause: Function;
    ShouldStop:boolean = false;
    IsPause:boolean = false;
    constructor(onStart: Function, onUpdate: Function, onStop: Function, onStartPause: Function, onClearPause: Function){
        this.onStart = onStart;
        this.onUpdate = onUpdate;
        this.onStop = onStop;
        this.onStartPause = onStartPause;
        this.onClearPause = onClearPause;
    }
    Start(): void{
        this.onStart();
        Time.Init();
        Input.Init();
        window.requestAnimationFrame(this.Update.bind(this));
    }
    Update(): void{
        if(!this.ShouldStop){
            Time.Update();
            console.log(Time.DeltaTime);
            this.onUpdate();
            window.requestAnimationFrame(this.Update.bind(this));
        }
    }
}