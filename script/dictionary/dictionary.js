import storage from "../definitions/definitions.storage.js";

/**
 * Abstract class Dictionary. This class is used to return the definitions of a word by a specific dictionnary.
 * Because every dictionary website have different ways of showing their definitions, the constructor need to be overriden in the
 * subclasses in order to have the right URL. the protected method "__extractDefinition" also needs to be overriden in the subclasses
 * in order to give the right extraction instructions to the subclasses.
 */
export default class Dictionary {
    
    /**
     * @param {String} url 
     *
     */
    constructor(url) {
        this.__url = url;
        this.__storage = storage;
    }

    /**
     * 
     * @param {String} word
     * @return {Promise<String[]>}
     */
    getDefinitions(word) {  
        const defs = this.__storage.getDefinitions(word,this.name);
    
        if(defs === undefined || defs.length === 0) {
            return this.__fetchDefinitions(word).then(defs=>{
                this.__storage.setDefinitions(word,defs,this.name);
                return new Promise(resolve=>resolve(defs));
            });
        }
        else
            return new Promise(resolve=>resolve(defs))
    }

    /**
     * 
     * @param {String} word
     * @returns {Promise<String[]>}
     */
    async __fetchDefinitions(word) {
        try {
            var response = await fetch(this.__url+word);
        }
        catch(err) {
            if(window.console) window.console.clear(); //remove the CORS error
            const url = Dictionary.corsProxy+this.__url+word;
            response = await fetch(url, {
                method: "POST"
            });
        }
        const content = await response.text();
        const html = new DOMParser().parseFromString(content,"text/html");
        return this.__extractDefinitions(html);
    }

    /**
     * 
     * @param {Document} html
     * @returns {String[]}
     */
    __extractDefinitions(html) {
        throw new Error(Dictionary.abstractError);
    }

    get name() {
        throw new Error(Dictionary.abstractError);
    }

    get language() {
        throw new Error(Dictionary.abstractError);
    }

}

Dictionary.abstractError = "Abstract method. Must be implemented in a subclass.";
Dictionary.corsProxy = "/dictionary?q=";