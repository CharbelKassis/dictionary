import Dictionary from "../dictionary/dictionary.js";

export default class DefinitionsModel {
    /**
     * 
     * @param {Dictionary[]} dictionaries 
     */
    constructor(dictionaries) {
        /**
         * @type {Map<String,Dictionary>}
        */
        this.__dictMap = new Map(); //Store the dictionaries, using their name as the key.
        this.__dictionaries = dictionaries; //Store the dictionaries in the map
        this.__definitions = []; //The current definitions
        this.__curDict = undefined; //The current dictionary
        this.__word = ""; //The current word
        this.__loading = false; //if loading is needed

        //The observers that need to be notified if a changed happened in this model
        this.__observers = []; 
    }

    /* Method that returns the list of definitions of the current word inputed by the user for the selected dictionary */
    /**
     * @return {String[]}
     */
    get definitions() {
        return this.__definitions;
    }

    /* Method that changes the definitions then notifies the GUI of the changes */
    /**
     * @param {String[]} definitions
     */
    set definitions(defs) {
        this.__definitions = defs;
        this.__notify("definitions");
    }

    /* Method that returns the state of the loading */
    get loading() {
        return this.__loading;
    }

    /* Method that changes the currently selected dictionary */
    /**
     * @param {String} dictionary
     */
    set currentDictionary(dictionary) {
        this.__curDict = dictionary;
    }

    /**
     * @return {String}
     */
    get language() {
        return this.__dictMap.get(this.__curDict).language;
    }

    /* Method that returns the currently inputed word by the user */
    get word() {
        return this.__word;
    }

    /* Method that changes the currently inputed word by the user */
    /**
     * @param {string} userInput
     */
    set word(userInput) {
        this.__word = userInput;
        this.__notify("word");
    }

    /* Method that returns an Iterable of the dictionary names */
    /**
     * @returns {IterableIterator<string>}
     */
    get dictionaryNames() {
        return this.__dictMap.keys();
    }



    /* Method that interacts with the dictionary classes to extract the definitions based of the currently selected dictionary and inputed word */
    __getDefinitions() {
        this.definitions = [];
        this.__setLoading(true);
        const dict = this.__getDictionary(this.__curDict)
        dict.getDefinitions(this.__word).then(defs=>{
            this.definitions = defs;
            this.__setLoading(false);
        });
    }

    /**
     * 
     * @param {boolean} loading 
     */
    __setLoading(loading) {
        this.__loading = loading;
        this.__notify("loading");
    }

    /* Method that returns a specific dictionary */
    /**
     * @param {string} name
     * @returns {Dictionary}
     */
    __getDictionary(name) {
        return this.__dictMap.get(name);
    }

    /* Method that sets the dictionary inside a map, using their name as the key. */
    /**
     * @param {Dictionary[]} dictionaries
     */
    set __dictionaries(dictionaries) {
        dictionaries.forEach(dict=> {
            this.__dictMap.set(dict.name,dict);
        });
    }

    subscribe(observer) {
        if(!this.__observers.includes(observer)) {
            this.__observers.push(observer);
        }
    }

    update(message,observer) {
        switch(message) {
            case "definitions": this.__getDefinitions();
        }
    }

    __notify(message) {
        this.__observers.forEach(observer=>{
            observer.update(message,this);
        });
    }

}









