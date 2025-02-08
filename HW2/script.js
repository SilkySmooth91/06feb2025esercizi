const spotifyEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const input = document.getElementById("searchField")
const inputValue = input.value


function search(query) {
    return fetch(spotifyEndpoint + query)
    .then(response => response.json())
    .then(songs => {
        renderSongs(songs)
        return songs
    })
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
        card.classList.add("card", "mb-3", "bg-transparent", "border-0")

        const img = document.createElement("img")
        img.src = song.album.cover_medium
        img.classList.add("card-img-top")

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body", "px-0")

        const cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title", "fw-bold")
        cardTitle.innerText = song.title

        const artist = document.createElement("p")
        artist.classList.add("card-text", "fw-light", "fs-small")
        artist.innerText = song.artist.name

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(artist)

        card.appendChild(img)
        card.appendChild(cardBody)

        showCards.appendChild(card)
    });
}

function albumList(query) {
    const modalBody = document.querySelector(".modal-body")
    modalBody.innerHTML=""

    fetch(spotifyEndpoint + query)
    .then(response => response.json())
    .then(songs => {
        let addedAlbums = []

        songs.data.forEach(song => {
            const albumTitle = song.album.title

            if (!addedAlbums.includes(albumTitle)) {
                addedAlbums.push(albumTitle)
                const albumP = document.createElement("p")
                albumP.innerText = song.album.title + " - " + song.artist.name
                albumP.classList.add("text-white")
    
                modalBody.appendChild(albumP)
            }
        } )
    })
    .catch(err => console.log(err))
}

document.getElementById("button-search").addEventListener("click", () => {
    const input = document.getElementById("searchField")
    const inputValue = input.value
    search(inputValue)
})

document.getElementById("list-button").addEventListener("click", () => {
    const query = document.getElementById("searchField").value
    albumList(query)
})
