$(document).ready(function() {
    loadCheckout();
});

function loadCheckout() {
    const container = $('#checkout');
    
    const checkoutHtml = `
        <div class="container">
            <div class="row">
                <div class="checkout_1 clearfix">
                    <div class="col-sm-8">
                        <div class="checkout_1l clearfix">
                            <h2 class="mgtt">Make Your Checkout Here</h2>
                            <p class="pp">Please register in order to checkout more quickly</p>
                        </div><br>
                        <div class="checkout_1l1 clearfix">
                            <div class="col-sm-6 space_left">
                                <h5>First Name <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="first-name">
                            </div>
                            <div class="col-sm-6 space_left">
                                <h5>Last Name <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="last-name">
                            </div>
                        </div>
                        <div class="checkout_1l1 clearfix">
                            <div class="col-sm-6 space_left">
                                <h5>Email Address <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="email-address">
                            </div>
                            <div class="col-sm-6 space_left">
                                <h5>Phone Number <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="phone-number">
                            </div>
                        </div>
                        <div class="checkout_1l1 clearfix">
                            <div class="col-sm-6 space_left">
                                <h5>Country <span class="col_1">*</span></h5>
                                <select class="form-control" id="country">
                                    <option>India</option>
                                    <option>Paksitan</option>
                                    <option>Russia</option>
                                    <option>England</option>
                                    <option>Nepal</option>
                                </select>
                            </div>
                            <div class="col-sm-6 space_left">
                                <h5>State / Division <span class="col_1">*</span></h5>
                                <select class="form-control" id="state">
                                    <option>UP</option>
                                    <option>MP</option>
                                    <option>Bihar</option>
                                    <option>Delhi</option>
                                    <option>Jharkhand</option>
                                </select>
                            </div>
                        </div>
                        <div class="checkout_1l1 clearfix">
                            <div class="col-sm-6 space_left">
                                <h5>Address Line 1 <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="address-line1">
                            </div>
                            <div class="col-sm-6 space_left">
                                <h5>Address Line 2 <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="address-line2">
                            </div>
                        </div>
                        <div class="checkout_1l1 clearfix">
                            <div class="col-sm-6 space_left">
                                <h5>Postal Code <span class="col_1">*</span></h5>
                                <input class="form-control" type="text" id="postal-code">
                            </div>
                            <div class="col-sm-6 space_left">
                                <h5>Company <span class="col_1">*</span></h5>
                                <select class="form-control" id="company">
                                    <option>Microsoft</option>
                                    <option>Xiaomi</option>
                                    <option>Apple</option>
                                    <option>Samsung</option>
                                    <option>Motorola</option>
                                </select>
                            </div>
                        </div>
                        <div class="checkout_1l clearfix">
                            <p><input type="checkbox" id="create-account"> Create an account?</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="checkout_1r clearfix">
                            <h4 class="mgt">CART TOTALS</h4>
                            <hr class="hr_1">
                            <h5 class="mgtx">Sub Total <span class="pull-right" id="cart-subtotal">$230.00</span></h5>
                            <h5 class="mgtx">(+) Shipping <span class="pull-right" id="shipping">$20.00</span></h5>
                            <hr class="hr_2"> 
                            <h5 class="mgt">Total <span class="pull-right" id="cart-total">$250.00</span></h5><br>
                            <h4 class="mgt">PAYMENTS</h4>
                            <hr class="hr_1">
                            <p><input type="radio" name="payment-method" id="check-payments"> <span>Check Payments</span></p>
                            <p><input type="radio" name="payment-method" id="cash-on-delivery"> <span>Cash On Delivery</span></p>
                            <p><input type="radio" name="payment-method" id="paypal"> <span>PayPal</span></p><br>
                            <h6><a class="button" href="#">PROCEED TO CHECKOUT</a></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.html(checkoutHtml);
    updateCartTotals(); // Ensure totals are up-to-date
}

function updateCartTotals() {
    // Calculate totals dynamically
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let cartSubtotal = 0;
    
    Object.values(cart).forEach(product => {
        cartSubtotal += product.price * product.quantity;
    });

    const shipping = 10.00; // Fixed shipping cost
    const total = cartSubtotal + shipping;

    $('#cart-subtotal').text(`$${cartSubtotal.toFixed(2)}`);
    $('#shipping').text(`$${shipping.toFixed(2)}`);
    $('#cart-total').text(`$${total.toFixed(2)}`);
}




