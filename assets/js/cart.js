$(document).ready(function () {
    loadCart();
    loadCartadd();
});

function loadCart() {
    // Fetch the cart data from cart.json
    $.getJSON('data/cart.json', function (data) {
        let cartItems = data.cart;  // Get the cart array from JSON
        let html = '';              // Variable to hold generated HTML

        // Loop through each item in the cart
        $.each(cartItems, function (index, item) {
            html += `
                <tr>
                    <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="${item.image}" alt="${item.product}"></td>
                    <td>${item.product}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" value="${item.quantity}" class="cart-quantity" data-index="${index}" min="1"></td>
                    <td>$${item.subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        // Insert the generated HTML into the table body
        $('section#cart tbody').html(html);
    }).fail(function() {
        console.error('Failed to load cart data.');
    });
}








// $(document).ready(function () {
//     loadCartadd();  // Call the function to load the cart-add section
// });

function loadCartadd() {
    $.ajax({
        url: 'data/cart-add.json', // Ensure this path is correct
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const cartAdd = response.cartAdd;

            // Populate the coupon section
            $('#coupon').html(`
                <h3>${cartAdd.coupon.title}</h3>
                <div>
                    <input type="text" placeholder="${cartAdd.coupon.inputPlaceholder}">
                    <button class="normal">${cartAdd.coupon.buttonText}</button>
                </div>
            `);

            // Populate the subtotal section
            $('#subtotal').html(`
                <h3>Cart Totals</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$ ${cartAdd.totals.cartSubtotal}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>${cartAdd.totals.shipping}</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$ ${cartAdd.totals.total}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <button class="normal">${cartAdd.totals.checkoutButtonText}</button>
            `);
        },
        error: function (error) {
            console.error("Error fetching the cart data", error);
        }
    });
}
