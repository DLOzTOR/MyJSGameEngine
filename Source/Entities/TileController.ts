import { Tile } from "./Tile";
export class TileController{
    Layers: Array<Array<Tile>> = [];
    LoadedLayers: Array<Array<Tile>> = [];
    tileSize: number;
    cameraHeight: number;
    constructor(tileSize: number, cameraHeight: number){
        this.tileSize = tileSize;
        this.cameraHeight = cameraHeight;
    }
    GetLayer(Layer: number):Array<Tile> | null{
        if(Layer > -1){
            if(Layer > this.Layers.length - 1){
                for(let i = this.Layers.length; i <= Layer; i++){
                    this.Layers.push([]);
                }
            }
            return this.Layers[Layer];
        }
        return null;
    }
    UpdateLoadted(cameraPosH: number){
        this.LoadedLayers = [];
        for(let i = cameraPosH; i < cameraPosH + this.cameraHeight; i += this.tileSize){
            if(i > 0){
                this.LoadedLayers.push(this.Layers[Math.floor(i/this.tileSize)]);
            }
        }
    }
}