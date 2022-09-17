const cartButtons = document.querySelectorAll(".addToCart");

cartButtons.forEach(button => {
    button.addEventListener("click", cartClicked);
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

const cartContainer = document.querySelector(".shoppingCartItemsContainer");

function cartClicked(e) {
    const button = e.target;
    const item = button.closest(".item");

    const itemTitle = item.querySelector(".item-title").textContent;
    const itemPrice = item.querySelector(".item-price").textContent;
    const itemImage = item.querySelector(".item-image").src;

    addItemCart(itemTitle, itemPrice, itemImage);
}

function addItemCart(itemTitle, itemPrice, itemImage) {

    const ElementTitle = cartContainer.getElementsByClassName("shoppingCartItemTitle");
    for (let index = 0; index < ElementTitle.length; index++) {
        if (ElementTitle[index].innerText === itemTitle) {
            let elementQuantity = ElementTitle[index].parentElement.parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
            elementQuantity.value++;
            $(".toast").toast("show");
            updateCartTotal();
            return
        }
    }

    const cartRow = document.createElement("div");
    const cartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    cartRow.innerHTML = cartContent;
    cartContainer.append(cartRow);

    cartRow.querySelector(".buttonDelete").addEventListener('click', removeCartItem);
    cartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change", quantityChange)

    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    const cartTotal = document.querySelector(".shoppingCartTotal");

    const cartItems = document.querySelectorAll(".shoppingCartItem");

    cartItems.forEach(item => {
        const itemPriceElement = item.querySelector(".shoppingCartItemPrice");
        const itemPrice = Number(itemPriceElement.textContent.replace("€", ""));
        const itemQuantityElement = item.querySelector(".shoppingCartItemQuantity");
        const itemQuantity = Number(itemQuantityElement.value)
        total = total + itemPrice * itemQuantity;
    });

    cartTotal.innerHTML = `${total.toFixed(2)}€`
}

function removeCartItem(e) {
    const buttonClicked = e.target;
    buttonClicked.closest(".shoppingCartItem").remove();
    updateCartTotal();
}

function quantityChange(e) {
    const input = e.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateCartTotal();
}

function comprarButtonClicked() {
    cartContainer.innerText = "";
    updateCartTotal();
}