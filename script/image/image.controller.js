import Controller from "../mvc/Controller.js";

export default class ImageController extends Controller {

    constructor(){
        super();
        this.__search = document.getElementById("searchButton");
        this.__userInput = document.getElementById("userInput");
        this.__clear = document.getElementById("clearButton");
    }

    update(message,subject) {
        switch(message) {
            case "images": {
                if(this.__model.images.length === 0)
                    this.__view.clearImages();
                else
                    this.__view.showImages(this.__model.images);
                break;
            }
            case "definitions": {
                if(subject.definitions.length > 0)
                    this.__notify({
                        word: subject.word,
                        lang: subject.language
                    });
            }
        }
    }

    __bootstrap() {
        //clear the images when a search is called or when clear button is pressed
        this.__userInput.addEventListener("keydown",e=>{
            if(e.key === "Enter") this.__model.images = [];
        });
        this.__search.addEventListener("click",e=>{
            this.__model.images = [];
        });
        this.__clear.addEventListener("click",e=>{
            this.__model.images = [];
        });
    }
}