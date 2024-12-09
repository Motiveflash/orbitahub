// Supabase Configuration
const SUPABASE_URL = "https://xwfiyhsfxfjmfviiiumf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Zml5aHNmeGZqbWZ2aWlpdW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MDExNzIsImV4cCI6MjA0OTI3NzE3Mn0.0kXoH7ZKHaSMgpJC78kbR5R9XnC4pdUaCrdDjtBMcyI";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Handle Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    try {
        const { data, error } = await supabase.from("contacts").insert([
            { name, email, subject, message }
        ]);

        console.log("Response:", data, error);

        if (error) {
            console.error("Error inserting data:", error.message);
            alert("Failed to send your message. Please try again.");
        } else {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
            location.reload();
        }
    } catch (error) {
        alert("Network error. Please try again later.");
        console.error(error);
    }
});

// Handle Subscription Form Submission
async function handleSubscriptionFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = form.querySelector(".subscription-email");
    const feedbackDiv = form.querySelector(".mail-form-message");

    const email = emailInput.value.trim();

    try {
        const { data, error } = await supabase.from("subscriptions").insert([
            { email }
        ]);

        console.log("Response:", data, error);

        if (error) {
            if (error.code === "23505") {
                feedbackDiv.textContent = "Email already subscribed.";
            } else {
                feedbackDiv.textContent = `Error: ${error.message}`;
            }
            feedbackDiv.style.color = "red";
        } else {
            feedbackDiv.textContent = "Subscription successful!";
            feedbackDiv.style.color = "green";
            emailInput.value = ""; // Reset the input field
            location.reload();
        }
    } catch (error) {
        feedbackDiv.textContent = "Network error. Please try again later.";
        feedbackDiv.style.color = "red";
        console.error(error);
    }
}

// Attach event listeners to all subscription forms
const subscriptionForms = document.querySelectorAll(".email-subscription-form");
subscriptionForms.forEach((form) => {
    form.addEventListener("submit", handleSubscriptionFormSubmit);
});
