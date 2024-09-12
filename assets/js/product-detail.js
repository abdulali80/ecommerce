

$(document).ready(function () {
    getProductDetail();
});

function getProductDetail() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    // Get specific query parameters
    var productId = urlParams.get('id');
    var type = urlParams.get('type');

    if (type == 'featured') 
        {
        getProductData("data/featured-products.json", parseInt(productId));
    }
    else {
        getProductData("data/new-arrival-products.json", parseInt(productId));
    }
}

function getProductData(fileName, productId) {
    $.getJSON(fileName, function (data) {
        // Assume you are looking for a product with id 2

        // Find the product by id
        var product = data.products.find(function (p) {
            return p.id === productId;
        });

        // Check if product was found
        if (product) {
            displayProductDetails(product);
            console.log("Product Found:", product.name, "Price:", product.price);
        } else {
            console.log("Product not found!");
        }
    });
}

function displayProductDetails(product) {
    console.log('product data ', product);

    let productHTML = `<div class="single-pro-image">
    <img src="${product.images[0]}" width="100%" id="MainImg" alt="">`;

    productHTML += `<div class="small-img-group">`;

    for (let i = 0; i < product.images.length; i++) {

        let image = product.images[i];

        productHTML += `<div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="">
                </div>`;

    }

    productHTML += `</div>
        </div>`;

    const productJson = JSON.stringify(product).replace(/"/g, '&quot;');

    let productDetail = `<div class="single-pro-details">
            <h6>Home / ${product.brand}</h6>
            <h4>${product.name}</h4>
            <h2>$${product.price}</h2>
            <select>
                <option>Select Size</option>
                <option>XL</option>
                <option>XXl</option>
                <option>Small</option>
                <option>Large</option>
            </select>
            <input id="qty" type="number" value="1">
            <button class="normal" onclick="addToCart('${productJson}')">Add To Cart</button>
            <h4>Product Details</h4>
            <span>${product.detail}</span>
        </div>`;

    $("#prodetails").append(productHTML);
    $("#prodetails").append(productDetail);

    handleImageOnClick();
}

function handleImageOnClick() {
    var MainImg = document.getElementById("MainImg");
    var smallimg = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallimg.length; i++) {
        smallimg[i].onclick = function () {
            MainImg.src = smallimg[i].src;
        }
    }
}

function addToCart(productJson) {

    let quantity = parseInt($("#qty").val());

    let userId = localStorage.getItem('uniqueUserId');

    if (userId) {
        const product = JSON.parse(productJson);
        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[product.id]) {
            // Product exists in the cart, update quantity
            cart[product.id].quantity +=  quantity;
        } else {
            // Product does not exist in the cart, add new entry
            cart[product.id] = {
                ...product,
                quantity: quantity
            };
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log("Cart updated:", cart);

        window.location.href="cart.html";
    }
}




