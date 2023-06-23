import { Time } from "./Time";
export class Game{
    onStart: Function;
    onUpdate: Function;
    onStop: Function;
    onStartPause: Function;
    onClearPause: Function;
    ShouldStop:boolean = false;
    IsPause:boolean = false;
    constructor(onStart, onUpdate, onStop, onStartPause, onClearPause){
        this.onStart = onStart;
        this.onUpdate = onUpdate;
        this.onStop = onStop;
        this.onStartPause = onStartPause;
        this.onClearPause = onClearPause;
    }
    Start(): void{
        this.onStart();
        Time.Init();
        window.requestAnimationFrame(this.Update.bind(this));
    }
    Update(): void{
        if(!this.ShouldStop){
            Time.Update();
            this.onUpdate();
            window.requestAnimationFrame(this.Update.bind(this));
        }
    }
}