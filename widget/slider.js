export default class Slider {

    /**
     * 
     * @param {NodeListOf<Node>} nodes
     * @param {string} 
     */
    constructor(nodes=undefined,slidingBehavior=Slider.reverseTranslation) {
        this.__slider = document.createElement("div")
        const sliderTemplate = 
            `<span class="slider-arrow slider-arrow-left"><i class="fas fa-arrow-left"></i></span>
                <ul class="slider-list"></ul>
            <span class="slider-arrow slider-arrow-right"><i class="fas fa-arrow-right"></i></span>`;
        this.__slider.classList.add("slider");
        this.__slider.innerHTML = sliderTemplate;

        this.__sliderList = this.__slider.querySelector(".slider-list");
        this.__leftArrow = this.__slider.querySelector(".slider-arrow-left");
        this.__rightArrow = this.__slider.querySelector(".slider-arrow-right");
        
        this.sliderItems = nodes;
        this.slidingBehavior = slidingBehavior;

        this.__sliderList.addEventListener("click",e=>this.slidingBehavior(e));
        this.__leftArrow.addEventListener("click",e=>this.moveLeft());
        this.__rightArrow.addEventListener("click",e=>this.moveRight());
    }

    /**
     * @param {NodeListOf<Node>} nodes
     */
    set sliderItems(nodes=undefined) {
        if(nodes !== undefined) {
            this.__createSlider(nodes);
            this.__createSliderItems(this.__sliderList.querySelectorAll(".slider-item"));
        }
    }
    
    set arrowColor(color) {
        this.__leftArrow.style.color = color;
        this.__rightArrow.style.color = color;
    }

    /**
     * 
     * @param {number} behavior -The behavior of the slider when clicking inside the Slider. Possible values: 
     * 
     * Slider.reverseTranslation: This will move the slider the opposite way of where the user clicked. This is used to move the items in the direction you clicked closer to the middle.
     * 
     * Slider.translation: This will move the slider the direction you clicked. It's similar to clicking the arrows.
     * 
     * Slider.itemMoving: Similar to reverseTranslation, except the slider will keep moving until the item selected is in the center. Not clicking on an item will not move the slider.
     */
    set slidingBehavior(behavior) {
        this.__slidingBehavior = 
        {
            [Slider.reverseTranslation]: e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const middleX = (rect.left + rect.width) / 2
                if(e.clientX < middleX)
                    this.moveRight();
                else
                    this.moveLeft();
            },
        
            [Slider.translation]: e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const middleX = (rect.left + rect.width) / 2
                if(e.clientX < middleX)
                    this.moveLeft();
                else
                    this.moveRight();
            },
            [Slider.itemMoving]: e=> {
                const isSliderItem = e.target.classList.contains("slider-item-content");
                const isNotCenter = !e.target.parentElement.classList.contains("slider-item-center");
                if( isSliderItem && isNotCenter ) {
                    const items =  [...e.currentTarget.querySelectorAll(".slider-item")];
                    const targetIndex = items.findIndex(item => item === e.target.parentElement);
                    const centerIndex = items.findIndex(item => item.classList.contains("slider-item-center"));
                    
                    if(e.target.parentElement.classList.contains("slider-item-left"))
                        for(let i=0;i<centerIndex-targetIndex;i++)
                            this.moveRight();
                    else
                        for(let i=0;i<targetIndex-centerIndex;i++)
                            this.moveLeft();
                }
            }
        }[behavior];
    }

    /**
     * @return {Function} -The behavior of the slider when clicking inside it.
     */
    get slidingBehavior() {
        return this.__slidingBehavior;
    }

    moveLeft(){
        if(this.__items[this.__items.length-1].side !== "center") //do not move left if the last item on the list is the center
            this.__items.slice().reverse().forEach((item,index)=>item.moveLeft(this.__items.length-index-1,index));
        if(this.__items[this.__items.length-1].side === "center") //if the last item is the center after the translation, hide the left arrow
            this.__leftArrow.style.visibility = "hidden";
        if(this.__rightArrow.style.visibility === "hidden")
            this.__rightArrow.style.visibility = "visible";
    }
    
    moveRight() {
        if(this.__items[0].side !== "center" ) //do not move right if the first item on the list is the center
            this.__items.forEach((item,index)=>item.moveRight(index,this.__items.length-index-1));
        if(this.__items[0].side === "center") //if the last item is the center after the translation, hide the right arrow
            this.__rightArrow.style.visibility = "hidden";
        if(this.__leftArrow.style.visibility === "hidden")
            this.__leftArrow.style.visibility = "visible";
    }

    getSlider() {
        return this.__slider;
    }

    /**
     * 
     * @param {NodeListOf<Node>} nodeList -The content that will go inside the slider
     */
    __createSlider(nodeList) {

        /**
         * 
         * @param {Node} node -The content of the slider item 
         * @param {string} className -Either "slider-item-left", "slider-item-center" or "slider-item-right"
         */
        const createSliderItem = (node,className,zIndex) =>  {
            node.classList.add("slider-item-content");
            const sliderItem = document.createElement("li");
            sliderItem.style.width = `calc(100%/${nodeList.length})`;
            sliderItem.style.zIndex = `-${zIndex}`;
            sliderItem.appendChild(node);
            sliderItem.classList.add(className);
            sliderItem.classList.add("slider-item");
            this.__sliderList.appendChild(sliderItem);
        }

        this.__sliderList.innerHTML = "";

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
            });
        }
    }

    /**
     * 
     * @param {NodeListOf<Node>} nodeList 
     */
    __createSliderItems(nodeList) {
        this.__items = SliderItem.from(nodeList);
    }

}

Slider.reverseTranslation = 0;
Slider.translation = 1;
Slider.itemMoving = 2;

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
        this.translation = Math.round(translation);
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

    /**
     * 
     * @param {number} rightIndex -the position of the slider item in the list starting from the right
     * @param {number} leftIndex -the position of the slider item in the list starting from the left
     */
    moveRight(rightIndex,leftIndex) {
        if(this.side !== "left") {
            if(this.right && !this.isStacked) {
                this.position = this.position-this.translation;
                if((this.right.isStacked && this.right.right) || (!this.right.right && Math.round(this.right.position) === 0)) {
                    this.position = this.position + leftIndex;
                    this.isStacked = true;
                }
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
                this.position = this.position-this.translation + rightIndex;
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

    /**
     * 
     * @param {number} rightIndex -the position of the slider item in the list starting from the right
     * @param {number} leftIndex -the position of the slider item in the list starting from the left
     */
    moveLeft(rightIndex,leftIndex) {
        if(this.side !== "right") {
            if(this.left && !this.isStacked) {
                this.position = this.position+this.translation;
                if((this.left.isStacked && this.left.left) || (!this.left.left && Math.round(this.left.position) === 0)) {
                    this.position = this.position - rightIndex;
                    this.isStacked = true;
                }

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
                this.position = this.position+this.translation - leftIndex;
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