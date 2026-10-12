
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    formMessage.textContent =
        "Thank you, " + name +
        "! Your message has been received. We will contact you at " +
        email + ".";

    formMessage.hidden = false;

    form.reset();
});


// Random Fact Generator - External API

const factButton = document.getElementById("factButton");
const factResult = document.getElementById("factResult");

factButton.addEventListener("click", function () {
    factButton.disabled = true;
    factButton.textContent = "Loading...";

    factResult.hidden = false;
    factResult.textContent = "Loading a random fact...";

    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load a fact");
            }

            return response.json();
        })
        .then(function (data) {
            factResult.textContent = data.text;
        })
        .catch(function (error) {
            factResult.textContent =
                "Sorry, we could not load a fact. Please try again.";

            console.error(error);
        })
        .finally(function () {
            factButton.disabled = false;
            factButton.textContent = "Show Me a Fact";
        });
});
