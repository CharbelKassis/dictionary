/**
 * localStorage usage:
 * 
 * 1) item "dictionaryNames" : this will store the names of all the dictionaries, this will return an array.
 * 2) item "{dictionaryName}" : this will return an array containing all the words with definitions.
 * 3) item "{dictionaryName}:{word}": this will return an array containing all the definitions of a word in a specific dictionary"
 */
class DefinitionsStorage {
    
    constructor() {
        this.__dictionaries = {};
        this.__loadDefinitions();
    }

    /**
     * 
     * @param {string} word 
     * @param {string[]} definitions 
     * @param {string} dictionaryName
     */
    setDefinitions(word,definitions,dictionaryName) {
        var dictionary = this.__dictionaries[dictionaryName];
        /* if the dictionary is not the storage, add it */
        if(dictionary === undefined) {
            this.__dictionaries[dictionaryName] = {};
            const dictionaries = JSON.parse(localStorage.getItem("dictionaryNames"));
            dictionaries.push(dictionaryName);
            localStorage.setItem("dictionaryNames",JSON.stringify(dictionaries));
            
            dictionary = this.__dictionaries[dictionaryName];
        }

        var words = JSON.parse(localStorage.getItem(dictionaryName));
        /* if the dictionary doesn't have words, add an empty array to populate it */
        if(words === null)
            words = [];
        if(!words.includes(word))
            words.push(word);
        localStorage.setItem(dictionaryName,JSON.stringify(words));

        /* add the definitions to the array and the localStorage */
        dictionary[word] = definitions;
        localStorage.setItem(dictionaryName+":"+word,JSON.stringify(definitions));
    }

    /**
     * 
     * @param {string} word 
     * @param {string} dictionaryName
     * @returns {string[]}
     */
    getDefinitions(word,dictionaryName) {
        const dictionary = this.__dictionaries[dictionaryName];

        if(dictionary === undefined)
            return undefined;
        
        return dictionary[word];
    }

    __loadDefinitions() {
        const dictionaryNames = JSON.parse(localStorage.getItem("dictionaryNames"));

        if(dictionaryNames === null)
            localStorage.setItem("dictionaryNames","[]");
        
        else {
            dictionaryNames.forEach(name => {
                const words = JSON.parse(localStorage.getItem(name));
                this.__dictionaries[name] = {};
                words.forEach(word=>{
                    const definitions = JSON.parse(localStorage.getItem(name+":"+word));
                    this.__dictionaries[name][word] = definitions;
                });
            });
        }
    }
}

export default new DefinitionsStorage();