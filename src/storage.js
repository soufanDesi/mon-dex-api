export function getFavoris() {
    const favoris = localStorage.getItem("favoris");

    if (favoris === null) {
        return [];
    }

    return JSON.parse(favoris);
}

export function toggleFavori(id) {
    let favoris = getFavoris();

    if (favoris.includes(id)) {
        favoris = favoris.filter(function (item) {
            return item !== id;
        });
    } else {
        favoris.push(id);
    }

    localStorage.setItem("favoris", JSON.stringify(favoris));
}