// Backend API Base URL
const BASE_URL = "https://orbit-a.vercel.app/api";

// Handle Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    try {
        const response = await fetch(`${BASE_URL}/contact/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, subject, message }),
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.detail || "Something went wrong."}`);
        }
    } catch (error) {
        alert("Network error. Please try again later.");
    }
});


// Function to handle subscription form submission
async function handleSubscriptionFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const form = event.target; // The current form being submitted
    const emailInput = form.querySelector(".subscription-email");
    const feedbackDiv = form.querySelector(".mail-form-message");

    const email = emailInput.value;

    try {
        const response = await fetch(`${BASE_URL}/email/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            feedbackDiv.textContent = "Subscription successful!";
            feedbackDiv.style.color = "green";
            emailInput.value = ""; // Reset the input field
        } else {
            const errorData = await response.json();
            feedbackDiv.textContent = `Error: ${errorData.detail || "Something went wrong."}`;
            feedbackDiv.style.color = "red";
        }
    } catch (error) {
        feedbackDiv.textContent = "Network error. Please try again later.";
        feedbackDiv.style.color = "red";
    }
}

// Attach event listeners to all email subscription forms
const subscriptionForms = document.querySelectorAll(".email-subscription-form");
subscriptionForms.forEach((form) => {
    form.addEventListener("submit", handleSubscriptionFormSubmit);
});