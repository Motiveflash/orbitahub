// Supabase Configuration
const SUPABASE_URL = "https://xwfiyhsfxfjmfviiiumf.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Zml5aHNmeGZqbWZ2aWlpdW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MDExNzIsImV4cCI6MjA0OTI3NzE3Mn0.0kXoH7ZKHaSMgpJC78kbR5R9XnC4pdUaCrdDjtBMcyI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    "use strict"; // Enables strict mode globally

    /**
     * Automatically hides the feedback message after a given timeout.
     * @param {HTMLElement} feedbackElement - The element containing the feedback message.
     * @param {number} timeout - Time in milliseconds to wait before hiding the message.
     */
    const hideFeedbackAfterTimeout = (feedbackElement, timeout = 5000) => {
        setTimeout(() => {
            feedbackElement.textContent = "";
            feedbackElement.style.color = "";
            location.reload();
        }, timeout);
    };

    // Handle Contact Form Submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent page reload

            // Get form data
            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            const feedbackDiv = document.getElementById("contactFeedback"); // Ensure this div exists in your HTML

            try {
                const { data, error } = await supabase.from("contacts").insert([
                    { name, email, subject, message },
                ]);

                // Display appropriate message
                if (error) {
                    console.error("Error inserting data:", error.message);
                    feedbackDiv.textContent = "Failed to send your message. Please try again.";
                    feedbackDiv.style.color = "red";
                } else {
                    feedbackDiv.textContent = "Message sent successfully!";
                    feedbackDiv.style.color = "green";
                    contactForm.reset(); // Reset form fields
                }

                // Hide feedback message after 5 seconds
                hideFeedbackAfterTimeout(feedbackDiv);
                 
            } catch (error) {
                feedbackDiv.textContent = "Network error. Please try again later.";
                feedbackDiv.style.color = "red";
                console.error(error);

                // Hide feedback message after 5 seconds
                hideFeedbackAfterTimeout(feedbackDiv);
                
            }
        });
    }

    // Handle Subscription Form Submission
    const subs = document.querySelectorAll(".mail-form");
    const subscriptionForms = document.querySelectorAll(".email-subscription-form");
    subscriptionForms.forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent page reload

            const emailInput = form.querySelector(".subscription-email");
            const feedbackDivMsg = form.querySelector(".mail-form-message");

            const email = emailInput.value.trim();

            try {
                const { data, error } = await supabase.from("subscriptions").insert([
                    { email },
                ]);

                // Display appropriate message
                if (error) {
                    if (error.code === "23505") {
                        feedbackDivMsg.textContent = "Email already subscribed.";
                    } else {
                        feedbackDivMsg.textContent = `Error: ${error.message}`;
                    }
                    feedbackDivMsg.style.color = "red";
                } else {
                    feedbackDivMsg.textContent = "Subscription successful!";
                    feedbackDivMsg.style.color = "green";
                    emailInput.value = ""; // Reset the input field
                }

                // Hide feedback message after 5 seconds
                hideFeedbackAfterTimeout(feedbackDivMsg);
                
            } catch (error) {
                feedbackDivMsg.textContent = "Network error. Please try again later.";
                feedbackDivMsg.style.color = "red";
                console.error(error);

                // Hide feedback message after 5 seconds
                hideFeedbackAfterTimeout(feedbackDivMsg);
                
            }
        });
    });
});


// JavaScript for Mailing Form
document.addEventListener("DOMContentLoaded", function () {
    "use strict"; // Enables strict mode globally

    const modal = document.getElementById("coming-soon");
    const closeModal = document.querySelector(".close");
    const footerForm = document.getElementById("hero-mail-form-form");

    // Add event listener to all buttons with the class "joinButton"
    const joinButtons = document.querySelectorAll(".joinButton"); // Select all buttons with the class
    joinButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            modal.style.transform = "translateX(0)"; // Open the modal
        });
    });

    // Close the modal when the close button (X) is clicked
    closeModal.addEventListener("click", function () {
        modal.style.transform = "translateX(-100%)"; // Close the modal
    });

    // Close the modal if the user clicks outside the modal (on the background)
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.transform = "translateX(-100%)"; // Close the modal
        }
    });

    // Form submission without page reload
    footerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = footerForm.querySelector("input").value;
        alert(`Thank you for joining our mailing list, ${email}!`);

        // Optional: Display a thank-you message
        const mailingMessage = document.createElement("div");
        mailingMessage.id = "mailing-message";
        mailingMessage.textContent = `Thank you for subscribing!`;
        document.body.appendChild(mailingMessage);

        // Optionally, close the modal
        modal.style.transform = "translateX(-100%)";
    });
});
// side bar start  
function openNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function closeNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "-320px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}


function toggleCollapse(elementId) {
    var element = document.getElementById(elementId);
    var button = document.querySelector('.collapse_btn a');

    // Toggle the 'show' class
    element.classList.toggle('show');

    // Toggle aria-expanded attribute
    var isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
}


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}

// button back to top 
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}

