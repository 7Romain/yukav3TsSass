import { Produit } from "./Produit";
import { genererAccordeon } from "./accordeon.js";
import { afficherImages } from "./images.js";
import { afficherCaracteristiques } from "./caracteristiques.js";
import { afficherIngredients } from "./ingredients.js";

genererAccordeon();

const lancement = function (codeBarre: number) {
    fetch("https://fr.openfoodfacts.org/api/v2/product/" + codeBarre)
        .then((response) => response.json())
        .then(function (data: any) {
            const prod: Produit = new Produit(data);

            prod.afficherTableau(prod.getNutriments());
            afficherCaracteristiques(prod);
            afficherImages(prod);
            afficherIngredients(prod);
        });
};

const section: HTMLElement = document.querySelector(".section") as HTMLElement;
const code: HTMLElement = document.getElementById(
    "rechercher"
) as HTMLInputElement;
const formulaire: HTMLFormElement = document.querySelector(
    ".formulaire__demande"
) as HTMLFormElement;
const regex: RegExp = /[0-9]{8,13}/;

/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la création de l'objet produit  et
 * rend visible la fiche produit.
 */

formulaire?.addEventListener("submit", function (e) {
    const codeBarre: number = Number((code as HTMLInputElement).value);
    if (regex.test(codeBarre.toString())) {
        e.preventDefault();
        lancement(codeBarre);

        section.classList.add("sectionVisible");
    } else {
        alert("veuillez entrer un code barre valide");
    }
});
