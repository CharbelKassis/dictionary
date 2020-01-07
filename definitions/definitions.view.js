export default class DefinitionsView {

    constructor() {
        this.__definitionsOutput = document.getElementById("definitionsOutput");
        this.__resultsArea = document.getElementById("resultsArea");
        this.__selectedDict = document.getElementById("selectedDictionary");
        this.__search = document.getElementById("searchButton");
        this.__clear = document.getElementById("clearButton");
    }

    /* This method will add or remove the loading animation inside the definitions area */
    /**
     * 
     * @param {boolean} isLoading 
     */
    loading(isLoading) {
        if(isLoading)
            this.__resultsArea.classList.add("loading");
        else
            this.__resultsArea.classList.remove("loading");
    }

    /* This method will activate or deactivate the search button and searching feature if the user input is empty */
    /**
     * 
     * @param {String} userInput 
     */
    word(userInput) {
        this.__search.disabled = userInput.length > 0 ? false : true;
    }

    /* This method shows the definitions in the designated component. */
    /**
     * 
     * @param {String[]} definitions 
     */
    showDefinitions(definitions) {
        definitions.forEach(
            (definition,i)=>
                this.__resultsArea.value += 
                i !== definitions.length-1 
                ? definition+"\n\n" 
                : definition
        );
        this.__clear.disabled = false;
        this.__clear.style.visibility = "visible";
        this.__resultsArea.classList.remove("clear");
    }

    /* Remove the definitions from the designed component. */
    clearDefinitions() {
        this.__resultsArea.value = "";
        this.__resultsArea.classList.add("clear");
        this.__clear.disabled = true;
        this.__clear.style.visibility = "hidden";
    }

    /* Populate the option element with the name of the dictionaries */
    /**
     * 
     * @param {String[]} dictNames 
     */
    addDictionaries(dictNames) {
        for(let dictName of dictNames){
            const option = document.createElement("option");
            option.text = option.value = dictName;
            this.__selectedDict.add(option);
        }
    }
}