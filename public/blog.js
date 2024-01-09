const newCommentHandler = async (event) => {
    event.preventDefault();

    const blog_id = document.getElementById('blog-id').value;
    const comment = document.querySelector("#comment").value.trim();

    console.log('This is comment data');
    console.log(comment);
    console.log(blog_id);
    

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
            document.location.replace('/profile');
        } else {
            alert('Comment failed to post');
        }

    }

 }

 const comments = document.querySelector('.new-comment-form')

console.log(comments);

comments.addEventListener('submit', newCommentHandler);