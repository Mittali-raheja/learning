const blogForm = document.getElementById('blogForm');
const blogTitleInput = document.getElementById('blogTitle');
const blogContentInput = document.getElementById('blogContent');

blogForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const blogTitle = blogTitleInput.value;
    const blogContent = blogContentInput.value;

    if (blogTitle && blogContent) {
        const newBlog = {
            "id": Math.floor(Math.random() * 1000) + 1,
            "title": blogTitle,
            "content": blogContent,
            "typeOfFeedback": false, // Set based on user's input
            "comments": [] // Initialize an empty array for comments
        };

       
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push(newBlog);

       
        localStorage.setItem('blogs', JSON.stringify(blogs));

       
        blogTitleInput.value = '';
        blogContentInput.value = '';

        alert('Blog submitted successfully!');
    }
});
