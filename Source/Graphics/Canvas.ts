export class Canvas{
    Layers:Array<HTMLDivElement> = [];
    LayersCount:number;
    Game:HTMLDivElement | null;
    WScale:number; 
    HScale:number;
    Scale:number;
    WSize:number;
    HSize:number;
    constructor(widthScale:number, heightScale:number, LayersCount:number){
        this.LayersCount = LayersCount;
        this.Game = document.querySelector("#game");
        this.WScale = widthScale;
        this.HScale = heightScale;
        this.Scale = 1;
        this.WSize = 0;
        this.HSize = 0;
        this.#updateSize();
        window.addEventListener("resize", () => this.#updateSize());
        for(let i = 0; i < LayersCount; i++){
            let layer = document.createElement("div");
            layer.className = `layer layer${i}`;
            this.Game!.append(layer);
            this.Layers.push(layer);
        }
    }
    #updateSize():void{
        let w:number = window.innerWidth/ this.WScale;
        let h:number = window.innerHeight/ this.HScale;   
        let windowScale:number = Math.min(w, h);
        this.Scale = windowScale/120;
        this.WSize =  windowScale * this.WScale;
        this.HSize =  windowScale * this.HScale;
        this.Game!.setAttribute("style", `width: ${this.WSize}px; height: ${this.HSize}px;`);
    }
    AddElementToLeyer(DOMelement:HTMLElement, layer:number):boolean{
        if(layer < 0 || layer > this.LayersCount - 1){
            return false;
        }
        this.Layers[layer].append(DOMelement);
        return true;
    }
}