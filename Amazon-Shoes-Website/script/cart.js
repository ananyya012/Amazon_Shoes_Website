
let cartItemObj
function onload(){
    getSelectedItem()
    displayCartItem(cartItemObj)
displayBagSummary()
}


console.log(cartItems);

function getSelectedItem(){
    cartItemObj=cartItems.map((itemID)=>{
        for(let i =0; i< data.length;i++){
           if(itemID == data[i].id){
            return data[i]
           }
        }
    })

}
let cartitemcontainer=document.querySelector(".cart-item-container");
console.log(cartitemcontainer);
function displayCartItem(cart){
   
    cartitemcontainer.innerHTML="";
    cart.forEach((item)=>{
        cartitemcontainer.innerHTML+=`<div class="col-12 shadow-lg d-flex justify-content-evenly p-2 mb-2">
        <div class="w-25"> 
        <img src="${item.Img}" class="img-fluid " alt="">
    </div>
    <div class="d-flex  flex-column justify-content-center">
        <h6 class="text-end" onclick="deleteFromCart(${item.id})">❌</h6>
        <h5>₹${item.Price}</h5>
        <del class="fw-lighter shoes-font">₹${item.MRP}</del>
        <p class="shoes-font">${item.Category}</p>
        <p class="shoes-font text-center">${item.Name}</p>
        <p class="shoes-font text-center"> ${item.Tag} , ${item.Type} </p>
    </div>


     </div>`

    })
    
    
}
function deleteFromCart(itemId){
    cartItems = cartItems.filter((item) => item !== itemId);

    // Update local storage with the modified cartItems
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Reload selected items and display the updated cart
    getSelectedItem();
    displayCartItem(cartItemObj);
    displayCartIcon(cartItems)
    displayBagSummary()
}


function displayBagSummary(){
    let BagSummaryContainer=document.querySelector(".bag-summary-container");

let totalItems=cartItems.length;
let totalMrp=0;
let totalDiscount=0;

cartItemObj.forEach((item)=>{
    totalMrp+=item.MRP;
    totalDiscount += item.MRP-item.Price;
})

let  originalPrice= totalMrp-totalDiscount+99;
    BagSummaryContainer.innerHTML=`
    <div class="w-100 h100">
                        <div class="h5 text-center">PRICE DETAILS (${totalItems} Items)</div>
                        <div class="h6 d-flex justify-content-around">
                            <span class="">Total MRP</span>
                            <span class="">Rs ${totalMrp}</span>
                        </div>
                        <div class="h6 d-flex justify-content-around">
                            <span>Discount MRP</span>
                            <span>Rs ${totalDiscount}</span>
                        </div>
                        <div class="h6 d-flex justify-content-around">
                            <span>Convenience Fee</span>
                            <span>Rs 99</span>
                        </div>
                        <div class="mt-5 card">
                            <div class="h6 d-flex justify-content-around p-2">
                                <span>Total Amount</span>
                                <span> Rs ${originalPrice}</span>
                            </div>
                            <button class=" w-75 m-auto btn btn-danger text-white ttext-center">PLACE ORDER</button>
                        </div>

                    </div>
    `


}










onload()