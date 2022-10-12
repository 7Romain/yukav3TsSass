function genererAccordeon() {
    var accordeon = document.getElementsByClassName("accordion");
    var accordeon2 = Array.from(accordeon);
    var _loop_1 = function (element) {
        element.addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that control the panel */
            element.classList.toggle("active");
            /* Toggle between hiding and showing the active panel */
            var panel = element.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    };
    for (var _i = 0, accordeon2_1 = accordeon2; _i < accordeon2_1.length; _i++) {
        var element = accordeon2_1[_i];
        _loop_1(element);
    }
}
/**
 * This class is used to store the data of the product
 */
var Produit = /** @class */ (function () {
    /**
     * It takes the result of the request to the OpenFoodFacts API and creates a new Product object with
     * the data from the request
     * @constructor
     * @memberof Produit
     * @param {Requetes} resultat - Requetes
     */
    function Produit(resultat) {
        this.nom = "";
        this.marque = "";
        this.quantite = "";
        this.conditionnement = "";
        this.categories = "";
        this.preparation = "";
        this.traces = "";
        this.magasins = "";
        this.conservations = "";
        this.ingredients = "";
        this.codeBarre = 0;
        this.imageProduit = "/images/pasImage.svg";
        this.imageNutri = "/images/nutriscore-unknown.svg";
        this.imageNova = "/images/nova-group-unknown.svg";
        this.imageEco = "/images/ecoscore-unknown.svg";
        this.nutriments = new Map();
        /**
         * Test pour éviter d'afficher undefind
         * @param {*} valeur
         * @return {*}
         */
        this.testValeur = function (valeur) {
            if (valeur !== undefined) {
                return valeur;
            }
            else {
                return "?";
            }
        };
        /**
         * Test pour éviter d'afficher undefind.
         * @param {*} valeur
         * @return {*}
         */
        this.testModificateur = function (valeur) {
            if (valeur === ">") {
                return ">";
            }
            else if (valeur === "<") {
                return "<";
            }
            else {
                return "";
            }
        };
        /**
         *
         *
         * @memberof Produit
         * de l'eau qui mouille
         */
        this.afficherTableau = function (result) {
            var accordeonNutri = document.querySelector("#tableau-nutritionnel > button:nth-child(1)");
            var accordeonNutriPane = document.querySelector("#tableau-nutritionnel > div:nth-child(2)");
            var tableNut = document.getElementById("tableNutri");
            accordeonNutri.classList.add("cacher");
            tableNut.classList.add("cacher");
            accordeonNutriPane.classList.add("cacher");
            accordeonNutriPane.removeAttribute("style");
            tableNut.innerHTML = "";
            var tableauNutri = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            tableauNutri.classList.add("table-style");
            tableauNutri.appendChild(thead);
            tableauNutri.appendChild(tbody);
            tableNut.appendChild(tableauNutri);
            result.forEach(function (value, key) {
                var row1 = document.createElement("tr");
                var heading1;
                if (heading1 === undefined) {
                    heading1 = document.createElement("th");
                }
                else {
                    heading1 = document.createElement("td");
                }
                heading1.innerHTML = key;
                var heading2;
                if (heading2 === undefined) {
                    heading2 = document.createElement("th");
                }
                else {
                    heading2 = document.createElement("td");
                }
                heading2.innerHTML = value.toString();
                row1.appendChild(heading1);
                row1.appendChild(heading2);
                if (thead.firstChild === null) {
                    thead.appendChild(row1);
                }
                else {
                    tbody.appendChild(row1);
                }
            });
            if (result.size > 1) {
                accordeonNutri.classList.remove("cacher");
                tableNut.classList.remove("cacher");
                accordeonNutriPane.classList.remove("cacher");
            }
        };
        if (resultat.status === 1) {
            if (resultat.product.product_name_fr) {
                this.nom = resultat.product.product_name_fr;
            }
            else if (resultat.product.product_name_en) {
                this.nom = resultat.product.product_name_en;
            }
            else {
                this.nom = "inconnu";
            }
            if (resultat.product.brands_imported) {
                this.marque = resultat.product.brands_imported;
            }
            else if (resultat.product.brands) {
                this.marque = resultat.product.brands;
            }
            else {
                this.marque = "inconnu";
            }
            if (resultat.product.quantity) {
                this.quantite = resultat.product.quantity;
            }
            if (resultat.product.packaging_text_fr) {
                this.conditionnement = resultat.product.packaging_text_fr;
            }
            if (resultat.product.categories_old) {
                this.categories = resultat.product.categories_old;
            }
            if (resultat.product.preparation_fr) {
                this.preparation = resultat.product.preparation_fr;
            }
            if (resultat.product.traces_imported) {
                this.traces = resultat.product.traces_imported;
            }
            if (resultat.product.stores) {
                this.magasins = resultat.product.stores;
            }
            if (resultat.product.conservation_conditions_fr) {
                this.conservations =
                    resultat.product.conservation_conditions_fr;
            }
            if (resultat.product.ingredients_text_with_allergens_fr) {
                this.ingredients =
                    resultat.product.ingredients_text_with_allergens_fr;
            }
            else if (resultat.product.Ingredients_text_en) {
                this.ingredients = resultat.product.Ingredients_text_en;
            }
            else {
                this.ingredients = "Liste d'ingrédients indisponible";
            }
            if (resultat.product.image_small_url) {
                this.imageProduit = resultat.product.image_small_url;
            }
            if (resultat.product.nutriscore_grade) {
                this.imageNutri =
                    "/images/nutriscore-" +
                        resultat.product.nutriscore_grade +
                        ".svg";
            }
            if (resultat.product.ecoscore_grade) {
                this.imageEco =
                    "/images/ecoscore-" +
                        resultat.product.ecoscore_grade +
                        ".svg";
            }
            if (resultat.product.nova_group) {
                this.imageNova =
                    "/images/nova-group-" +
                        resultat.product.nova_group +
                        ".svg";
            }
            this.nutriments.set(" ", "pour" + resultat.product.nutrition_data_prepared_per);
            if (resultat.product.nutriments["energy-kj"]) {
                this.nutriments.set("Energie", this.testValeur(resultat.product.nutriments["energy-kj"]) +
                    " kj");
            }
            if (resultat.product.nutriments.fat_100g) {
                this.nutriments.set("Matières grasses", this.testValeur(resultat.product.nutriments.fat_100g) + " g");
            }
            if (resultat.product.nutriments["saturated-fat_100g"]) {
                this.nutriments.set("Acides gras saturés", this.testValeur(resultat.product.nutriments["saturated-fat_100g"]) + " g");
            }
            if (resultat.product.nutriments.carbohydrates_100g) {
                this.nutriments.set("Glucides", this.testValeur(resultat.product.nutriments.carbohydrates_100g) + " g");
            }
            if (resultat.product.nutriments.sugars_100g) {
                this.nutriments.set("Sucres", this.testValeur(resultat.product.nutriments.sugars_100g) +
                    " g");
            }
            if (resultat.product.nutriments.fiber_modifier) {
                this.nutriments.set("Fibres alimentaires", this.testModificateur(resultat.product.nutriments.fiber_modifier) +
                    " " +
                    this.testValeur(resultat.product.nutriments.fiber_100g) +
                    " g");
            }
            if (resultat.product.nutriments.proteins_100g) {
                this.nutriments.set("Protéines", this.testValeur(resultat.product.nutriments.proteins_100g) +
                    " g");
            }
            if (resultat.product.nutriments.salt_100g) {
                this.nutriments.set("Sel", this.testValeur(resultat.product.nutriments.salt_100g) +
                    " g");
            }
            if (resultat.product.nutriments.alcohol) {
                this.nutriments.set("Alcool", this.testValeur(resultat.product.nutriments.alcohol) + " g");
            }
            if (resultat.product.nutriments["fruits-vegetables-nuts-estimate-from-ingredients_100g"]) {
                this.nutriments.set("Fruits‚ légumes‚ noix et huiles de colza‚ noix et olive (estimation par analyse de la liste des ingrédients)", this.testValeur(resultat.product.nutriments["fruits-vegetables-nuts-estimate-from-ingredients_100g"]) + " g");
            }
        }
    }
    Produit.prototype.getNom = function () {
        return this.nom;
    };
    Produit.prototype.getMarque = function () {
        return this.marque;
    };
    Produit.prototype.getQuantite = function () {
        return this.quantite;
    };
    Produit.prototype.getConditionnement = function () {
        return this.conditionnement;
    };
    Produit.prototype.getCategories = function () {
        return this.categories;
    };
    Produit.prototype.getPreparation = function () {
        return this.preparation;
    };
    Produit.prototype.getTraces = function () {
        return this.traces;
    };
    Produit.prototype.getMagasins = function () {
        return this.magasins;
    };
    Produit.prototype.getConservations = function () {
        return this.conservations;
    };
    Produit.prototype.getIngredient = function () {
        return this.ingredients;
    };
    Produit.prototype.getImageNova = function () {
        return this.imageNova;
    };
    Produit.prototype.getImageEco = function () {
        return this.imageEco;
    };
    Produit.prototype.getImageNutri = function () {
        return this.imageNutri;
    };
    Produit.prototype.getImageProduit = function () {
        return this.imageProduit;
    };
    Produit.prototype.getNutriments = function () {
        return this.nutriments;
    };
    return Produit;
}());
var afficherImages = function (prod) {
    var imgProduct = document.getElementById("imgProduct");
    imgProduct.setAttribute("src", prod.getImageProduit());
    var imgNutri = document.getElementById("imgNutri");
    imgNutri.setAttribute("src", prod.getImageNutri());
    var imgNova = document.getElementById("imgNova");
    imgNova.setAttribute("src", prod.getImageNova());
    var imgEcoscore = document.getElementById("imgEcoscore");
    imgEcoscore.setAttribute("src", prod.getImageEco());
};
var afficherCaracteristiques = function (prod) {
    var caracteristiques = document.getElementById("carac");
    var texte = "";
    if (prod.getNom()) {
        texte +=
            "<span class= 'gras' >Nom : </span>" +
                prod.getNom() +
                "<br /><br />";
    }
    else {
        texte += "Nom inconnu" + "<br /><br />";
    }
    if (prod.getMarque()) {
        texte +=
            "<span class= 'gras' >Marque : </span>" +
                prod.getMarque() +
                "<br /><br />";
    }
    if (prod.getQuantite()) {
        texte +=
            "<span class= 'gras' >Quantité : </span>" +
                prod.getQuantite() +
                "<br /><br />";
    }
    if (prod.getConditionnement()) {
        texte +=
            "<span class= 'gras' >Conditionnement : </span>" +
                prod.getConditionnement() +
                "<br /><br />";
    }
    if (prod.getCategories()) {
        texte +=
            "<span class= 'gras' >Catégories : </span>" +
                prod.getCategories() +
                "<br /><br />";
    }
    if (prod.getPreparation()) {
        texte +=
            "<span class= 'gras' >Préparation : </span>" +
                prod.getPreparation() +
                "<br /><br />";
    }
    if (prod.getTraces()) {
        texte +=
            "<span class= 'gras' >Traces : </span>" +
                prod.getTraces() +
                "<br /><br />";
    }
    if (prod.getMagasins()) {
        texte +=
            "<span class= 'gras' >Magasins : </span>" +
                prod.getMagasins() +
                "<br /><br />";
    }
    if (prod.getConservations()) {
        texte +=
            "<span class= 'gras' >Conservation : </span>" +
                prod.getConservations() +
                "<br /><br />";
    }
    if (caracteristiques) {
        caracteristiques.innerHTML = texte;
    }
};
var afficherIngredients = function (prod) {
    var ingredients = document.getElementById("listeIngredients");
    ingredients.innerHTML = prod.getIngredient();
};
var section = document.querySelector(".section");
var code = document.getElementById("rechercher");
var formulaire = document.querySelector(".formulaire__demande");
var regex = /[0-9]{8,13}/;
genererAccordeon();
var listeFields = [
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
/**
 *
 *
 *
 * @param {number} codeBarre
 */
var lancement = function (codeBarre) {
    fetch("https://fr.openfoodfacts.org/api/v2/product/" + codeBarre)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log("coucou");
        section.classList.remove("sectionVisible");
        section.classList.add("cacher");
        console.log(data);
        if (data.status === 1) {
            console.log(listeFields.toString());
            console.table(data);
            console.log(data);
            var prod = new Produit(data);
            prod.afficherTableau(prod.getNutriments());
            afficherCaracteristiques(prod);
            afficherImages(prod);
            afficherIngredients(prod);
            section.classList.add("sectionVisible");
            section.classList.remove("cacher");
        }
        else {
            section.classList.remove("sectionVisible");
            section.classList.add("cacher");
            window.alert("Le produit n'est pas présent dans la base de données");
            console.log("pas trouvé");
        }
    })["catch"](function (err) {
        alert("Le produit n'est pas présent dans la base de données");
        console.log(err.message);
        alert("Le produit n'est pas présent dans la base de données");
    });
};
/**Fonction pour replier tt les accordéons
 *
 */
function repli() {
    var paneAccordeon = document.getElementsByClassName("panel");
    var tablePaneAccordeon = Array.from(paneAccordeon);
    for (var _i = 0, tablePaneAccordeon_1 = tablePaneAccordeon; _i < tablePaneAccordeon_1.length; _i++) {
        var element = tablePaneAccordeon_1[_i];
        var panel = element;
        panel.style.display = "none";
    }
}
/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la création de l'objet produit et
 * rend visible la fiche produit.
 */
formulaire === null || formulaire === void 0 ? void 0 : formulaire.addEventListener("submit", function (e) {
    var codeBarre = Number(code.value);
    repli();
    if (regex.test(codeBarre.toString())) {
        e.preventDefault();
        lancement(codeBarre);
    }
    else {
        alert("veuillez entrer un code barre valide");
    }
});
//# sourceMappingURL=index.js.map