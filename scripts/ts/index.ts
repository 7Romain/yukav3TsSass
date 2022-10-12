const section: HTMLElement = document.querySelector(".section") as HTMLElement;
const code: HTMLElement = document.getElementById(
    "rechercher"
) as HTMLInputElement;
const formulaire: HTMLFormElement = document.querySelector(
    ".formulaire__demande"
) as HTMLFormElement;
const regex: RegExp = /[0-9]{8,13}/;
genererAccordeon();
const listeFields: string[] = [
    "&fields=",
    "product_name_fr",
    "product_name_en",
    "brands_imported",
    "brands",
    "quantity",
    "packaging_text_fr",
    "categories_old",
    "preparation_fr",
    "traces_imported",
    "stores",
    "conservation_conditions_fr",
    "ingredients_text_with_allergens_fr",
    "Ingredients_text_en",
    "image_small_url",
    "nutriscore_grade",
    "ecoscore_grade",
    "nova_group",
    "nutrition_data_prepared_per",
    "fat_100g",
    "energy-kj",
    "saturated-fat_100g",
    "carbohydrates_100g",
    "sugars_100g",
    "fiber_modifier",
    "fiber_100g",
    "proteins_100g",
    "salt_100g",
    "alcohol",
    "fruits-vegetables-nuts-estimate-from-ingredients_100g",
];

type Requetes = {
    code: string;
    product?: {
        product_name_fr?: string;
        product_name_en?: string;
        brands_imported?: string;
        brands?: string;
        quantity?: string;
        packaging_text_fr: string;
        categories_old?: string;
        preparation_fr?: string;
        traces_imported?: string;
        stores?: string;
        conservation_conditions_fr?: string;
        ingredients_text_with_allergens_fr?: string;
        Ingredients_text_en?: string;
        image_small_url?: string;
        nutriscore_grade?: string;
        ecoscore_grade?: string;
        nova_group?: number;
        nutrition_data_prepared_per?: string;
        fat_100g?: number;
        "energy-kj"?: string;
        "saturated-fat_100g"?: number;
        carbohydrates_100g?: number;
        sugars_100g?: number;
        fiber_modifier?: string;
        fiber_100g?: string;
        proteins_100g?: number;
        salt_100g?: number;
        alcohol?: string;
        "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number;
        nutriments?: { [key: string]: string | number };
    };
    status: number;
    status_verbose: string;
};
/**
 *
 *
 *
 * @param {number} codeBarre
 */
const lancement = function (codeBarre: number) {
    fetch("https://fr.openfoodfacts.org/api/v2/product/" + codeBarre)
        .then((response) => response.json())
        .then(function (data: Requetes) {
            console.log("coucou");
            section.classList.remove("sectionVisible");
            section.classList.add("cacher");
            console.log(data);
            if (data.status === 1) {
                console.log(listeFields.toString());
                console.table(data);
                console.log(data);
                const prod: Produit = new Produit(data);
                prod.afficherTableau(prod.getNutriments());
                afficherCaracteristiques(prod);
                afficherImages(prod);
                afficherIngredients(prod);
                section.classList.add("sectionVisible");
                section.classList.remove("cacher");
            } else {
                section.classList.remove("sectionVisible");
                section.classList.add("cacher");
                window.alert(
                    "Le produit n'est pas présent dans la base de données"
                );
                console.log("pas trouvé");
            }
        })
        .catch(function (err) {
            alert("Le produit n'est pas présent dans la base de données");
            console.log(err.message);
            alert("Le produit n'est pas présent dans la base de données");
        });
};

/**Fonction pour replier tt les accordéons
 *
 */
function repli() {
    const paneAccordeon = document.getElementsByClassName("panel");
    const tablePaneAccordeon = Array.from(paneAccordeon);

    for (const element of tablePaneAccordeon) {
        const panel = element as HTMLElement;
        panel.style.display = "none";
    }
}

/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la création de l'objet produit et
 * rend visible la fiche produit.
 */

formulaire?.addEventListener("submit", function (e) {
    const codeBarre: number = Number((code as HTMLInputElement).value);
    repli();

    if (regex.test(codeBarre.toString())) {
        e.preventDefault();
        lancement(codeBarre);
    } else {
        alert("veuillez entrer un code barre valide");
    }
});
