import Dictionary from "../dictionary/dictionary.js";
import DefinitionsController from "./definitions.controller.js";
import DefinitionsModel from "./definitions.model.js";
import DefinitionsView from "./definitions.view.js";
import MVC from "../mvc/MVC.js";

export default class Definitions extends MVC {

    /**
     * 
     * @param {Dictionary[]} dictionaries -The list of dictionaries
     */
    constructor(dictionaries) {
        super(new DefinitionsModel(dictionaries), new DefinitionsView(), new DefinitionsController());
    }
}