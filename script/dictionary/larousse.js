import Dictionary from "./dictionary.js"

export default class Larousse extends Dictionary {
    
    constructor() {
        super("https://www.larousse.fr/dictionnaires/francais/");
    }

    /**
     * 
     * @param {Document} html
     * @return {String[]} 
     */
    __extractDefinitions(html) {
        const nodeList = html.querySelectorAll(".DivisionDefinition,.Locution");
        return [...nodeList].map(node => node.textContent);
    }

    get name() {
        return "larousse";
    }

    get language() {
        return "fr";
    }
}