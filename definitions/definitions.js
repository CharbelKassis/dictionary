import Dictionary from "../dictionary/dictionary.js";
import DefinitionsController from "./definitions.controller.js";
import DefinitionsModel from "./definitions.model.js";
import DefinitionsView from "./definitions.view.js";

export default class Definitions {

    /**
     * 
     * @param {Dictionary[]} dictionaries 
     */
    constructor(dictionaries) {
        this.model = new DefinitionsModel(dictionaries);
        this.view = new DefinitionsView();
        this.controller = new DefinitionsController();

        this.controller.model = this.model;
        this.controller.view = this.view;
    }

    start() {
        this.controller.start();
    }

}