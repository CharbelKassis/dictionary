export default class Slider {

    /**
     * 
     * @param {NodeListOf<Node>} nodes 
     */
    constructor(nodes=undefined) {
        this.sliderItems = nodes;
    }

    /**
     * @param {NodeListOf<Node>} nodes
     */
    set sliderItems(nodes=undefined) {
        if(nodes !== undefined) {
            this.__slider = this.__createSlider(nodes);
            this.__sliderItems = this.__slider.querySelectorAll(".slider-item");
    
            this.__slider.querySelector(".slider-arrow-left").addEventListener("click",e=>this.moveLeft());
            this.__slider.querySelector(".slider-arrow-right").addEventListener("click",e=>this.moveRight());
        }
    }

    moveLeft(){
        if(this.__items[this.__items.length-1].side !== "center") //do not move left if the last item on the list is the center
            this.__items.slice().reverse().forEach((item,index)=>item.moveLeft(index));
    }
    
    moveRight() {
        if(this.__items[0].side !== "center" ) //do not move right if the first item on the list is the center
            this.__items.forEach((item,index)=>item.moveRight(index));
    }

    getSlider() {
        return this.__slider;
    }

    /**
     * 
     * @param {NodeListOf<Node>} nodeList 
     */
    set __sliderItems(nodeList) {
        this.__items = SliderItem.from(nodeList);
    }

    /**
     * 
     * @param {NodeListOf<Node>} nodeList -The content that will go inside the slider
     * @return {Node} -The slider
     */
    __createSlider(nodeList) {

        /**
         * 
         * @param {Node} node -The content of the slider item 
         * @param {string} className -Either "slider-item-left", "slider-item-center" or "slider-item-right"
         */
        function createSliderItem(node,className,zIndex) {
            node.classList.add("slider-item-content");
            const sliderItem = document.createElement("li");
            sliderItem.style.width = `calc(100%/${nodeList.length})`;
            sliderItem.style.zIndex = `-${zIndex}`;
            sliderItem.appendChild(node);
            sliderItem.classList.add(className);
            sliderItem.classList.add("slider-item");
            sliderList.appendChild(sliderItem);
        }

        const slider = document.createElement("div")
        const sliderTemplate = 
            `<span class="slider-arrow slider-arrow-left"><i class="fas fa-arrow-left"></i></span>
                <ul class="slider-list"></ul>
            <span class="slider-arrow slider-arrow-right"><i class="fas fa-arrow-right"></i></span>`
        slider.classList.add("slider");
        slider.innerHTML = sliderTemplate;
        
        const sliderList = slider.querySelector(".slider-list");

        if(nodeList.length % 2 !== 0) {
            [...nodeList].slice(0,(nodeList.length-1)/2).forEach(node=>{
                createSliderItem(node,"slider-item-left",0);
            });
            createSliderItem(nodeList[(nodeList.length-1)/2],"slider-item-center",0);

            [...nodeList].slice(((nodeList.length-1)/2)+1,nodeList.length).forEach((node,index)=>{
                createSliderItem(node,"slider-item-right",index+1);
            });
        }

        else {
            [...nodeList].slice(0,nodeList.length/2).forEach(node=>{
                createSliderItem(node,"slider-item-left",0);
            });
            createSliderItem(nodeList[nodeList.length/2],"slider-item-center",0);
            [...nodeList].slice((nodeList.length/2) + 1,nodeList.length).forEach((node,index)=>{
                createSliderItem(node,"slider-item-right",index+1);
            })
        }

        return slider;
    }

}

class SliderItem {
    /**
     * 
     * @param {Node} node -The Slider item. 
     * @param {number} translation -the value in % to translate to the right or left.
     * @param {Boolean} isStacked -If the slider item is part of a stacked slider items.
     * @param {SliderItem} left -The SliderItem on the left.
     * @param {SliderItem} right -The SliderItem on the right.
     */
    constructor(node,translation=0,left=null,right=null) {
        this.node = node;
        this.translation = translation;
        this.isStacked = false;
        this.right = right;
        this.left = left;
        this.side = this.__initialSide(node);
    }

    /**
     * @return {number} -return the x translation of the SliderItem
     */
    get position() {
        const x = this.node.style.right;
        if(x === "")
            return 0;
        return parseFloat(x.substring(0,x.length-1));
    }

    /** 
     * @param {number} x -new x translation of the SliderItem;
    */
    set position(x) {
        this.node.style.right = x+"%";
    }
    moveRight() {
        if(this.side !== "left") {
            if(this.right && !this.isStacked) {
                this.position = this.position-this.translation;
                if((this.right.isStacked && this.right.right) || (!this.right.right && Math.round(this.right.position) === 0))
                    this.isStacked = true;
            }
            else if(!this.right) {
                if(Math.round(this.position) !== 0)
                    this.position = this.position-this.translation;
            }
        }
            
        else {
            if(!this.isStacked) {
                this.position = this.position-this.translation;
            }
            else if(this.left && !this.right.isStacked) {
                this.position = this.position-this.translation;
                this.isStacked = false;
            }
            else if(!this.right.isStacked) {
                this.position = this.position-this.translation;
            }
        }

        if(this.side === "center") {
            this.node.classList.remove("slider-item-center");
            this.node.classList.add("slider-item-right");
            this.side = "right";
        }

        else if(this.right && this.side === "left" && this.right.side === "center") {
            this.node.classList.remove("slider-item-left");
            this.node.classList.add("slider-item-center");
            this.side = "center";
        }
    }

    moveLeft() {
        if(this.side !== "right") {
            if(this.left && !this.isStacked) {
                this.position = this.position+this.translation;
                if((this.left.isStacked && this.left.left) || (!this.left.left && Math.round(this.left.position) === 0))
                    this.isStacked = true;
            }
            else if(!this.left) {
                if(Math.round(this.position) !== 0)
                    this.position = this.position+this.translation;
            }
        }
            
        else {
            if(!this.isStacked) {
                this.position = this.position+this.translation;
            }
            else if(this.right && !this.left.isStacked) {
                this.position = this.position+this.translation;
                this.isStacked = false;
            }
            else if(!this.left.isStacked) {
                this.position = this.position+this.translation;
            }
        }
      
        if(this.side === "center") {
            this.node.classList.remove("slider-item-center");
            this.node.classList.add("slider-item-left");
            this.side = "left";
        }

        else if(this.left && this.side === "right" && this.left.side === "center") {
            this.node.classList.remove("slider-item-right");
            this.node.classList.add("slider-item-center");
            this.side = "center";
        }
    }

    /**
     * 
     * @param {Node} node 
     */
    __initialSide(node) {
        switch([...node.classList].find(side => /slider-item-.+/gm)) {
            case "slider-item-left": return "left";
            case "slider-item-center": return "center";
            case "slider-item-right": return "right";
            default: return "";
        }
    }
}

/**
 * @param {NodeListOf<Node>} nodeList
 * @return {SliderItem[]}
 */
SliderItem.from = function(nodeList) {
    const sliderItems = [];
    const translation = 100/nodeList.length;
    var currentSliderItem;

    nodeList.forEach((node,index)=>{
        if(index === 0) {
            currentSliderItem = new SliderItem(node,translation);
            currentSliderItem.isStacked = true;
        }
        
        else {
            const newSliderItem = new SliderItem(node,translation,currentSliderItem);
            currentSliderItem.right = newSliderItem;
            currentSliderItem = newSliderItem;
        }
        sliderItems.push(currentSliderItem);
    });

    currentSliderItem.isStacked = true;
    return sliderItems;
}