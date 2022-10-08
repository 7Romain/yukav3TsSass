const afficherIngredients = function (prod: Produit): void {
    const ingredients = document.getElementById(
        "listeIngredients"
    ) as HTMLElement;
    ingredients.innerHTML = prod.getIngredient();
};
