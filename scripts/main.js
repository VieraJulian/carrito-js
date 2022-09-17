const serverUrl = "http://127.0.0.1:5500/";
const itemsPath = "mock/items.json";
const imagesPath = "img/";

window.onload = getData();

const items = document.querySelector(".items");

function getData() {
    fetch(`${serverUrl}${itemsPath}`)
        .then(response => response.json())
        .then(data => printData(data));
}

function printData(data) {
    const itemContainer = document.createElement("div");
    itemContainer.className = "row";

    data.forEach(item => {
        itemContainer.innerHTML += createElement(item);
        items.append(itemContainer);
    })
}

function createElement(item) {
    const itemHtml =  `
    <div class="col-12 col-md-6">
        <div class="item shadow mb-4">
            <h3 class="item-title">${item.title}</h3>
            <img class="item-image" src=${serverUrl}${imagesPath}${item.image}>

            <div class="item-details">
                <h4 class="item-price">${item.price}€</h4>
                <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>`
    return itemHtml;
}