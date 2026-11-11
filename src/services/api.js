console.log("API JS KHEDAM");
// https://pokeapi.co/api/v2/pokemon/pikachu
//  https://pokeapi.co/api/v2/pokemon?limit=20&offset=0

const BASE_URL = "https://pokeapi.co/api/v2/";

function toCreature(pokemon) {

    const hp = pokemon.stats.find(function (item) {
        return item.stat.name === "hp";
    });

    const attack = pokemon.stats.find(function (item) {
        return item.stat.name === "attack";
    });

    const defence = pokemon.stats.find(function (item) {
        return item.stat.name === "defense";
    });

    return {
        id: `#${String(pokemon.id).padStart(3, "0")}`,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        stats: { hp: hp.base_stat, attack: attack.base_stat, defence: defence.base_stat }

    }
}






export async function getPokemons(offset = 0) {
    const response = await fetch(`${BASE_URL}pokemon?limit=20&offset=${offset}`)
    if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
    }

    const data = await response.json();
    
    const requests = data.results.map(function (pokemon) {
        return fetch(pokemon.url);
    })
    const responses = await Promise.all(requests);

    const detailsRequests = responses.map(function (response) {
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        return response.json();
    });

    const details = await Promise.all(detailsRequests);

    const creatures = details.map(function (pokemon) {
        return toCreature(pokemon);
    });

    return creatures;
}


