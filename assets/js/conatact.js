$(document).ready(function () {
    loadContactDetails();
    loadFormdetailscontact();
});

function loadContactDetails() {    
    // Fetching the JSON data using AJAX
    $.ajax({
        url: 'data/contact-details.json',  // Path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const contactDetails = data.contactDetails;
            
            // Injecting the details into the HTML
            $('#contact-details .details').html(`
                <span>${contactDetails.title}</span>
                <h2>${contactDetails.subtitle}</h2>
                <h3>${contactDetails.companyName}</h3>
                <ul>
                    <li>
                        <i class="${contactDetails.location.icon}"></i>
                        <p>${contactDetails.location.address}</p>
                    </li>
                    <li>
                        <i class="${contactDetails.email.icon}"></i>
                        <p>${contactDetails.email.address}</p>
                    </li>
                    <li>
                        <i class="${contactDetails.phone.icon}"></i>
                        <p>${contactDetails.phone.numbers.join(', ')}</p>
                    </li>
                    <li>
                        <i class="${contactDetails.hours.icon}"></i>
                        <p>${contactDetails.hours.timing}</p>
                    </li>
                </ul>
            `);

            // Injecting the map iframe
            $('#contact-details .map').html(`
                <iframe src="${contactDetails.map.iframeSrc}" width="${contactDetails.map.width}" height="${contactDetails.map.height}" style="${contactDetails.map.style}" allowfullscreen="" loading="${contactDetails.map.loading}" referrerpolicy="${contactDetails.map.referrerPolicy}"></iframe>
            `);
        },
        error: function (err) {
            console.error('Error fetching the contact data', err);
        }
    });
}


function loadFormdetailscontact() {
    $.ajax({
        url: 'data/form-details-contact.json', // Replace with the actual path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Dynamically create the form section
            let formHTML = `<span>${data.formDetails.form.title}</span>
                            <h2>${data.formDetails.form.subtitle}</h2>`;

            data.formDetails.form.fields.forEach(field => {
                if (field.type === "textarea") {
                    formHTML += `<textarea placeholder="${field.placeholder}" cols="30" rows="10"></textarea>`;
                } else {
                    formHTML += `<input type="${field.type}" placeholder="${field.placeholder}">`;
                }
            });

            formHTML += `<button class="normal">${data.formDetails.form.button}</button>`;

            // Inject form content into the form element
            $('#form-details form').html(formHTML);

            // Dynamically create the people section
            let peopleHTML = '';
            data.formDetails.people.forEach(person => {
                peopleHTML += `<div>
                                <img src="${person.image}" alt="${person.name}">
                                <p><span>${person.name}</span> ${person.role} <br>
                                Phone: ${person.phone} <br>
                                Email: ${person.email}</p>
                               </div>`;
            });

            // Inject people content into the .people element
            $('#form-details .people').html(peopleHTML);
        },
        error: function (err) {
            console.log('Error loading JSON:', err);
        }
    });
}


