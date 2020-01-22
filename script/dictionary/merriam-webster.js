import Dictionary from "./dictionary.js";

export default class MerriamWebster extends Dictionary {

    constructor() {
        super("https://www.merriam-webster.com/dictionary/");
    }

    /**
     * 
     * @param {Document} html
     * @return {String[]} 
     */
    __extractDefinitions(html) {
        const nodeList = html.querySelectorAll(".dtText");
        return [...nodeList]
            .filter(node=>
                node.querySelectorAll(".ex-sent.first-child.t.no-aq.sents, .dx-jump").length === 0
            )
            .map(node=>node.textContent.replace(": ",""));
    }

    get name() {
        return "merriam-webster";
    }

    get language() {
        return "en";
    }
}