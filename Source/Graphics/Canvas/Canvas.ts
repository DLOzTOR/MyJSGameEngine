import { Layer } from "./Layer";
export class Canvas{
    Layers: Array<Layer> = [];
    LayersCount:number;
    canvas:HTMLDivElement;
    WScale:number; 
    HScale:number;
    constructor (LayersCount:number){
        this.LayersCount = LayersCount;
        this.canvas = document.querySelector("#game")!;
        this.WScale = 16;
        this.HScale = 9;
        this.updateSize();
        for(let i = 0; i < LayersCount; i++){
            this.Layers.push(new Layer(this.canvas));
        }
        window.addEventListener("resize", () => this.updateSize());
    }
    updateSize():void{
        let w:number = window.innerWidth/ this.WScale;
        let h:number = window.innerHeight/ this.HScale;   
        let windowScale:number = Math.min(w, h);
        let WSize =  windowScale * this.WScale;
        let HSize =  windowScale * this.HScale;
        this.canvas!.setAttribute("style", `width: ${WSize}px; height: ${HSize}px;`);
    }
    GetLayerContext(Layer: number): CanvasRenderingContext2D | null{
        if(Layer >= 0 && Layer < this.LayersCount){
            return this.Layers[Layer].Context;
        }
        return null;
    }
}