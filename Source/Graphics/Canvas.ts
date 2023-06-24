import { Vector2 } from "../Math/Vector2";
export class Canvas{
    Layers:Array<HTMLDivElement> = [];
    LayersCount:number;
    canvas:HTMLCanvasElement;
    Context: CanvasRenderingContext2D;
    WScale:number; 
    HScale:number;
    Scale:number;
    WSize:number;
    HSize:number;
    constructor(widthScale:number, heightScale:number, LayersCount:number){
        this.LayersCount = LayersCount;
        this.canvas = document.querySelector("#game canvas")!;
        this.Context = this.canvas!.getContext("2d")!;
        this.WScale = widthScale;
        this.HScale = heightScale;
        this.Scale = 1;
        this.WSize = 0;
        this.HSize = 0;
        this.canvas.width  = 1920;
        this.canvas.height = 1080;
        this.updateSize();
        window.addEventListener("resize", () => this.updateSize());
    }
    updateSize():void{
        let w:number = window.innerWidth/ this.WScale;
        let h:number = window.innerHeight/ this.HScale;   
        let windowScale:number = Math.min(w, h);
        this.Scale = windowScale/120;
        this.WSize =  windowScale * this.WScale;
        this.HSize =  windowScale * this.HScale;
        this.canvas.width  = 1920;
        this.canvas.height = 1080;
        this.canvas!.setAttribute("style", `width: ${this.WSize}px; height: ${this.HSize}px;`);
    }
    AddElementToLeyer(DOMelement:HTMLElement, layer:number):boolean{
        return true;
    }
}