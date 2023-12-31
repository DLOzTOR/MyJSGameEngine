export class Time{
    private static prevTime:number;
    private static curTime:number;
    private static deltaTime:number = (Time.curTime - Time.prevTime)/1000;
    static Init():void{
        Time.prevTime = performance.now();
        Time.curTime = performance.now();
    }
    static Update():void{
        Time.curTime = performance.now();
        Time.deltaTime = (Time.curTime - Time.prevTime)/1000;
        Time.prevTime = Time.curTime;
    }
    static get DeltaTime():number{
        return Time.deltaTime;
    }
}