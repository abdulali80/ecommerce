$(document).ready(function() {
    loadBlogpost();
});
function loadBlogpost() {
    $.ajax({
        url: 'data/blog-post.json', // Path to your blog-posts.json file
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            let blogList = $('#blog');
            response.blogs.forEach(function(blog) {
                let blogHTML = `
                    <div class="blog-box">
                        <div class="blog-img">
                            <img src="${blog.image}" alt="${blog.title}">
                        </div>
                        <div class="blog-details">
                            <h4>${blog.title}</h4>
                            <p>${blog.excerpt}</p>
                            <a href="${blog.url}">CONTINUE READING</a>
                        </div>
                        <h1>${blog.date}</h1>
                    </div>
                `;
                blogList.append(blogHTML);
            });
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}