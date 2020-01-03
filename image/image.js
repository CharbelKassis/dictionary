import ImageController from "./image.controller.js";
import ImageModel from "./image.model.js";
import ImageView from "./image.view.js";

export default class Image {

    /**
     * 
     * @param {number} nbOfImages 
     */
    constructor(nbOfImages) {
        this.model = new ImageModel(nbOfImages);
        this.view = new ImageView();
        this.controller = new ImageController();

        this.controller.model = this.model;
        this.controller.view = this.view;       
    }

    start() {
        this.controller.start();
    }

}