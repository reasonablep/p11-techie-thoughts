document.querySelector('.login').computedStyleMap.display = 'none';

const loginForm = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert (response.statusText);
        }
    }

};

const signUpHandler = async (event) => {
    event.preventDefault();
}