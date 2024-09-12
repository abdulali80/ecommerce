$(document).ready(function () {
    loadFeaturedProducts();
    loadNewArrivalProducts();
    generateUniqueId();
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
                    <div class="pro" onclick="window.location.href='sproduct.html?id=${product.id}&type=featured'">
                        <img src="${product.images[0]}" alt="${product.name}">
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

// function loadNewArrivalProducts() {
//     $.ajax({
//         url: 'data/new-arrival-products.json', // Path to your products.json file
//         method: 'GET',
//         dataType: 'json',
//         success: function(data) {
//             let productList = $('#new-arrival-products');
//             data.products.forEach(function(product) {
//                 let stars = '';
//                 for (let i = 0; i < product.rating; i++) {
//                     stars += '<i class="fas fa-star"></i>';
//                 }
                
//                 let productHTML = `
              
//                     <div class="pro" onclick="window.location.href='sproduct.html?id=${product.id}&type=newarrival';">
//                         <img src="${product.images[0]}" alt="${product.name}">
//                         <div class="des">
//                             <span>${product.brand}</span>
//                             <h5>${product.name}</h5>
//                             <div class="star">${stars}</div>
//                             <h4>$${product.price}</h4>
//                         </div>
//                         <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
//                     </div>
//                 `;
//                 productList.append(productHTML);
//             });
//         },
//         error: function(xhr, status, error) {
//             console.log('Error:', error);
//         }
//     });
// }


function loadNewArrivalProducts() {
    $.ajax({
        url: 'data/new-arrival-products.json', // Path to your products.json file
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let productList = $('#new-arrival-products');
            data.products.forEach(function(product) {
                let stars = '';
                for (let i = 0; i < product.rating; i++) {
                    stars += '<i class="fas fa-star"></i>';
                }

                // Stringify the product to pass it to addToCart function
                const productJson = JSON.stringify(product).replace(/"/g, '&quot;');

                let productHTML = `
                    <div class="pro" onclick="window.location.href='sproduct.html?id=${product.id}&type=newarrival';">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <div class="des">
                            <span>${product.brand}</span>
                            <h5>${product.name}</h5>
                            <div class="star">${stars}</div>
                            <h4>$${product.price}</h4>
                        </div>
                        <a href="#" onclick="addToCart('${productJson}')"><i class="fal fa-shopping-cart cart"></i></a>
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



function generateUniqueId() {
    // Check if the unique ID already exists in localStorage
    let uniqueId = localStorage.getItem('uniqueUserId');
    
    if (!uniqueId) {
        // Generate a new unique ID if not already present
        uniqueId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
        localStorage.setItem('uniqueUserId', uniqueId);

        console.log('unique' , uniqueId);
        
    }
    else
    {
        console.log('unique' , uniqueId);
        
    }

    return uniqueId;
}




