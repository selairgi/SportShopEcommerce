let cartIcon = document. querySelector ("#myCartBtn");
let cart = document.querySelector(".offcanvas");
let closeCart = document.querySelector("#close-offcanvas");
// Open Cart
//cartIcon.onclick = () => {
  //  cart.classList.add ("active");
//};
//close Card
//closeCart. onclick = () => {
    //cart.classList.remove ("active");
//};

// Cart Working JS
if (document.readyState == "loading"){
    document.addEventListener ("DOMContentLoaded" , ready);
}
else{
ready ();
}
//Making function
function ready(){
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem) 
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for ( var i = 0; i< quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }
    var addCart =  document.getElementsByClassName('add-cart')
    for ( var i = 0; i< addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged (event){
    var input = event.target
    if (isNaN(input.value) || input.value<=0){
        input.value=1
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.querySelector(".product-image").getAttribute("src");
    addProductToCart(title,price,productImg);
    updatetotal();
    console.log(title,price);
}

function addProductToCart( title , price , productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box")//detail/cart-box
    var cartItems = document.getElementsByClassName('cart-content')[0]//offcanvas-body cart-content
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for ( var i = 0; i< cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title){
        alert("You have already add this item to Your Cart");
        return;
    }
}


var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
  <div class="cart-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="bi bi-trash cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change",quantityChanged)
}

function updatetotal() {
    var cartContent = document.getElementsByClassName ("cart-content")[0];//cart-content offcanvas-body 
    var cartBoxes=cartContent.getElementsByClassName("cart-box");//cart-box detail-box
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement=cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("€", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    document.getElementsByClassName('total-price')[0].innerText = (total/2) + "€";
    }
}
