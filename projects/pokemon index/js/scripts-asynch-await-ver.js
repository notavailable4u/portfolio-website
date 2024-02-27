let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }


  function getAll() {
    return pokemonList;
  }


  //fetch json data from API and create pokemon object
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  //assign  API data to variables in pokemon object
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

  // get individual details for model
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // create li & button elements with class and model attributes
  function addListItem(pokemon) {
    let unorderedList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add("btn", "btn-success", "btn-lg", "btn-block", "text-dark", "font-weight-bold");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modalPokemon");
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // create and append elements for individual modal
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
