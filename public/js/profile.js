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

 const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
const id = event.target.getAttribute('data-id')
        const response = await fetch (`/api/blog/${id}`, {
            method: 'DELETE'
        });

        console.log(response);
        if (response.ok) {
            alert('Blog post deleted');
            document.location.replace('/profile')
        } else {
            alert('Failed to delete blog post');
        }
    }
 };


 document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

 const deleteButtons = document.querySelectorAll('.del-button');

 console.log(deleteButtons);

 for (i=0; i<deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', delButtonHandler);
}
