const spotifyEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q="



function search(query) {
    return fetch(spotifyEndpoint + query)
    .then(response => response.json())
    .then(songs => renderSongs(songs))
    .catch(err => console.log(err))
}

function renderSongs(songs) {
    let results = document.getElementById("searchResults")
    results.style.display = "flex"
    results.classList.add("row")

    let showCards = document.getElementById("showCards")
    showCards.innerHTML = ""

    songs.data.forEach(song => {
        const card = document.createElement("div")
        card.classList.add("card", "mb-3", "bg-transparent", "col-2", "col-md-3", "border-0")

        const img = document.createElement("img")
        img.src = song.album.cover_medium
        img.classList.add("card-img-top")

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title")
        cardTitle.textContent = song.title

        const artist = document.createElement("p")
        artist.classList.add("card-text")
        artist.textContent = song.artist.name

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(artist)

        card.appendChild(img)
        card.appendChild(cardBody)

        showCards.appendChild(card)
    });
}

document.getElementById("button-search").addEventListener("click", () => {
    search("eminem")
})

