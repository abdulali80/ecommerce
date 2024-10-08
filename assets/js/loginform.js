$(document).ready(function () {
    loadLoginform();
});

function loadLoginform() {
    $.ajax({
        url: 'data/loginform.json', // Make sure your path is correct and includes the '.json' extension
        dataType: 'json',
        success: function (data) {
            // Clear out the existing form contents (in case of reload)
            const loginForm = $('#loginForm');
            loginForm.empty();

            // Append the login form fields
            data.login.fields.forEach(field => {
                loginForm.append(`
                    <div class="input-group">
                        <label for="${field.id}" class="dd">${field.label} <span>*</span></label>
                        <input type="${field.type}" id="${field.id}" name="${field.id}" required="${field.required}">
                    </div>
                `);
            });

            // Social Networks
            let socialIcons = '<div class="input-group social-login"><label class="dd">Social network:</label><div class="social-icons">';
            data.login.socialNetworks.forEach(social => {
                socialIcons += `<a href="#"><i class="${social.icon}"></i></a>`;
            });
            socialIcons += '</div></div>';
            loginForm.append(socialIcons);

            // Remember Me checkbox
            loginForm.append(`
                <div class="input-group remember-me">
                    <input type="checkbox" id="${data.login.checkbox.id}">
                    <label for="${data.login.checkbox.id}" class="dd">${data.login.checkbox.label}</label>
                </div>
            `);

            // Submit button for login form
            loginForm.append(`<button type="submit" class="submit-btn">${data.login.submitText}</button>`);

            // Clear out the existing register form contents
            const registerForm = $('#registerForm');
            registerForm.empty();

            // Append the register form fields
            data.register.fields.forEach(field => {
                if (field.type === 'radio') {
                    let radioGroup = '<div class="input-group"><div class="radio-group">';
                    field.options.forEach(option => {
                        radioGroup += `
                            <input type="radio" id="${option.id}" name="${field.name}" value="${option.value}" required="${option.required}">
                            <label for="${option.id}" class="dd">${option.label}</label><br>
                        `;
                    });
                    radioGroup += '</div></div>';
                    registerForm.append(radioGroup);
                } else {
                    registerForm.append(`
                        <div class="input-group">
                            <label for="${field.id}" class="dd">${field.label} <span>*</span></label>
                            <input type="${field.type}" id="${field.id}" name="${field.id}" required="${field.required}">
                        </div>
                    `);
                }
            });

            // Submit button for register form
            registerForm.append(`<button type="submit" class="submit-btn">${data.register.submitText}</button>`);
        },
        error: function (err) {
            console.error("Error loading JSON", err);
        }
    });
}
