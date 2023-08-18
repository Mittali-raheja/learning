
const blogContainer = document.getElementById('blogContainer');
const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
blogs.forEach(blog => {
    const blogElement = document.createElement('div');
    blogElement.classList.add('blog__container');
    blogElement.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        <div class="comment__section">
            <div class="heart__icon--comment">
                ${blog.typeOfFeedback ? `<i class="fas fa-heart positive"></i>` : `<i class="far fa-heart"></i>`}
            </div>
            <button>Comment</button>
        </div>
    `;

    const commentSection = document.createElement('div');
    commentSection.classList.add('comment__section');

    blog.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <strong>${comment.commenterName}</strong> ${comment.commentText}
        `;
        commentSection.appendChild(commentElement);
    });

    blogElement.appendChild(commentSection);

    blogContainer.appendChild(blogElement);
});
