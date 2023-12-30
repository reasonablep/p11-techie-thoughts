 const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

if (title && content) {
    const blogs = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        }, 
    });

    if (blogs.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to create new blog post');
    }
}


 };

 const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();

    if (comment) {
        const response = await fetch ('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Comment failed to post');
        }

    }

 }

 const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch (`/api/blog/${id}`, {
            method: 'DELETE'
        });

        console.log(response);
        if (response.ok) {
            alert('Blog post deleted')
        } else {
            alert('Failed to delete blog post');
        }
    }
 };

 document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

 document.querySelector('new-comment-form').addEventListener('submit', newCommentHandler )

 document.querySelector('.blog-title').addEventListener('click', delButtonHandler);