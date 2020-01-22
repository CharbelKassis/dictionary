import ImageController from "./image.controller.js";
import ImageModel from "./image.model.js";
import ImageView from "./image.view.js";
import MVC from "../mvc/MVC.js";

export default class Image extends MVC {

    /**
     * 
     * @param {number} nbOfImages -The number of images we want to show.
     */
    constructor(nbOfImages) {
        super(new ImageModel(nbOfImages), new ImageView(), new ImageController()); 
    }

}