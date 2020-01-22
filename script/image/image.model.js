import ImageRepository from "./image.repository.js";
import Model from "../mvc/Model.js";

export default class ImageModel extends Model {

    /**
     * 
     * @param {number} nbOfImages -The number of images we want to show.
     */
    constructor(nbOfImages) {
        super();
        this.__word = ""; //The word associated with the images
        this.__lang = ""; //The language of the word
        this.__imagesUrl = []; //The urls of the images
        this.__imageRepository = new ImageRepository(); //The class responsible to fetch the images
        this.__nbOfImages = nbOfImages; //The maximum number of images on screen
    }

    /**
     * @param {String[]} url
     */
    set images(url) {
        this.__imagesUrl = url;
        this.__notify("images");
    }

    /**
     * @return {String[]}
     */
    get images() {
        return this.__imagesUrl;
    }

    __getImages() {
        this.images = [];   
        if(this.__word) {
            this.__imageRepository.getImages(this.__word, this.__lang).then(imgs=>{
                this.images = imgs.slice(0,this.__nbOfImages);
            })
        }
    }

    update(message,subject) {
        this.__word = message.word;
        this.__lang = message.lang;
        this.__getImages();
    }
}