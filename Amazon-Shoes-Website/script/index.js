// sidebar bar filter open close
let sidebarfilterBtn = document.querySelector(".sidebarfilter");
let leftMainfilterbar = document.querySelector(".leftmain");
if(sidebarfilterBtn){
    sidebarfilterBtn.addEventListener('click', function () {
        leftMainfilterbar.classList.toggle("toggle-icon");
    });
        
}

function closeSideFilter() {
    leftMainfilterbar.classList.toggle("toggle-icon");
}

let SideBarOpenicon = document.querySelectorAll(".sidebar-open-icon");
let toggleSidebar = document.querySelector(".toggle-sidebar");

SideBarOpenicon.forEach((button) => {
    button.addEventListener('click', () => {
        toggleSidebar.classList.toggle("none");
    });
});

function closeSide() {
    toggleSidebar.classList.add("none");
}

let CategoryBtnContainer = document.querySelector(".category-container");
if(CategoryBtnContainer){


let dataCategory = new Set(data.map((item) => item.Category));
displayCategory();

function displayCategory() {
    dataCategory = ["all", ...dataCategory];
    

    CategoryBtnContainer.innerHTML = "";
    dataCategory.forEach((item) => {
        CategoryBtnContainer.innerHTML += `
            <button class="d-flex flex-column  align-items-center category-filter" data-category="${item}">
                <img src="category image/${item}.png" width="80%" alt="">
                ${item}
            </button>
        `;
    });
}
}

let checkboxType = document.querySelector(".checkboxType");
let checkboxTag = document.querySelector(".checkboxTag");
let checkboxSize = document.querySelector(".checkboxSize");
let checkboxColor = document.querySelector(".checkboxColor");
if(checkboxColor || checkboxSize || checkboxType){
// display checkbox
checkboxdisplay(checkboxType, 'Type');
checkboxdisplay(checkboxTag, 'Tag');
checkboxdisplay(checkboxSize, 'Size');

function checkboxdisplay(container, Type) {
    let typeCategory = new Set(data.map((item) => item[Type][0]));

    container.innerHTML = "";
    typeCategory.forEach((item) => {
        container.innerHTML += `
            <div class="d-flex justify-content-between">
                <label for="${item}">${item}</label>
                <input type="checkbox" class="feature-${item}" id="${item}" data-features="${item}">
            </div>
        `;
    });
}

displayColorCheckbox(checkboxColor, 'ColorTag');

function displayColorCheckbox(container, Type) {
    let typeCategory = new Set(data.map((item) => item[Type][0]));

    container.innerHTML = "";
    typeCategory.forEach((item) => {
        container.innerHTML += `
            <div class="py-3 px-4 shadow-lg" style="background-color: ${item};">
                <input type="checkbox" class="feature-${item}" data-features="${item}">
            </div>
        `;
    });
}

}



let categoryFilter = document.querySelectorAll(".category-filter");
if(CategoryBtnContainer){
    CategoryBtnContainer.addEventListener('click', (event) => categoryFilterFunction(event));
    let shoesItemContainer = document.querySelector(".shoes-item-container");
    
    function categoryFilterFunction(event) {
        let selectedBtn = event.target.getAttribute("data-category");
    
        categoryFilter.forEach((btn) => {
            btn.classList.toggle("selected", btn == event.target);
        });
    
    
        filterItems();
    }
    
    let checkboxTypeboxes = document.querySelectorAll(".checkboxType  input[type='checkbox']");
    let checkboxTagsboxes = document.querySelectorAll(".checkboxTag  input[type='checkbox']");
    let checkboxSizesBoxes = document.querySelectorAll(".checkboxSize  input[type='checkbox']");
    let checkboxColorBoxes = document.querySelectorAll(".checkboxColor  input[type='checkbox']");
    
    checkboxTypeboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', filterType);
    });
    checkboxTagsboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', filterTag)
    })
    checkboxSizesBoxes.forEach((checkbox)=>{
        checkbox.addEventListener('change',filterSize)
    })
    checkboxColorBoxes.forEach((checkbox)=>{
    
       checkbox.addEventListener('change',filterItems)
    })
    function filterType() {
        filterItems();
    }
    
    function filterTag() {
        filterItems()
    }
    function filterSize(){
        filterItems()
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    function filterItems() {
        const selectedBtn=getSelectedValue(categoryFilter)
        
        const selectedFeatures = getSelectedValues(checkboxTypeboxes);
        const selectedTag = getSelectedValues(checkboxTagsboxes)
        const selectedSize = getSelectedValues(checkboxSizesBoxes)
        const selectedColor = getSelectedValues(checkboxColorBoxes)
        
        let filteredItems = data.filter((item) => {
    
            let categoryMatch = selectedBtn === "all" || item.Category === selectedBtn;
    
            const featureMatch = selectedFeatures.length === 0 || selectedFeatures.some(feature => item.Type.includes(feature))
            const TagMatch = selectedTag.length === 0 || selectedTag.some(feature => item.Tag.includes(feature))
            const SizeMatch = selectedSize.length === 0 || selectedSize.some(feature => item.Size.includes(feature))
            const ColorMatch = selectedColor.length === 0 || selectedColor.some(feature => item.ColorTag.includes(feature))
            return categoryMatch && featureMatch && TagMatch && SizeMatch && ColorMatch;
        });
    
    
    
        displayShoesItem(filteredItems);
    }
    
    
    function getSelectedValue(elements) {
        const selectedElement = Array.from(elements).find(element => element.classList.contains('selected'));
        return selectedElement ? selectedElement.getAttribute('data-category') : null;
        
    }
    function getSelectedValues(checkboxes) {
        return Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.getAttribute('data-features'));
    }
    
    
    function displayShoesItem(data) {
        
        shoesItemContainer.innerHTML = "";
        
        data.forEach((item) => {
            shoesItemContainer.innerHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 justify-content-around col-6 p-4">
            <img class="img-fluid shoes-img" src="${item.Img}" alt="">
            <h5>₹${item.Price}</h5>
            <del class="fw-lighter shoes-font">₹${item.MRP}</del>
            <p class="shoes-font">${item.Category}</p>
            <p class="shoes-font text-center">${item.Name}</p>
                    <p class="shoes-font text-center">${item.Tag}, ${item.Type}</p>
                    <div class="d-flex align-content-center justify-content-around">
                        <div class="size">${item.Size}</div>
                        <div style="background-color: ${item.ColorTag};" class="shoes-color shadow-lg"></div>
                    </div>
                    <button class="btn btn-dark w-100 text-white text-center" onclick="addToBag(${item.id})" >Add to Cart</button>
                </div>
            `;
        });
    
    
    }
    
    
    window.onload = onWindowLoad;
    function onWindowLoad() {
        // Simulate click on "ALL Category" button when the page loads
        document.querySelector(".category-filter[data-category='all']").click();
    }   
}    
    
function updateSearch(e){
let value=event.target.value;

let searchedMatchItem=data.filter((item)=>{
    matchname=item.Name.toLowerCase().includes(value);
    matchCategory=item.Category.toLowerCase().includes(value);

return matchname || matchCategory

})
displayShoesItem(searchedMatchItem)

}    
    
    
    
let cartItems
    
  
 let cartItemsStr=localStorage.getItem('cartItems')
cartItems=cartItemsStr?JSON.parse(cartItemsStr):[]    
displayCartIcon()

    
    
    
    

function addToBag(itemId){
    if(!cartItems.includes(itemId)){

        cartItems.push(itemId)
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        displayCartIcon(cartItems)
    }else{
        alert("you have already added")
    }
}


function displayCartIcon(){
// console.log(cartItems);
document.querySelector(".cart-length").textContent=cartItems.length
}

























