var genererAccordeon = function () {
    var accordeon = document.getElementsByClassName("accordion");
    var _loop_1 = function (element) {
        element.addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
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
    for (var _i = 0, accordeon_1 = accordeon; _i < accordeon_1.length; _i++) {
        var element = accordeon_1[_i];
        _loop_1(element);
    }
};
genererAccordeon();
var Produit = /** @class */ (function () {
    function Produit(codeBarre) {
        this.nom = "";
        this.marque = "";
        this.quantite = 0;
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
         * Test pour éviter d'afficher undefind.
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
        this.afficherTableau = function (nutriments) {
            var _a, _b, _c, _d;
            var tableNut = document.getElementById("tableNutri");
            tableNut.innerHTML = "";
            var tableauNutri = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            tableauNutri.classList.add("table-style");
            tableauNutri.appendChild(thead);
            tableauNutri.appendChild(tbody);
            tableNut.appendChild(tableauNutri);
            var row1 = document.createElement("tr");
            var heading1 = document.createElement("th");
            heading1.innerHTML = " ";
            var heading2 = document.createElement("th");
            if (nutriments.get(" ")) {
                heading2.innerHTML = (_b = (_a = nutriments.get(" ")) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : " ";
                row1.appendChild(heading1);
                row1.appendChild(heading2);
                thead.appendChild(row1);
                // let compteur: number =0;
                for (var element in nutriments) {
                    // let nomRow: string = "row" + numberEnumValues.toString();
                    // let nomRowData1:string = nomRow + "Data1";
                    var row2 = document.createElement("tr");
                    var row2Data1 = document.createElement("td");
                    row2Data1.innerHTML = element;
                    var row2Data2 = document.createElement("td");
                    row2Data2.innerHTML =
                        (_d = (_c = nutriments.get("Energie")) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "Energie";
                    row2.appendChild(row2Data1);
                    row2.appendChild(row2Data2);
                    tbody.appendChild(row2);
                }
            }
        };
        var resultat;
        var nomTaxi;
        fetch("http://fr.openfoodfacts.org/api/v2/product/" + codeBarre)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            resultat = data;
            if (!resultat.product._id) {
                alert("Le produit n'est pas présent dans la base de données");
            }
            else {
                console.log("ok");
            }
            console.table(resultat.product);
            console.log(resultat.product.categories);
            console.log(resultat.product.product_name_fr);
            console.log(resultat.product._id);
            nomTaxi = resultat.product.product_name_fr;
        })["catch"](function (err) {
            alert("Le produit n'est pas présent dans la base de données");
            console.log(err.message);
        });
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
            this.conservations = resultat.product.conservation_conditions_fr;
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
            this.imageNutri =
                "/images/ecoscore-" + resultat.product.ecoscore_grade + ".svg";
        }
        if (resultat.product.nova_group) {
            this.imageNova =
                "/images/nova-group-" + resultat.product.nova_group + ".svg";
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
            this.nutriments.set("Sucres", this.testValeur(resultat.product.nutriments.sugars_100g) + " g");
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
            this.nutriments.set("Sel", this.testValeur(resultat.product.nutriments.salt_100g) + " g");
        }
        if (resultat.product.nutriments.alcohol) {
            this.nutriments.set("Alcool", this.testValeur(resultat.product.nutriments.alcohol) + " g");
        }
        if (resultat.product.nutriments["fruits-vegetables-nuts-estimate-from-ingredients_100g"]) {
            this.nutriments.set("Fruits‚ légumes‚ noix et huiles de colza‚ noix et olive (estimation par analyse de la liste des ingrédients)", this.testValeur(resultat.product.nutriments["fruits-vegetables-nuts-estimate-from-ingredients_100g"]) + " g");
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
    Produit.prototype.getCodeBarre = function () {
        return this.codeBarre;
    };
    Produit.prototype.getNutriments = function () {
        return this.nutriments;
    };
    Produit.prototype.setNom = function (Nom) {
        this.nom = Nom;
    };
    Produit.prototype.setMarque = function (Marque) {
        this.marque = Marque;
    };
    Produit.prototype.setQuantite = function (Quantite) {
        this.quantite = Quantite;
    };
    Produit.prototype.setConditionnement = function (Conditionnement) {
        this.conditionnement = Conditionnement;
    };
    Produit.prototype.setCategories = function (Categories) {
        this.categories = Categories;
    };
    Produit.prototype.setPreparation = function (Preparation) {
        this.preparation = Preparation;
    };
    Produit.prototype.setTraces = function (Traces) {
        this.traces = Traces;
    };
    Produit.prototype.setMagasins = function (Magasins) {
        this.magasins = Magasins;
    };
    Produit.prototype.setConservations = function (Conservations) {
        this.conservations = Conservations;
    };
    Produit.prototype.setIngredient = function (Ingredient) {
        this.ingredients = Ingredient;
    };
    Produit.prototype.setImageProduit = function (imageProduit) {
        this.imageProduit = imageProduit;
    };
    Produit.prototype.setImageNova = function (imageNova) {
        this.imageNova = imageNova;
    };
    Produit.prototype.setImageEco = function (imageEco) {
        this.imageEco = imageEco;
    };
    Produit.prototype.setImageNutri = function (imageNutri) {
        this.imageNutri = imageNutri;
    };
    Produit.prototype.setCodeBarre = function (codeBarre) {
        this.codeBarre = codeBarre;
    };
    Produit.prototype.setNutriments = function (nutriments) {
        this.nutriments = nutriments;
    };
    return Produit;
}());
var section = document.querySelector(".section");
var code = document.getElementById("rechercher");
var formulaire = document.querySelector(".formulaire__demande");
var regex = /[0-9]{8,13}/;
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
var afficherImages = function (prod) {
    var imgProduct = document.getElementById("imgProduct");
    imgProduct.setAttribute("src", prod.getImageProduit.toString());
    var imgNutri = document.getElementById("imgNutri");
    imgNutri.setAttribute("src", prod.getImageNutri.toString());
    var imgNova = document.getElementById("imgNova");
    imgNova.setAttribute("src", prod.getImageNova.toString());
    var imgEcoscore = document.getElementById("imgEcoscore");
    imgEcoscore.setAttribute("src", prod.getImageEco.toString());
};
var afficherIngredients = function (prod) {
    var ingredients = document.getElementById("listeIngredients");
    ingredients.innerHTML = prod.getIngredient();
};
var afficher = function (prod) {
    afficherCaracteristiques(prod);
    afficherImages(prod);
    afficherIngredients(prod);
};
/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la création de l'objet produit  et
 * rend visible la fiche produit.
 */
formulaire === null || formulaire === void 0 ? void 0 : formulaire.addEventListener("submit", function (e) {
    var codeBarre = Number(code.value);
    if (regex.test(codeBarre.toString())) {
        e.preventDefault();
        var prod = new Produit(codeBarre);
        prod.afficherTableau(prod.getNutriments);
        afficher(prod);
        section.classList.add("sectionVisible");
    }
    else {
        alert("veuillez entrer un code barre valide");
    }
});
