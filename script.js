
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(
        "Thank you, " + name +
        "! Your message has been received. We will contact you at " + email + "."
    );

    form.reset();
});
// Random Fact Generator - External API

const factButton = document.getElementById("factButton");
const factResult = document.getElementById("factResult");

factButton.addEventListener("click", function () {
    factButton.disabled = true;
    factButton.textContent = "Loading...";

    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load a fact");
            }

            return response.json();
        })
        .then(function (data) {
            factResult.textContent = data.text;
            factResult.style.display = "block";
        })
        .catch(function (error) {
            factResult.textContent =
                "Sorry, we could not load a fact. Please try again.";
            factResult.style.display = "block";
            console.error(error);
        })
        .finally(function () {
            factButton.disabled = false;
            factButton.textContent = "Show Me a Fact";
        });
});
