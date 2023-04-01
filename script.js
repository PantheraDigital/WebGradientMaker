window.onload = function(){
    let sliders = document.getElementsByClassName("alpha-Slider");
    for(let i=0; i < sliders.length; i++){
        sliders[i].addEventListener("input", AdjustAlpha);
        sliders[i].value = sliders[i].max;
    }
    let sliderNumber = document.getElementsByClassName("alpha-number");
    for(let i=0; i < sliderNumber.length; i++){
        sliderNumber[i].addEventListener("input", AdjustAlpha);
        sliderNumber[i].value = sliderNumber[i].max;
    }
    let colorPicker = document.getElementsByClassName("color-Picker");
    for(let i=0; i < colorPicker.length; i++){
        colorPicker[i].addEventListener("input", SetColor);
        if(i == 0){
            colorPicker[i].value = "#00ffff";
            document.getElementById("color-wrapper_" + i).style.backgroundColor = "rgb(0, 255, 255)";
        }
        else if(i == 1){
            colorPicker[i].value = "#ff0000";
            document.getElementById("color-wrapper_" + i).style.backgroundColor = "rgb(255, 0, 0)";
        }
    }

    UpdateBGGradient();
};

document.getElementById("linear-input-angle").addEventListener("input", function() {
    
    UpdateBGGradient();
});

document.getElementById("add-color-button").addEventListener("click", function() {
    var nodeIdNum = document.getElementById("color-table").getElementsByTagName("li").length.toString();
    
    if(nodeIdNum == "9"){
        var button = document.getElementById("add-color-button");
        button.setAttribute("disabled", "");
    }
    
    var node = document.createElement("li");
    node.id = "color-set_" + nodeIdNum;

    var colorWrapper = document.createElement("div");
    colorWrapper.id = "color-wrapper_" + nodeIdNum;
    colorWrapper.className = "color-wrapper";

    var input = document.createElement("input");
    input.type = "color";
    input.className = "color-Picker";
    input.id = "linear-input-color_" + nodeIdNum;
    input.title = "Color " + (Number(nodeIdNum) + 1).toString();
    input.addEventListener("input", SetColor);

    var slider = document.createElement("input");
    slider.type = "range";
    slider.className = "alpha-Slider";
    slider.id = "linear-input-color-alpha_" + nodeIdNum;
    slider.title = "Color " + (Number(nodeIdNum) + 1).toString() + " Alpha";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.01";
    slider.value = slider.max;
    slider.addEventListener("input", AdjustAlpha);
    slider.oninput = function(){this.nextElementSibling.value = this.value};

    var sliderNumber = document.createElement("input");
    sliderNumber.type = "number"
    sliderNumber.className = "alpha-number";
    sliderNumber.id = "alpha-number_" + nodeIdNum;
    sliderNumber.min = "0";
    sliderNumber.max = "1";
    sliderNumber.step = "0.01";
    sliderNumber.value = sliderNumber.max;
    sliderNumber.oninput = function(){this.previousElementSibling.value = this.value};
    sliderNumber.addEventListener("input", AdjustAlpha);

    colorWrapper.appendChild(input);
    node.appendChild(colorWrapper);
    node.appendChild(slider);
    node.appendChild(sliderNumber);
    document.getElementById("color-table").appendChild(node);
    UpdateBGGradient();
});

document.getElementById("reset-color-list").addEventListener("click", function() {
    var colorTable = document.getElementById("color-table");
    var nodeChildren = colorTable.getElementsByTagName("li");

    if(nodeChildren.length >= 3){
        var button = document.getElementById("add-color-button");
        button.removeAttribute("disabled");

        let childrenNum = nodeChildren.length;
        for(let i = 2; i < childrenNum; ++i){
            document.getElementById("linear-input-color_" + i.toString()).removeEventListener("input", SetColor);
            document.getElementById("linear-input-color-alpha_" + i.toString()).removeEventListener("input", AdjustAlpha);
            colorTable.removeChild(document.getElementById("color-set_" + i.toString()));
        }
    }
    UpdateBGGradient();
});




//slider input call to adjust the color alpha
function AdjustAlpha(){
    let index = this.id.split("_")[1];
    let colorInput = document.getElementById("linear-input-color_" + index.toString());
    let colorInputWrapper = document.getElementById("color-wrapper_" + index.toString());
    colorInputWrapper.style.backgroundColor = colorInput.value + GetSliderAlphaHex(index);
    UpdateBGGradient();
}

//color input call to change visual color
function SetColor(){
    let index = this.id.split("_")[1];
    let colorInputWrapper = document.getElementById("color-wrapper_" + index.toString());

    colorInputWrapper.style.backgroundColor = this.value + GetSliderAlphaHex(index);
    UpdateBGGradient();
}

function GetSliderAlphaHex(index){
    if(!isNaN(index)){
        if(typeof index == "number"){
            index = index.toString();
        }
        let slider = document.getElementById("linear-input-color-alpha_" + index);
        let alpha = Math.floor(slider.value * 255);
        let alphaHex = alpha.toString(16);
        alphaHex = alphaHex < 16 ? '0' + alphaHex : alphaHex;
        return alphaHex;
    }
}

function UpdateBGGradient(){
    let angle = document.getElementById("linear-input-angle").value;
    let colorWrappers = document.getElementsByClassName("color-wrapper");
    let colors = "";
    for(let i = 0; i < colorWrappers.length; i++){
        let style = window.getComputedStyle(colorWrappers[i]);
        colors += style.backgroundColor;

        if(i < colorWrappers.length -1){
            colors += ", ";
        }
    }
    let bGImage = "linear-gradient(" + angle.toString() + "deg , " + colors + ")";
    document.getElementById("background-gradient").style.backgroundImage = bGImage;
    document.getElementById("code-text").innerHTML = bGImage;
}