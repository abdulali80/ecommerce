$(document).ready(function() {
    loadCheckout();
});
function loadCheckout() {
    // Fetch checkout.json data using AJAX
    $.ajax({
      url: "data/checkout.json",
      method: "GET",
      dataType: "json",
      success: function(data) {
        // Populate form fields and options
        // Example for text inputs
        $('input[name="first_name"]').val(data.checkout_form.first_name);
        $('input[name="last_name"]').val(data.checkout_form.last_name);
        $('input[name="email_address"]').val(data.checkout_form.email_address);
        $('input[name="phone_number"]').val(data.checkout_form.phone_number);
        $('input[name="address_line_1"]').val(data.checkout_form.address_line_1);
        $('input[name="address_line_2"]').val(data.checkout_form.address_line_2);
        $('input[name="postal_code"]').val(data.checkout_form.postal_code);

        // Example for select elements
        $('select[name="country"]').html(
          data.checkout_form.country.map(option => `<option>${option}</option>`).join('')
        );
        $('select[name="state_division"]').html(
          data.checkout_form.state_division.map(option => `<option>${option}</option>`).join('')
        );
        $('select[name="company"]').html(
          data.checkout_form.company.map(option => `<option>${option}</option>`).join('')
        );

        // Update cart totals
        $('.sub-total').text(data.cart_totals.subtotal);
        $('.shipping').text(data.cart_totals.shipping);
        $('.total').text(data.cart_totals.total);

        // Update payment methods
        $('input[name="payment_method"]').each(function(index) {
          $(this).next('span').text(data.payment_methods[index]);
        });
      },
      error: function(err) {
        console.log("Error fetching JSON", err);
      }
    });
  }