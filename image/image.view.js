export default class ImageView {

    constructor() {
        this.__imageOutput = document.getElementById("imageOutput");
    }

    /**
     * 
     * @param {String[]} imagesUrl 
     */
    showImages(imagesUrl) {
        imagesUrl.forEach(url=>{
            const img = document.createElement("img");
            img.onload = e => img.classList.remove("loading");
            img.classList.add("loading");
            img.src = url;
            img.classList.add("images");
            this.__imageOutput.appendChild(img);
        })

    }

    clearImages() {
        const images = document.querySelectorAll(".images");

        if(images)
            images.forEach(image=>{image.remove();});
    }
}