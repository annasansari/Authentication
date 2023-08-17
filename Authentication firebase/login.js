import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCpYA04UxbBtdx9REu8XKLJBf6-iXZPsZM",
    authDomain: "chatapp-3b94e.firebaseapp.com",
    projectId: "chatapp-3b94e",
    storageBucket: "chatapp-3b94e.appspot.com",
    messagingSenderId: "60591552131",
    appId: "1:60591552131:web:e1fe24ee969ec6eecd0db6",
    measurementId: "G-3682ZNNYR7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

let loginBtn = document.getElementById('login-btn')
loginBtn && loginBtn.addEventListener('click',() => {
let loginEmail = document.getElementById('login-email')
let loginPassword = document.getElementById('login-password')
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('user==>', user)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successful!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.replace('profile.html')
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                title: errorCode.slice(5),
                text: 'Try again!',
              })
        });
})