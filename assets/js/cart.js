$(document).ready(function () {
    loadCart();
    updateCart();
    updateCartCount(); // Update cart count in header on page load
});

let cart;

function removeProduct(index) {
    cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Get product ID from the row index
    const productId = $(`#quantity_${index}`).data('product-id');

    if (cart[productId]) {
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();  // Reload cart to reflect changes
        updateCartCount();  // Update cart count
        updateCartTotals(); // Update totals after product is removed
    }
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(cart).length === 0) {
        $('section#cart tbody').html('<p>Your cart is empty.</p>');
        $('#update-cart').remove(); // Remove the update button if the cart is empty
        $('#cart-add').hide(); // Hide the cart totals and coupon section if the cart is empty
        return;
    }

    let html = '';
    let index = -1;

    Object.values(cart).forEach((product, i) => {
        index = i;
        html += `
        <tr>
            <td><a href="#" onclick="removeProduct(${index}); return false;"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${product.images[0]}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>$ <span id="price_${index}">${product.price}</span></td>
            <td><input type="number" onchange="handleQuantityChange(${index}, ${product.id})" value="${product.quantity}" class="cart-quantity" id="quantity_${index}" data-product-id="${product.id}" min="1"></td>
            <td>$<span id="subTotal_${index}">${(product.quantity * product.price).toFixed(2)}</span></td>
        </tr>
    `;
    });

    $('section#cart tbody').html(html);

    if ($('#update-cart').length === 0) {
        $('section#cart').append('<button id="update-cart" class="normal">Update Cart</button>');
    }

    if (html.length > 0) {
        updateCartTotals(); // Ensure this is called to update cart totals
        $('#cart-add').show(); // Show the cart totals and coupon section if the cart has items
    } else {
        $('#update-cart').remove(); // Remove the update button if there are no items
    }
}

function handleQuantityChange(index, productId) {
    const newQuantity = parseInt($(`#quantity_${index}`).val(), 10);

    if (newQuantity > 0) {
        cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[productId]) {
            cart[productId].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    updateCartTotals(); // Recalculate totals when quantity changes
}

function updateCartTotals() {
    let cartSubtotal = 0;
    let shipment = parseFloat($("#shipment").text()) || 0;

    Object.values(cart).forEach((product, index) => {
        const productSubtotal = product.quantity * product.price;
        cartSubtotal += productSubtotal;
        
        // Update the individual product subtotal in the cart
        $(`#subTotal_${index}`).text(productSubtotal.toFixed(2));
    });

    $("#subTotal").text(cartSubtotal.toFixed(2));
    $("#total").text((cartSubtotal + shipment).toFixed(2));
}

function updateCart() {
    $('#update-cart').click(function () {
        const updatedCart = {};

        $('.cart-quantity').each(function () {
            const productId = $(this).data('product-id');
            const newQuantity = parseInt($(this).val(), 10);

            if (newQuantity > 0) {
                cart = JSON.parse(localStorage.getItem('cart')) || {};
                if (cart[productId]) {
                    cart[productId].quantity = newQuantity;
                    updatedCart[productId] = cart[productId];
                }
            }
        });

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Cart updated successfully!');

        loadCart();  // Reload cart to reflect updates
        updateCartCount();  // Update cart count
        updateCartTotals(); // Update totals section
    });
}

function calculateCartQuantity() {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalItems = 0;

    Object.values(cart).forEach(product => {
        totalItems += product.quantity; // Count total quantity of all products
    });

    return totalItems;
}

function updateCartCount() {
    const totalItems = calculateCartQuantity();
    $('#cart-count').text(totalItems);
}



















// loadCartadd();


// function loadCartadd() {
//     $.ajax({
//         url: 'data/cart-add.json', // Ensure this path is correct
//         method: 'GET',
//         dataType: 'json',
//         success: function (response) {
//             const cartAdd = response.cartAdd;

//             // Populate the coupon section
//             $('#coupon').html(`
//                 <h3>${cartAdd.coupon.title}</h3>
//                 <div>
//                     <input type="text" placeholder="${cartAdd.coupon.inputPlaceholder}">
//                     <button class="normal">${cartAdd.coupon.buttonText}</button>
//                 </div>
//             `);

//             updateCartTotals(); // Ensure this is called to update cart totals
//         },
//         error: function (error) {
//             console.error("Error fetching the cart data", error);
//         }
//     });
// }





