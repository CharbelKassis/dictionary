import ImageModel from "./image.model.js";
import ImageView from "./image.view.js";

export default class ImageController {

    constructor(){
        this.__search = document.getElementById("searchButton");
        this.__userInput = document.getElementById("userInput");
        this.__clear = document.getElementById("clearButton");
        this.__observers = [];
    }

    /**
     * @param {ImageModel} imageModel
     */
    set model(imageModel) {
        this.__model = imageModel;
        this.__model.subscribe(this);
        this.subscribe(this.__model);
    }

    /**
     * @param {ImageView} imageView
     */
    set view(imageView) {
        this.__view = imageView;
    }

    start() {
        document.addEventListener("DOMContentLoaded",()=>{
            //clear the images when a search is demanded or when clear button is pressed
            this.__userInput.addEventListener("keydown",e=>{
                if(e.key === "Enter") this.__model.images = [];
            });
            this.__search.addEventListener("click",e=>{
                this.__model.images = [];
            });
            this.__clear.addEventListener("click",e=>{
                this.__model.images = [];
            });
        });
    }

    subscribe(observer) {
        if(!this.__observers.includes(observer)) {
            this.__observers.push(observer);
        }
    }

    __notify(change) {
        this.__observers.forEach(observer=>{
            observer.update(change,this);
        });
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
}