$(document).ready(function () {
    loadFeaturedProducts();
    loadNewArrivalProducts();
});

function loadFeaturedProducts() {
    $.ajax({
        url: 'data/featured-products.json', // Path to your products.json file
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let productList = $('#featured-products');
            // const parseData = JSON.parse(data);
            data.products.forEach(function(product) {
                let stars = '';
                for (let i = 0; i < product.rating; i++) {
                    stars += '<i class="fas fa-star"></i>';
                }
                
                let productHTML = `
                    <div class="pro" onclick="window.location.href='${product.url}';">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="des">
                            <span>${product.brand}</span>
                            <h5>${product.name}</h5>
                            <div class="star">${stars}</div>
                            <h4>$${product.price}</h4>
                        </div>
                        <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                    </div>
                `;
                productList.append(productHTML);
            });
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}

function loadNewArrivalProducts() {
    $.ajax({
        url: 'data/new-arrival-products.json', // Path to your products.json file
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let productList = $('#new-arival-products');
            // const parseData = JSON.parse(data);
            data.products.forEach(function(product) {
                let stars = '';
                for (let i = 0; i < product.rating; i++) {
                    stars += '<i class="fas fa-star"></i>';
                }
                
                let productHTML = `
                    <div class="pro" onclick="window.location.href='${product.url}';">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="des">
                            <span>${product.brand}</span>
                            <h5>${product.name}</h5>
                            <div class="star">${stars}</div>
                            <h4>$${product.price}</h4>
                        </div>
                        <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
                    </div>
                `;
                productList.append(productHTML);
            });
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}
