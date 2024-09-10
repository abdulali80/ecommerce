

$(document).ready(function () {
    loadShops();
});
function loadShops() {
    // AJAX request for the first JSON file
    $.ajax({
        url: 'data/featured-products.json', // Replace with the actual path to your JSON file
        type: 'GET',
        dataType: 'json',
        success: function (data1) {
            const products1 = data1.products;

            // AJAX request for the second JSON file
            $.ajax({
                url: 'data/new-arrival-products.json', // Replace with the actual path to your second JSON file
                type: 'GET',
                dataType: 'json',
                success: function (data2) {
                    const products2 = data2.products;

                    // Merging both product arrays
                    const mergedProducts = [...products1, ...products2];

                    // Output merged products to console
                    console.log(mergedProducts);

                    // Display merged products (optional)
                    displayProducts(mergedProducts);
                },
                error: function (error) {
                    console.error('Error fetching second JSON:', error);
                }
            });
        },
        error: function (error) {
            console.error('Error fetching first JSON:', error);
        }
    });
}

function displayProducts(products) {
    products.forEach(product => {
        const productHTML = `<div class="pro" onclick="window.location.href='product-2.html';">
                <img src="${product.image}" alt="">
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${product.price}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
            </div>`;

        // Append the product HTML to a container on your webpage
        $('.pro-container').append(productHTML); // Make sure you have a div with id="product-list"
    });
}
