const input = document.getElementById("movie");
const submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    const movieName = input.value;
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=b700f532`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // ❌ Movie not found
            if (data.Response === "False") {
                alert(data.Error);
                return;
            }

            const container = document.querySelector(".container");
            container.innerHTML = ""; // clear previous results

            // ✅ helper function
            function addField(label, value) {
                if (value && value !== "N/A") {
                    const p = document.createElement("p");
                    p.textContent = `${label}: ${value}`;
                    container.appendChild(p);
                }
            }

            addField("Title", data.Title);
            addField("Year", data.Year);
            addField("Duration", data.Runtime);
            addField("Genre", data.Genre);
            addField("Director", data.Director);
            addField("Actors", data.Actors);
            addField("Plot", data.Plot);
            addField("Rating", data.imdbRating);

            // ✅ Poster separately
            if (data.Poster && data.Poster !== "N/A") {
                const img = document.createElement("img");
                img.src = data.Poster;
                img.style.width = "200px";
                container.appendChild(img);
            }

            input.value = "";
        })
        .catch(error => alert(error.message));
});