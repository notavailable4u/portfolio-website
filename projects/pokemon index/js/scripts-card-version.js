let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    // This function creates li & button with class and model attributes
    function addListItem(pokemon) {
        let container = document.querySelector("#special")
        let col = document.createElement("div");
        col.classList.add("col", "mx-2")
        container.appendChild(col);
        let card = document.createElement("div");
        card.classList.add("card", "text-center", "mb-4");
        card.style.width = "300px";
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-success");
        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = pokemon.name.toUpperCase();
        let button = document.createElement("button");
        button.innerText = "View Details Modal"
        button.classList.add("btn", "btn-dark");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#modalPokemon");
        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(button);
        button.addEventListener("click", () => {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    async function loadDetails(item) {
        let url = item.detailsUrl;
        try {
            const response = await fetch(url);
            const details = await response.json();
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
        } catch (e) {
            console.error(e);
        }
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");

        modalTitle.innerHTML = ""; // Clearing existing content
        modalBody.innerHTML = ""; // Clearing existing content

        let nameElement = document.createElement("h1");
        nameElement.textContent = pokemon.name.toUpperCase();

        let imageElementFront = document.createElement("img");
        imageElementFront.classList.add("img-fluid");
        imageElementFront.src = pokemon.imageUrlFront;
        imageElementFront.alt = `image of ${pokemon.name} front view`;

        let imageElementBack = document.createElement("img");
        imageElementBack.classList.add("img-fluid");
        imageElementBack.src = pokemon.imageUrlBack;
        imageElementBack.alt = `image of ${pokemon.name} back view`;

        let heightElement = document.createElement("p");
        heightElement.classList.add("font-weight-bold")
        heightElement.textContent = `Height: ${pokemon.height}`;

        let weightElement = document.createElement("p");
        weightElement.classList.add("font-weight-bold");
        weightElement.textContent = `Weight: ${pokemon.weight}`;

        modalTitle.appendChild(nameElement);
        modalBody.appendChild(imageElementFront);
        modalBody.appendChild(imageElementBack);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
