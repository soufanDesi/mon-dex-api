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

            <button type="button" class="btn-outline">Ajouter à l'équipe</button> `;

        grid.appendChild(card);
    }
    );
}


export function afficherTypes(type) {
    const filters = document.querySelector("#filters");
    filters.innerHTML = "";

    const buttonAll = document.createElement("button");

    buttonAll.type = "button";
    buttonAll.className = "chip";
    buttonAll.textContent = "All";

    filters.appendChild(buttonAll);

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

        if(button.textContent === typeActif){
             button.classList.add("bg-ink", "text-white", "border-ink");
        }
    })

}