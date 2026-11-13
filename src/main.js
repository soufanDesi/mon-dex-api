import { afficherPokemon, afficherTypes, activerType, afficherErreurRecherche, afficherDetail } from "./ui.js"
import { getPokemons, getPokemonByName, getPokemonDescription } from "./services/api.js"

let offset = 0;
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
    const creatures = await getPokemons(offset);
    nouveaux.push(...creatures);
    offset += 20
    // console.log("api ",creatures)
    filtrerPokemon();

    getTypes();

    loadmore.disabled = false;
}
star();

loadmore.addEventListener("click", function () {
    star();
})



const filters = document.querySelector("#filters");
let typeActif = "All";

function filtrerPokemon() {
    const resultat = nouveaux.filter(function (pokemon) {
        return typeActif === "All" || pokemon.type === typeActif;
    })
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
        const pokemon = await getPokemonByName(name);
        afficherPokemon([pokemon]);
    } catch (error) {
        afficherErreurRecherche();
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
grid.addEventListener("click", async function (event) {
    const card = event.target.closest("article")

    if (!card) return;

    const id = card.dataset.id
    const pokemonId = Number(id.replace("#", ""));

    const pokemon = await getPokemonByName(pokemonId);
    pokemon.description = await getPokemonDescription(pokemonId);
    afficherDetail(pokemon);
})

const detail = document.querySelector("#detail");
const closeDetail = document.querySelector("#close-detail");

closeDetail.addEventListener("click", function () {
    detail.classList.add("hidden");
    detail.classList.remove("flex");
});