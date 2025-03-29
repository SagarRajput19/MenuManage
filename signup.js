import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const restaurantName = document.getElementById("restaurantName").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "restaurants", user.uid), {
            restaurantName,
            address,
            email,
            uid: user.uid
        });

        alert("Account created successfully!");
        window.location.href = "admin.html";
    } catch (error) {
        alert(error.message);
    }
});
