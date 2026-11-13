# Mon Dex connecté

Application web permettant de découvrir des Pokémon à partir de la PokéAPI.

## Fonctionnalités

- Affichage des Pokémon récupérés depuis une API.
- Chargement de 20 Pokémon supplémentaires avec la pagination.
- Filtrage des Pokémon par type.
- Recherche d'un Pokémon par nom.
- Affichage des détails : image, description et statistiques.
- Gestion des états de chargement, des erreurs et des boutons de réessai.
- Ajout et suppression des Pokémon favoris.
- Sauvegarde des favoris avec LocalStorage.

## Technologies utilisées

- HTML
- Tailwind CSS
- JavaScript (ES Modules)
- Fetch API, async/await et Promise.all
- LocalStorage

## API utilisée

[PokéAPI](https://pokeapi.co/)

Principaux endpoints :

- `/pokemon?limit=20&offset=0` : liste des Pokémon.
- `/pokemon/{name}` : détails d'un Pokémon.
- `/pokemon-species/{id}` : description d'un Pokémon.

## Structure du projet

- `index.html` : structure de l'application.
- `src/main.js` : événements et logique principale.
- `src/ui.js` : affichage des éléments.
- `src/services/api.js` : requêtes vers la PokéAPI.
- `src/storage.js` : gestion des favoris avec LocalStorage.

## Installation

```bash
git clone https://github.com/soufanDesi/mon-dex-api.git
cd mon-dex-api
npm install
npm run dev
```

Ouvrir ensuite `index.html` avec un serveur local.

## Auteur

Soufiane

## Code source

https://github.com/soufanDesi/mon-dex-api