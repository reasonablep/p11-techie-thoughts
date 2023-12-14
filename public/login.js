document.querySelector('.loginBlock').style.display = 'none';

let toggle = 1;

document.querySelector('#accSignup').addEventListener('click', () =>{
    if (toggle === 1) {
        document.querySelector('#hideSignup').style.display = 'initial';
        toggle = 0;
    } else if (toggle === 0) {
        document.querySelector('#hideSignup').style.display = 'none';
        toggle = 1;
    };
});

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert (response.statusText);Z
        }
    }

};

const signUpHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    const password = document.querySelector('#password-signup').value.trim();
    const password2 = document.querySelector('#password-signup2').value.trim();

if (name.length < 6 || name.length > 20) {
    document.querySelector('username-label').innerHTML('Username must be between 6 and 20 characters!');
}
if (!isPasswordLengthValid(password)) {
    document.querySelector('#password-label').innerHTML = 'Password must be at least 8 characters';
    return;
}
if (!isPasswordNumberValid(password)) {
    document.querySelector('#password-label').innerHTML = 'Password must include at least one number';
    return;
}
if (password !== password2) {
    document.querySelector("#pw-tryagain").innerHTML('Entered passwords did not match.');
    return;
}

if (name && email && password) {
    const response = await fetch ('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}
return false;

};

const isEmail = (password) => {
    const emailRegex = /\w+@\w+\.\w{2,3}/;
    return emailRegex.test(password);
}

const isPasswordLengthValid = (password) => {
    return password.length >= 8; 
};

const isPasswordNumberValid = (password) => {
    const numberRegex = /\d/;
    return numberRegex.text(password);
}

const isPasswordValid = (password) => {
    const isLengthValid = isPasswordLengthValid(password);
    const isNumberValid = isPasswordNumberValid(password);
    
    return isLengthValid && isNumberValid
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signUpHandler);