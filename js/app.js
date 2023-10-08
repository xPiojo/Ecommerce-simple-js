//Cart
console.log("todo anda bien");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.addEventListener("click", function () {
  cart.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", function () {
  cart.classList.remove("active");
});

// Cart Working js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // Remove items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Changes
  let quantityInputs = document.querySelectorAll(".cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }
  // Add To Cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy Button
  let buyButton = document.querySelector(".btn-buy");
  buyButton.addEventListener("click", buyButtonClicked);

}

// Remove items from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity changes
function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add To Cart
function addCartClicked(event) {
  let button = event.target;
  let shoppProducts = button.parentElement;
  let title =
    shoppProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shoppProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shoppProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("DIV");
  cartShopBox.classList.add("cart-box");
  let cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity" name="" id="">
      </div>
      <!-- Remove Cart -->
      <i class='bx bxs-trash-alt cart-remove'></i>
    `;
  cartShopBox.innerHTML = cartBoxContent;
  // Encuentra el área del total
  let totalSection = document.querySelector(".total");
  // Inserta el nuevo elemento antes del área del total
  totalSection.parentElement.insertBefore(cartShopBox, totalSection);
  // Asocia los eventos de remover y cambiar cantidad
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);
}


// Buy Button
function buyButtonClicked() {
    alert("Your order is placed");
  
    // Elimina solo los productos del carrito
    let cartItems = document.querySelector(".cart-content");
    let products = cartItems.querySelectorAll(".cart-box");
    for (let product of products) {
      product.remove();
    }
    
    // Actualiza el total a cero
    updateTotal();
  }

// Update Total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
    // If price contains some Cents value
    total = Math.round(total * 100) / 100;
  }
  document.getElementById("total-price")[0].innerText = "$" + total;
}
