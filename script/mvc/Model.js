import Observer from "./Observer.js";

/* The Model abstract class implements the Observer design pattern to communicate and keep up to date with the controller and view. It uses a two-way communication by being the Observer and the Subject at the same time. */
export default class Model extends Observer {

    constructor() {
        super();
    }

}