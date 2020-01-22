/**
 * This abstract class is actually the Observer and Subject design pattern combined together due to JavaScript's lack of interfaces and multi-inheritance support.
 */
export default class Observer {
    constructor() {
        this.__observers = [];
    }

    /*********************************************** Observer and Subject methods **********************************/
    subscribe(observer) {
        if(!this.__observers.includes(observer)) {
            this.__observers.push(observer);
        }
    }

    /**
     * 
     * @param {any} message 
     */
    __notify(message) {
        this.__observers.forEach(observer=>{
            observer.update(message,this);
        });
    }

    /**
     * 
     * @param {any} message -This message gives a hint to the observer on what have changed.
     * @param {Controller} subject -The subject that has changed.
     */
    update(message,subject) {
        throw new Error(Observer.abstractError);
    }
}

Observer.abstractError = "Abstract method. Must be implemented in a subclass.";