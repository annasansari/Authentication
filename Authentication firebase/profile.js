// import { fname, lname, signUpEmail } from "./app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


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
const storage = getStorage();
const db = getFirestore(app);


const uploadFile = (file) => {
    return new Promise((reslove, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    reslove(downloadURL);
                });
            }
        );
    })
}

let updatebtn = document.getElementById('update-Btn')
updatebtn && updatebtn.addEventListener('click', async () => {
    try {
        let file = document.getElementById('file')
        const res = await uploadFile(file.files[0])
        console.log('URL', res)
        let imgSet = document.getElementById('img-set')
        imgSet.src = res
    }
    catch (err) {
        console.log('err-->', err)
    }
})


let deleteFile = document.getElementById('deleteFile')
console.log(deleteFile)
deleteFile && deleteFile.addEventListener('click', () => {
    const desertRef = ref(storage, 'IMG_20220314_133018420.jpg');
    deleteObject(desertRef).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log('error-->', error)
    });
})

let logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener('click', () => {
window.location.replace('login.html') 
})



