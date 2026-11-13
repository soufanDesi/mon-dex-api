

import { getFavoris, } from "./storage.js";
const grid = document.querySelector("#grid")
// const filters = document.querySelector("#filters");
// let typeActif = "All";


export function afficherPokemon(liste) {
    grid.innerHTML = "";
    const creatureCount = document.querySelector("#creature-count");
    creatureCount.textContent = liste.length;
    liste.forEach(function (pokemon) {
        const card = document.createElement("article");
        card.dataset.id = pokemon.id;
        card.className = "flex flex-col gap-3 rounded-xl bg-white p-3 pb-4 hover:-translate-y-1 transition-transform duration-500";
        const total = pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defence;
        const favoris = getFavoris();
        const estFavori = favoris.includes(pokemon.id);

        card.innerHTML = `
            <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                <img src="${pokemon.image}" alt="${pokemon.name}" class="h-32 w-32">
                <span class="absolute left-3 top-2 font-mono text-sm text-muted">${pokemon.id}</span>
            </div>

            <div class="flex items-center justify-between gap-2">
                <h2 class="font-display text-xl font-semibold">${pokemon.name}</h2>
                <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">${pokemon.type}</span>
            </div>

            <p class="text-sm text-muted">Total ${total}</p>

            <button type="button" class="favori-btn btn-outline"> ${estFavori ? "★ Favoris" : "☆ Favoris"} </button>`;

        grid.appendChild(card);
    }
    );
}

export function afficherErreurRecherche() {
    grid.innerHTML = "";
    const message = document.createElement("p");
    message.textContent = "Aucun Pokémon trouvé";
    grid.appendChild(message);
}

export function afficherDetail(pokemon) {

    const detail = document.querySelector("#detail");

    detail.classList.remove("hidden");
    detail.classList.add("flex");

    // id
    const detailNumber = document.querySelector("#detail-number");
    detailNumber.textContent = `${pokemon.id} · Détail`;

    // name
    const detailName = document.querySelector("#detail-name");
    detailName.textContent = pokemon.name;

    // image
    const detailImage = document.querySelector("#detail-image");
    detailImage.src = pokemon.image;
    detailImage.alt = pokemon.name;
    detailImage.classList.remove("invisible");

    // description
    const detaildesc = document.querySelector("#detail-description");
    detaildesc.textContent = pokemon.description

    // type
    const detailType = document.querySelector("#detail-type");
    detailType.textContent = pokemon.type;

    const detailHp = document.querySelector("#detail-hp");
    detailHp.textContent = pokemon.stats.hp;
    const hpBar = document.querySelector("#detail-hp-bar");
    hpBar.style.width = pokemon.stats.hp + "%";

    const detailAttq = document.querySelector("#detail-attack");
    detailAttq.textContent = pokemon.stats.attack;
    const attackBar = document.querySelector("#detail-attack-bar");
    attackBar.style.width = pokemon.stats.attack + "%";

    const detaildefence = document.querySelector("#detail-defence");
    detaildefence.textContent = pokemon.stats.defence;
    const defenceBar = document.querySelector("#detail-defence-bar");
    defenceBar.style.width = pokemon.stats.defence + "%";

}




export function afficherTypes(type) {
    const filters = document.querySelector("#filters");
    filters.innerHTML = "";

    const buttonAll = document.createElement("button");

    buttonAll.type = "button";
    buttonAll.className = "chip";
    buttonAll.textContent = "All";

    filters.appendChild(buttonAll);
    const buttonFavoris = document.createElement("button");
    buttonFavoris.type = "button";
    buttonFavoris.className = "chip";
    buttonFavoris.textContent = "Favoris";

    filters.appendChild(buttonFavoris);

    type.forEach(function (type) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.textContent = type;

        filters.appendChild(button);
    })

}

export function activerType(typeActif) {

    const buttons = document.querySelectorAll("#filters button");

    buttons.forEach(function (button) {
        button.classList.remove("bg-ink", "text-white", "border-ink");

        if (button.textContent === typeActif) {
            button.classList.add("bg-ink", "text-white", "border-ink");
        }
    })

}


export function afficherChargement() {
    grid.innerHTML = "";
    const message = document.createElement("p");

    message.innerHTML = `Chargement <span class="dot">.</span> <span class="dot">.</span> <span class="dot">.</span> `;
    message.className = "font-semibold text-ink";

    grid.appendChild(message);
}


export function afficherChargementDetail() {
    const retryBtn = document.querySelector("#retry-detail");
    retryBtn.classList.add("hidden");

    const detail = document.querySelector("#detail");

    detail.classList.remove("hidden");
    detail.classList.add("flex");

    const name = document.querySelector("#detail-name");
    name.textContent = "Chargement...";

    const description = document.querySelector("#detail-description");
    description.textContent = "Chargement...";

    const image = document.querySelector("#detail-image");
    image.classList.add("invisible");

    const type = document.querySelector("#detail-type");
    type.textContent = "...";
}


export function afficherErreurDetail() {
    const retryBtn = document.querySelector("#retry-detail");
    retryBtn.classList.remove("hidden");
    const name = document.querySelector("#detail-name");
    name.textContent = "Erreur de chargement";

    const description = document.querySelector("#detail-description");
    description.textContent = "Impossible de charger les détails.";

    const image = document.querySelector("#detail-image");
    image.classList.add("invisible");

    const type = document.querySelector("#detail-type");
    type.textContent = "...";
}

export function afficherErreurListe() {

    grid.innerHTML = `
<div>
            <p>Impossible de charger les Pokémon.</p>
            <button id="retry-list" class="btn-outline" type="button">
                Réessayer
            </button>
        </div>
    `;



}

export function afficherErreurConnexion() {
    grid.innerHTML = `
        <div>
            <p>Erreur de connexion.</p>
            <button id="retry-search" type="button" class="btn-outline">
                Réessayer
            </button>
        </div>
    `;
}