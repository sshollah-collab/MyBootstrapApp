
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

```javascript
// Movie Search - External API

const movieSearchForm = document.getElementById("movieSearchForm");
const movieTitle = document.getElementById("movieTitle");
const movieResults = document.getElementById("movieResults");

movieSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = movieTitle.value.trim();

    if (!searchTerm) {
        movieResults.textContent = "Please enter a movie title.";
        return;
    }

    movieResults.textContent = "Searching for movies...";

    const apiUrl =
        "https://freetestapi.com/api/v1/movies?search=" +
        encodeURIComponent(searchTerm);

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Movie search failed");
            }

            return response.json();
        })
        .then(function (movies) {
            movieResults.replaceChildren();

            if (!Array.isArray(movies) || movies.length === 0) {
                movieResults.textContent = "No movies found. Try another title.";
                return;
            }

            movies.forEach(function (movie) {
                const movieCard = document.createElement("div");
                movieCard.className = "border rounded p-3 mb-3";

                const title = document.createElement("h3");
                title.className = "h5";
                title.textContent = movie.title || "Untitled movie";

                const year = document.createElement("p");
                year.textContent = "Year: " + (movie.year || "Unknown");

                const genre = document.createElement("p");
                genre.textContent = "Genre: " + (movie.genre || "Unknown");

                movieCard.append(title, year, genre);
                movieResults.appendChild(movieCard);
            });
        })
        .catch(function (error) {
            movieResults.textContent =
                "Sorry, movie search is unavailable. Please try again.";
            console.error(error);
        });
});
```
