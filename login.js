document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading page
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In:", userCredential.user);
        alert("Login Successful!");
        window.location.href = "homepage.html"; 
    } catch (error) {
        console.error("Login Error:", error.message);
        alert(error.message);
    }
});
