import { afficherPokemon, afficherTypes, activerType} from "./ui.js"
import { getPokemons } from "./services/api.js"

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