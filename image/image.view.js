import Slider from "../widget/slider.js";

export default class ImageView {

    constructor() {
        this.__imageOutput = document.getElementById("imageOutput");
        this.__showImages = document.getElementById("showImages");
        this.__slider = new Slider();
        this.__slider.slidingBehavior = Slider.itemMoving;
    }

    /**
     * 
     * @param {String[]} imagesUrl 
     */
    showImages(imagesUrl) {
        const imgs = imagesUrl.map(url=>{
            const img = document.createElement("img");
            img.src = url;
            img.alt = url;
            img.onerror = e => {img.src = "/dictionary/pic/error.png"};
            img.className = "image loading";
            img.onload = e => {e.target.classList.remove("loading");this.__imageOutput.classList.remove("loading")};
            return img;
        })
        this.__slider.sliderItems = imgs;
        this.__imageOutput.classList.add("loading");
        this.__imageOutput.appendChild(this.__slider.getSlider());
        this.__showImages.classList.remove("hide");
    }

    clearImages() {
        this.__showImages.classList.add("hide");
        if(this.__slider.getSlider())
            this.__slider.getSlider().remove();
    }
}