export default class ImageRepository {

    constructor() {
        this.__apiKey = "14797863-f0ceea44779883fbbb24f261f";
        this.__url = "https://pixabay.com/api/";
    }

    /**
     * 
     * @param {String} word 
     */
    async getImages(word,lang) {
        try {
            var response = await fetch(this.__getUrl(word,lang));
            var json = await response.json();
            return json.hits.map(hit=>hit.webformatURL);
        }
        catch(err) {
            console.error(err);
            return [];
        }
    }

    /**
     * 
     * @param {String} word 
     */
    __getUrl(word,lang) {
        return `${this.__url}?key=${this.__apiKey}&q=${word.replace(" ","+")}&image_type=all&lang=${lang}`
    }

}