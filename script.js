
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


// TV Show Search - TVmaze API

const movieSearchForm = document.getElementById("movieSearchForm");
const movieTitle = document.getElementById("movieTitle");
const movieResults = document.getElementById("movieResults");

movieSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = movieTitle.value.trim();

    if (!searchTerm) {
        movieResults.textContent = "Please enter a TV show title.";
        return;
    }

    movieResults.textContent = "Searching for TV shows...";

    const apiUrl =
        "https://api.tvmaze.com/search/shows?q=" +
        encodeURIComponent(searchTerm);

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("TV show search failed");
            }

            return response.json();
        })
        .then(function (results) {
            movieResults.replaceChildren();

            if (!Array.isArray(results) || results.length === 0) {
                movieResults.textContent =
                    "No TV shows found. Try another title.";
                return;
            }

            results.forEach(function (item) {
                const show = item.show;
                const card = document.createElement("div");
                card.className = "border rounded p-3 mb-3";

                const title = document.createElement("h3");
                title.className = "h5";
                title.textContent = show.name;

                const details = document.createElement("p");
                details.textContent =
                    "Language: " + (show.language || "Unknown") +
                    " | Status: " + (show.status || "Unknown");

                card.append(title, details);

                if (show.image && show.image.medium) {
                    const image = document.createElement("img");
                    image.src = show.image.medium;
                    image.alt = "Poster for " + show.name;
                    image.className = "img-fluid mb-2";
                    image.style.maxWidth = "150px";
                    card.prepend(image);
                }

                if (show.url) {
                    const link = document.createElement("a");
                    link.href = show.url;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = "View show details on TVmaze";
                    card.appendChild(link);
                }

                movieResults.appendChild(card);
            });
        })
        .catch(function (error) {
            movieResults.textContent =
                "Sorry, TV show search is unavailable. Please try again.";
            console.error(error);
        });
});
```
