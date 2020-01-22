import Observer from "./Observer.js";

/* The Controller abstract class implements the Observer design pattern to communicate and keep up to date with the model and view. It uses a two-way communication by being the Observer and the Subject at the same time. */
export default class Controller extends Observer {

    constructor() {
        super();
    }

    /**
     * @param {Model} model -The model associated with the Controller
     */
    set model(model) {
        this.__model = model;
        this.__model.subscribe(this);
        this.subscribe(this.__model);
    }

    /**
     * @return {Model}
     */
    get model() {
        return this.__model;
    }

    /**
     * @param {View} view -The view associated with the Controller
     */
    set view(view) {
        this.__view = view;
    }

    /**
     * @return {View}
     */
    get view() {
        return this.__view
    }

    /**
     * Bootstrap the controller, this is where you initiate the listeners on the DOM, bind view to the model or initiate values in the HTML.
     */
    start() {
        document.addEventListener("DOMContentLoaded",e=>{this.__bootstrap()});
    }

    /**
     * This protected method is the bootstrap method, it should be implemented for each Controller subclass.
     */
    __bootstrap() {
        throw new Error(Controller.abstractError);
    }
}

Controller.abstractError = "Abstract method. Must be implemented in a subclass.";