import Model from "./Model.js";
import View from "./View.js";
import Controller from "./Controller.js";

/**
 * This abstract class represents the MVC design pattern. Its role is to associate the Model, View and Controller together.
 */
export default class MVC {
    /**
     * 
     * @param {Model} model 
     * @param {View} view 
     * @param {Controller} controller 
     */
    constructor(model,view,controller) {
        this.model = model;
        this.view =  view;
        this.controller = controller;

        this.controller.model = this.model;
        this.controller.view = this.view;
    }

    /* Starting the MVC environment means bootstrapping the Controller */
    start() {
        this.controller.start();
    }
}