$(document).ready(function () {
    loadAbout();
});
function loadAbout() {
    $.ajax({
        url: 'data/about.json', // Replace with the actual path to your JSON file
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          
            const whoWeAre = data.about.whoWeAre;
            const aboutApp = data.about.aboutApp;

            // Create the 'Who We Are' section
            const whoWeAreSection = `
        <section id="about-head" class="section-p1">
            <img src="${whoWeAre.image}" alt="">
            <div>
                <h2>${whoWeAre.title}</h2>
                <p>${whoWeAre.description}</p>
                <abbr title="">${whoWeAre.extraInfo}</abbr>
                <br><br>
                <marquee bgcolor="${whoWeAre.marquee.bgcolor}" loop="${whoWeAre.marquee.loop}" scrollamount="${whoWeAre.marquee.scrollAmount}" width="${whoWeAre.marquee.width}">
                    ${whoWeAre.marquee.text}
                </marquee>
            </div>
        </section>
    `;

            // Create the 'Download Our App' section
            const aboutAppSection = `
        <section id="about-app" class="section-p1">
            <h1>${aboutApp.title} <a href="${aboutApp.appLink}">App</a></h1>
            <div class="video">
                <video autoplay="${aboutApp.video.autoplay}" muted="${aboutApp.video.muted}" loop="${aboutApp.video.loop}" src="${aboutApp.video.src}"></video>
            </div>
        </section>
    `;

            // Append the sections to the body or a specific container
            $('#about-section').append(whoWeAreSection);
            $('#about-section').append(aboutAppSection);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}
