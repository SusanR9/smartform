const passwordInput = document.getElementById("password");
const errorDiv = document.getElementById("error");

// 🔥 Real-time validation
passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!regex.test(value)) {
        errorDiv.innerText =
            "Password must contain 1 uppercase & 1 number (min 6 chars)";
    } else {
        errorDiv.innerText = "";
    }
});

// 🔐 Get CSRF token
function getCSRFToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken'))
        ?.split('=')[1];
}

// 🚫 Prevent duplicate submit
let isSubmitting = false;

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        const res = await fetch("/submit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()   // ✅ FIX ADDED HERE
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            errorDiv.innerText = result.error;
        } else {
            errorDiv.innerText = "";
            alert("Form submitted successfully!");
        }

    } catch (error) {
        errorDiv.innerText = "Something went wrong!";
    }

    isSubmitting = false;
});