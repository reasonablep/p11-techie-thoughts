const newCommentHandler = async (event) => {
    event.preventDefault();

    const blog_id = document.getElementById('blog-id').value;
    const comment = document.querySelector("#comment").value.trim();
    

    if (comment) {
        const response = await fetch (`/api/comment/${blog_id}`, {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            console.log(response);
            window.location.reload();
        } else {
            alert('Comment failed to post');
        }

    }

 }

 const comments = document.querySelector('.new-comment-form')

console.log(comments);

comments.addEventListener('submit', newCommentHandler);