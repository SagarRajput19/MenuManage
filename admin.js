import { auth, db } from "./firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// ✅ Fetch and display the restaurant name when logged in
document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("restaurantName").innerText = user.email;
        } else {
            window.location.href = "login.html";
        }
    });
});

// ✅ Add Food Item to Firestore
document.getElementById("foodForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const category = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value); // Ensure price is a number
    const description = document.getElementById("description").value;

    if (!foodName || !imageUrl || !category || isNaN(price) || !description) {
        alert("Please fill all fields correctly!");
        return;
    }

    const user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, "foods"), {
                foodName,
                imageUrl,
                category,
                price, 
                description,
                userId: user.uid // Associate with restaurant user
            });

            alert("Food item added successfully!");
            document.getElementById("foodForm").reset();
        } catch (error) {
            alert("Error adding food: " + error.message);
        }
    }
});

// ✅ Fix Logout Function
document.getElementById("logoutButton").addEventListener("click", async function () {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        alert("Error logging out: " + error.message);
    }
});
