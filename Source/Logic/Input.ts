export class Input{
    static activeKeys:Array<number> = [];
    static Init():void{
        document.onkeydown = Input.#onKeyDown;
        document.onkeyup = Input.#onKeyUP;
        window.addEventListener("blur", () => {
            Input.#onChangeFocus();
        });
    }
    static #onKeyDown(e:KeyboardEvent):void{
        Input.#SetKeyState(e ,true);
    }    
    static #onKeyUP(e:KeyboardEvent):void{
        Input.#SetKeyState(e, false);
    }
    static #onChangeFocus():void{
        Input.activeKeys = [];
    }
    static #SetKeyState(e:KeyboardEvent, state:boolean):void{
        if(e.keyCode == 9){
            return;
        }
        if(state == true){
            if(!Input.activeKeys.includes(e.keyCode)){
                Input.activeKeys.push(e.keyCode);
            }
        }
        else{
            if(Input.activeKeys.includes(e.keyCode)){
                Input.activeKeys.splice(Input.activeKeys.indexOf(e.keyCode), 1);
            }
        }
    }
    static GetKeyState(keyCode:number):boolean{
        return this.activeKeys.includes(keyCode);
    }
}