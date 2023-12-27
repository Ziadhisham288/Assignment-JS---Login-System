let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let accountsList;
let registerBtn = document.getElementById("registerBtn");
let loginBtn = document.getElementById("loginBtn");
let message = document.getElementById("message");
let welcomeMessage = document.getElementById("welcomeMessage");
let logoutBtn = document.getElementById("logout");


if (localStorage.getItem("accountsList") == null) {
    accountsList = [];
} else {
    accountsList = JSON.parse(localStorage.getItem("accountsList"));
}


function register() {
    if (validateEmail() == true && validatePassword() == true) {
        const userAccount = {
            name: userName.value,
            email: email.value,
            password: password.value
        }
        message.innerHTML = `Registeration Successful`;
        message.style.color = "rgb(5, 237, 5)";
        accountsList.push(userAccount);
        localStorage.setItem("accountsList", JSON.stringify(accountsList));
        clear();
    } else {
        message.innerHTML = `Invalid Password or Email`;
        message.style.color = "rgb(244, 11, 11)";
        clear();
    }
}

registerBtn.addEventListener("click", register)


function login() {
    let emailLogin = document.getElementById("loginEmail").value;
    let passwordLogin = document.getElementById("loginPassword").value;
    const loginCheck = JSON.parse(localStorage.getItem('accountsList'));

    for (let i = 0; i < loginCheck.length; i++) {
        if (loginCheck[i].email === emailLogin && loginCheck[i].password === passwordLogin) {
            message.innerHTML = `Welcome! ${loginCheck[i].name}`;
            message.style.color = "rgb(5, 237, 5)";
            window.location.href = 'welcomePage.html';
        }
        if (loginCheck[i].email === emailLogin && loginCheck[i].password !== passwordLogin) {
            message.innerHTML = `Wrong Credintials`;
            message.style.color = "rgb(244, 11, 11)";
        }
        if (loginCheck[i].email !== emailLogin) {
            message.innerHTML = `User not found`;
            message.style.color = "rgb(244, 11, 11)";
        }
    }

}

loginBtn.addEventListener("click", login);

logoutBtn.addEventListener("click", () => {
    window.location.href = 'login.html';
})

function clear() {
    userName.value = "";
    email.value = "";
    password.value = "";
}

function validateEmail() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email.value);
}

function validatePassword() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password.value);
}

