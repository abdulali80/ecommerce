$(document).ready(function () {
    loadCart();
    loadCartadd();
});
function loadCart() {   
    // Fetch the cart data
    $.getJSON('data/cart', function (data) {
        let cartItems = data.cart;
        let html = '';

        // Loop through the cart items
        $.each(cartItems, function (index, item) {
            html += `
                <tr>
                    <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="${item.image}" alt=""></td>
                    <td>${item.product}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" value="${item.quantity}" name="" id=""></td>
                    <td>$${item.subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        // Insert the generated HTML into the table body
        $('#cart-items').html(html);
    });
};



$(document).ready(function () {
    // AJAX request to fetch cart-add.json
    $.ajax({
        url: 'cart-add.json', // Replace with the path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const cartAdd = response.cartAdd;

            // Populate coupon section
            $('#coupon').html(`
                <h3>${cartAdd.coupon.title}</h3>
                <div>
                    <input type="text" placeholder="${cartAdd.coupon.inputPlaceholder}">
                    <button class="normal">${cartAdd.coupon.buttonText}</button>
                </div>
            `);

            // Populate subtotal section
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
});