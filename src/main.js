import { afficherPokemon, afficherTypes, activerType, afficherErreurRecherche, afficherDetail, afficherChargement, afficherChargementDetail, afficherErreurDetail, afficherErreurListe, afficherErreurConnexion } from "./ui.js"
import { getPokemons, getPokemonByName, getPokemonDescription } from "./services/api.js"
import { getFavoris, toggleFavori } from "./storage.js";

let offset = 0;
let dernierPokemonId = null;
const nouveaux = [];
const loadmore = document.querySelector("#load-more");

function getTypes() {
    const types = nouveaux.map(function (pokemon) {
        return pokemon.type
    })

    const sansDoublons = new Set(types);
    const typesUniques = [...sansDoublons];

    // console.log(typesUniques);
    afficherTypes(typesUniques);
    activerType(typeActif);
}

async function star() {
    loadmore.disabled = true;
    if (nouveaux.length === 0) {
        afficherChargement();
    }

    try {
        const creatures = await getPokemons(offset);

        nouveaux.push(...creatures);
        offset += creatures.length;

        filtrerPokemon();
        getTypes();

    } catch (error) {
        afficherErreurListe();

    } finally {
        loadmore.disabled = false;
    }
}
star();

loadmore.addEventListener("click", function () {
    star();
})



const filters = document.querySelector("#filters");
let typeActif = "All";

function filtrerPokemon() {
    const favoris = getFavoris();

    const resultat = nouveaux.filter(function (pokemon) {
        if (typeActif === "Favoris") {
            return favoris.includes(pokemon.id);
        }

        return typeActif === "All" || pokemon.type === typeActif;
    });

    afficherPokemon(resultat);
}


filters.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

    typeActif = event.target.textContent;

    filtrerPokemon();
    activerType(typeActif);
})

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const clearSearch = document.querySelector("#clear-search");


searchBtn.addEventListener("click", async function () {

    const name = searchInput.value.trim();

    if (name === "") return;

    searchBtn.disabled = true;
    try {
        afficherChargement();
        const pokemon = await getPokemonByName(name);
        afficherPokemon([pokemon]);
    } catch (error) {
        if (error.status === 404) {
            afficherErreurRecherche();
        } else {
            afficherErreurConnexion();
        }
    } finally {
        searchBtn.disabled = false;
    }

})


clearSearch.addEventListener("click", function () {
    searchInput.value = "";

    filtrerPokemon();
})

const grid = document.querySelector("#grid");

// detail
// grid.addEventListener("click", async function (event) {
//     const card = event.target.closest("article")

//     if (!card) return;

//     const id = card.dataset.id
//     const pokemonId = Number(id.replace("#", ""));

//     afficherChargementDetail();

//     try {
//         const pokemon = await getPokemonByName(pokemonId);
//         pokemon.description = await getPokemonDescription(pokemonId);
//         afficherDetail(pokemon);
//     } catch (error) {
//         afficherErreurDetail();
//     }

// })

async function chargerDetail(pokemonId) {
    dernierPokemonId = pokemonId;
    afficherChargementDetail();

    try {
        const pokemon = await getPokemonByName(pokemonId);
        pokemon.description = await getPokemonDescription(pokemonId);
        afficherDetail(pokemon);
    } catch (error) {
        afficherErreurDetail();
    }
}

const retryDetail = document.querySelector("#retry-detail");

retryDetail.addEventListener("click", function () {
    if (dernierPokemonId === null) return;

    chargerDetail(dernierPokemonId);
});

grid.addEventListener("click", function (event) {

    if (event.target.classList.contains("favori-btn")) {
        const card = event.target.closest("article");

        if (!card) return;

        toggleFavori(card.dataset.id);
        
        if (typeActif === "Favoris") {
            filtrerPokemon();
            return;
        }
        event.target.textContent =
            event.target.textContent.includes("☆") ? "★ Favoris" : "☆ Favoris";

        return;
    }
    const card = event.target.closest("article");


    if (!card) return;

    const id = card.dataset.id;
    const pokemonId = Number(id.replace("#", ""));

    chargerDetail(pokemonId);
});

const detail = document.querySelector("#detail");
const closeDetail = document.querySelector("#close-detail");

closeDetail.addEventListener("click", function () {
    detail.classList.add("hidden");
    detail.classList.remove("flex");
});

grid.addEventListener("click", function (event) {
    if (event.target.id === "retry-list") {
        star();
    }
    if (event.target.id === "retry-search") {
        searchBtn.click();
    }
});