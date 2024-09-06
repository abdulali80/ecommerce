$(document).ready(function () {
    mergeProducts();
});

// function mergeProducts() {

    // const json1 = {
    //     "products": [
    //         {
    //             "id": 1,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f1.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 2,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f2.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 3,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f3.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 4,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f4.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 5,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f5.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 6,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f6.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 7,
    //             "name": "Cartoon Astronaut Trouser",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f7.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 8,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 78,
    //             "image": "assets/images/products/f8.jpg",
    //             "rating": 5
    //         }
    //     ]
    // };

    // const json2 = {
    //     "products": [
    //         {
    //             "id": 1,
    //             "name": "Casual Men's Shirt",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n1.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 2,
    //             "name": "Casual Men's Shirt",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n2.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 3,
    //             "name": "Casual Men's Shirt",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n3.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 4,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n4.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 5,
    //             "name": "Casual Men's Shirt",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n5.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 6,
    //             "name": "Astronaut Short Pent",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n6.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 7,
    //             "name": "Casual Men's Shirt",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n7.jpg",
    //             "rating": 5
    //         },
    //         {
    //             "id": 8,
    //             "name": "Cartoon Astronaut T-Shirts",
    //             "brand": "adidas",
    //             "price": 100,
    //             "image": "assets/images/products/n8.jpg",
    //             "rating": 5
    //         }
    //     ]
    // };

    // Merging both product arrays
//     const mergedProducts = [...json1.products, ...json2.products];

//     console.log(mergedProducts);
// } 

function mergeProducts() {
    // AJAX request for the first JSON file
    $.ajax({
        url: 'data/featured-products', // Replace with the actual path to your JSON file
        type: 'GET',
        dataType: 'json',
        success: function (data1) {
            const products1 = data1.products;

            // AJAX request for the second JSON file
            $.ajax({
                url: 'data/new-arrival-products', // Replace with the actual path to your second JSON file
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
    // Loop through the merged products and display them on the page
    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating} stars</p>
            </div>
        `;

        // Append the product HTML to a container on your webpage
        $('#pro-container').append(productHTML); // Make sure you have a div with id="product-list"
    });
}
