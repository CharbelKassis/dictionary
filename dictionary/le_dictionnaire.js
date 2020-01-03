import Dictionary from "./dictionary.js";

export default class LeDictionnaire extends Dictionary {
    
    constructor() {
        super("https://www.le-dictionnaire.com/definition/");
    }

    /**
     * 
     * @param {Document} html
     * @return {String[]} 
     */
    __extractDefinitions(html) {
        const nodeList = html.querySelectorAll(".defbox li");
        return [...nodeList].map(node => node.textContent.trim());
    }

    get name() {
        return "le-dictionnaire";
    }

    get language() {
        return "fr";
    }
}