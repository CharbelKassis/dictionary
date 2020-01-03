import ImageRepository from "./image.repository.js";

export default class ImageModel {

    /**
     * 
     * @param {number} nbOfImages 
     */
    constructor(nbOfImages) {
        this.__word = ""; //The word associated with the images
        this.__lang = ""; //The language of the word
        this.__imagesUrl = []; //The urls of the images
        this.__observers = [];
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

    subscribe(observer) {
        if(!this.__observers.includes(observer)) {
            this.__observers.push(observer);
        }
    }

    update(message,subject) {
        this.__word = message.word;
        this.__lang = message.lang;
        this.__getImages();
    }

    __notify(message) {
        this.__observers.forEach(observer=>{
            observer.update(message,this);
        })
    }
}