import DefinitionsModel from "./definitions.model.js";
import DefinitionsView from "./definitions.view.js";

export default class DefinitionsController {
    constructor() {
        this.__selectedDict = document.getElementById("selectedDictionary");
        this.__userInput = document.getElementById("userInput");
        this.__search = document.getElementById("searchButton");
        this.__clear = document.getElementById("clearButton");
        this.__observers = [];
    }

    /**
     * @param {DefinitionsModel} definitionsModel
     */
    set model(definitionsModel) {
        this.__model = definitionsModel;
        this.__model.subscribe(this);
        this.subscribe(this.__model);
    }

    /**
     * @return {DefinitionsModel}
     */
    get model() {
        return this.__model;
    }

    /**
     * @param {DefinitionsView} definitionsView
     */
    set view(definitionsView) {
        this.__view = definitionsView;
    }

    start() {
        document.addEventListener("DOMContentLoaded",()=>{
            /* Add main event listeners */
            this.__userInput.addEventListener("keydown",e=>{
                if(e.key === "Enter") this.__search.focus();
            });
            this.__search.addEventListener("click",e=>{
                this.__notify("definitions");
            });

            this.__view.addDictionaries(this.__model.dictionaryNames);

            /* Bind View to Model */
            this.__selectedDict.addEventListener("change",e=>{
                this.__model.currentDictionary = e.target.value;
            });
            this.__userInput.addEventListener("input",e=>{
                this.__model.word = e.target.value;
            });
            this.__clear.addEventListener("click",e=>{
                this.__model.definitions = [];
            })

            /* Init the values in the model */
            this.__model.currentDictionary = this.__selectedDict.value;
            this.__model.word = "";
            this.__model.definitions = [];
            
        });
    }

    subscribe(observer) {
        if(!this.__observers.includes(observer)) {
            this.__observers.push(observer);
        }
    }

    /**
     * 
     * @param {String} message 
     */
    __notify(message) {
        this.__observers.forEach(observer=>{
            observer.update(message,this);
        });
    }

    update(message,subject) {
        switch(message) {
            case "loading":
                this.__view.loading(this.__model.loading);break;
            case "definitions": {
                if(this.__model.definitions.length === 0)
                    this.__view.clearDefinitions();
                else
                    this.__view.showDefinitions(this.__model.definitions);
                break;
            }
            case "word":
                this.__view.word(this.__model.word);break;
                
        }
    }

}