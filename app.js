import Definitions from "./definitions/definitions.js";
import Larousse from "./dictionary/larousse.js";
import LeDictionnaire from "./dictionary/le_dictionnaire.js";
import MerriamWebster from "./dictionary/merriam-webster.js";
import Dictionary from "./dictionary/dictionary.js";
import Image from "./image/image.js"

//Insert dictionaries here

/**
 * @type {Dictionary[]}
 */
const dictionaries = [
    new Larousse(),
    new LeDictionnaire(),
    new MerriamWebster()
]

const definitions = new Definitions(dictionaries);
const image = new Image(7);

definitions.model.subscribe(image.controller); //observe the changes in the definitions model to show images

definitions.start();
image.start();