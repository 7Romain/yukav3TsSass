const genererAccordeon = function () {
    const accordeon: any = document.getElementsByClassName("accordion");
    for (const element of accordeon) {
        element.addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
            element.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            const panel = element.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
};

genererAccordeon();

class Produit {
    private nom: string = "";
    private marque: string = "";
    private quantite: number = 0;
    private conditionnement: string = "";
    private categories: string = "";
    private preparation: string = "";
    private traces: string = "";
    private magasins: string = "";
    private conservations: string = "";
    private ingredients: string = "";
    private codeBarre: number = 0;
    private imageProduit: string = "/images/pasImage.svg";
    private imageNutri: string = "/images/nutriscore-unknown.svg";
    private imageNova: string = "/images/nova-group-unknown.svg";
    private imageEco: string = "/images/ecoscore-unknown.svg";
    private nutriments: Map<string, string | number> = new Map();

    /**
     * Test pour éviter d'afficher undefind.
     * @param {*} valeur
     * @return {*}
     */
    testValeur = function (valeur: string | number | undefined) {
        if (valeur !== undefined) {
            return valeur;
        } else {
            return "?";
        }
    };

    /**
     * Test pour éviter d'afficher undefind.
     * @param {*} valeur
     * @return {*}
     */
    testModificateur = function (valeur: string | number | undefined) {
        if (valeur === ">") {
            return ">";
        } else if (valeur === "<") {
            return "<";
        } else {
            return "";
        }
    };

    public constructor(codeBarre: number) {
        let resultat: any;
        let nomTaxi: string;

        fetch("http://fr.openfoodfacts.org/api/v2/product/" + codeBarre)
            .then((response) => response.json())
            .then(function (data) {
                resultat = data;
                if (!resultat.product._id) {
                    alert(
                        "Le produit n'est pas présent dans la base de données"
                    );
                } else {
                    console.log("ok");
                }
                console.table(resultat.product);
                console.log(resultat.product.categories);
                console.log(resultat.product.product_name_fr);
                console.log(resultat.product._id);
                nomTaxi = resultat.product.product_name_fr;
            })
            .catch(function (err) {
                alert("Le produit n'est pas présent dans la base de données");
                console.log(err.message);
            });

        if (resultat.product.product_name_fr) {
            this.nom = resultat.product.product_name_fr;
        } else if (resultat.product.product_name_en) {
            this.nom = resultat.product.product_name_en;
        } else {
            this.nom = "inconnu";
        }

        if (resultat.product.brands_imported) {
            this.marque = resultat.product.brands_imported;
        } else if (resultat.product.brands) {
            this.marque = resultat.product.brands;
        } else {
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
        } else if (resultat.product.Ingredients_text_en) {
            this.ingredients = resultat.product.Ingredients_text_en;
        } else {
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

        this.nutriments.set(
            " ",
            "pour" + resultat.product.nutrition_data_prepared_per
        );

        if (resultat.product.nutriments["energy-kj"]) {
            this.nutriments.set(
                "Energie",
                this.testValeur(resultat.product.nutriments["energy-kj"]) +
                    " kj"
            );
        }

        if (resultat.product.nutriments.fat_100g) {
            this.nutriments.set(
                "Matières grasses",
                this.testValeur(resultat.product.nutriments.fat_100g) + " g"
            );
        }

        if (resultat.product.nutriments["saturated-fat_100g"]) {
            this.nutriments.set(
                "Acides gras saturés",
                this.testValeur(
                    resultat.product.nutriments["saturated-fat_100g"]
                ) + " g"
            );
        }

        if (resultat.product.nutriments.carbohydrates_100g) {
            this.nutriments.set(
                "Glucides",
                this.testValeur(
                    resultat.product.nutriments.carbohydrates_100g
                ) + " g"
            );
        }

        if (resultat.product.nutriments.sugars_100g) {
            this.nutriments.set(
                "Sucres",
                this.testValeur(resultat.product.nutriments.sugars_100g) + " g"
            );
        }

        if (resultat.product.nutriments.fiber_modifier) {
            this.nutriments.set(
                "Fibres alimentaires",
                this.testModificateur(
                    resultat.product.nutriments.fiber_modifier
                ) +
                    " " +
                    this.testValeur(resultat.product.nutriments.fiber_100g) +
                    " g"
            );
        }

        if (resultat.product.nutriments.proteins_100g) {
            this.nutriments.set(
                "Protéines",
                this.testValeur(resultat.product.nutriments.proteins_100g) +
                    " g"
            );
        }

        if (resultat.product.nutriments.salt_100g) {
            this.nutriments.set(
                "Sel",
                this.testValeur(resultat.product.nutriments.salt_100g) + " g"
            );
        }

        if (resultat.product.nutriments.alcohol) {
            this.nutriments.set(
                "Alcool",
                this.testValeur(resultat.product.nutriments.alcohol) + " g"
            );
        }

        if (
            resultat.product.nutriments[
                "fruits-vegetables-nuts-estimate-from-ingredients_100g"
            ]
        ) {
            this.nutriments.set(
                "Fruits‚ légumes‚ noix et huiles de colza‚ noix et olive (estimation par analyse de la liste des ingrédients)",
                this.testValeur(
                    resultat.product.nutriments[
                        "fruits-vegetables-nuts-estimate-from-ingredients_100g"
                    ]
                ) + " g"
            );
        }
    }

    public getNom(): string {
        return this.nom;
    }

    public getMarque(): string {
        return this.marque;
    }

    public getQuantite(): number {
        return this.quantite;
    }

    public getConditionnement(): string {
        return this.conditionnement;
    }

    public getCategories(): string {
        return this.categories;
    }

    public getPreparation(): string {
        return this.preparation;
    }

    public getTraces(): string {
        return this.traces;
    }

    public getMagasins(): string {
        return this.magasins;
    }

    public getConservations(): string {
        return this.conservations;
    }

    public getIngredient(): string {
        return this.ingredients;
    }

    public getImageNova(): string {
        return this.imageNova;
    }

    public getImageEco(): string {
        return this.imageEco;
    }

    public getImageNutri(): string {
        return this.imageNutri;
    }

    public getImageProduit(): string {
        return this.imageProduit;
    }

    public getCodeBarre(): number {
        return this.codeBarre;
    }

    public getNutriments(): Map<string, string | number> {
        return this.nutriments;
    }

    public setNom(Nom: string) {
        this.nom = Nom;
    }

    public setMarque(Marque: string) {
        this.marque = Marque;
    }

    public setQuantite(Quantite: number) {
        this.quantite = Quantite;
    }

    public setConditionnement(Conditionnement: string) {
        this.conditionnement = Conditionnement;
    }

    public setCategories(Categories: string) {
        this.categories = Categories;
    }

    public setPreparation(Preparation: string) {
        this.preparation = Preparation;
    }

    public setTraces(Traces: string) {
        this.traces = Traces;
    }

    public setMagasins(Magasins: string) {
        this.magasins = Magasins;
    }

    public setConservations(Conservations: string) {
        this.conservations = Conservations;
    }

    public setIngredient(Ingredient: string) {
        this.ingredients = Ingredient;
    }

    public setImageProduit(imageProduit: string) {
        this.imageProduit = imageProduit;
    }

    public setImageNova(imageNova: string) {
        this.imageNova = imageNova;
    }

    public setImageEco(imageEco: string) {
        this.imageEco = imageEco;
    }

    public setImageNutri(imageNutri: string) {
        this.imageNutri = imageNutri;
    }

    public setCodeBarre(codeBarre: number) {
        this.codeBarre = codeBarre;
    }

    public setNutriments(nutriments: Map<string, string | number>): void {
        this.nutriments = nutriments;
    }

    afficherTableau = function (nutriments: Map<string, string | number>) {
        const tableNut = document.getElementById("tableNutri") as HTMLElement;
        tableNut.innerHTML = "";
        const tableauNutri = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        tableauNutri.classList.add("table-style");
        tableauNutri.appendChild(thead);
        tableauNutri.appendChild(tbody);
        tableNut.appendChild(tableauNutri);

        const row1: HTMLElement = document.createElement("tr");
        const heading1: HTMLTableCellElement = document.createElement("th");
        heading1.innerHTML = " ";
        const heading2: HTMLElement = document.createElement(
            "th"
        ) as HTMLElement;
        if (nutriments.get(" ")) {
            heading2.innerHTML = nutriments.get(" ")?.toString() ?? " ";
            row1.appendChild(heading1);
            row1.appendChild(heading2);
            thead.appendChild(row1);

            // let compteur: number =0;
            for (const element in nutriments) {
                // let nomRow: string = "row" + numberEnumValues.toString();
                // let nomRowData1:string = nomRow + "Data1";
                const row2: HTMLTableRowElement = document.createElement("tr");
                const row2Data1: HTMLTableCellElement =
                    document.createElement("td");
                row2Data1.innerHTML = element;
                const row2Data2: HTMLTableCellElement =
                    document.createElement("td");
                row2Data2.innerHTML =
                    nutriments.get("Energie")?.toString() ?? "Energie";
                row2.appendChild(row2Data1);
                row2.appendChild(row2Data2);
                tbody.appendChild(row2);
            }
        }
    };
}
const section: HTMLElement = document.querySelector(".section") as HTMLElement;
const code: HTMLElement = document.getElementById(
    "rechercher"
) as HTMLInputElement;
const formulaire: HTMLFormElement = document.querySelector(
    ".formulaire__demande"
) as HTMLFormElement;
const regex: RegExp = /[0-9]{8,13}/;

const afficherCaracteristiques = function (prod: Produit): void {
    const caracteristiques = document.getElementById("carac") as HTMLElement;
    let texte: string = "";
    if (prod.getNom()) {
        texte +=
            "<span class= 'gras' >Nom : </span>" +
            prod.getNom() +
            "<br /><br />";
    } else {
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

const afficherImages = function (prod: Produit): void {
    const imgProduct = document.getElementById("imgProduct") as HTMLElement;
    imgProduct.setAttribute("src", prod.getImageProduit.toString());

    const imgNutri = document.getElementById("imgNutri") as HTMLElement;
    imgNutri.setAttribute("src", prod.getImageNutri.toString());

    const imgNova = document.getElementById("imgNova") as HTMLElement;
    imgNova.setAttribute("src", prod.getImageNova.toString());

    const imgEcoscore = document.getElementById("imgEcoscore") as HTMLElement;
    imgEcoscore.setAttribute("src", prod.getImageEco.toString());
};

const afficherIngredients = function (prod: Produit): void {
    const ingredients = document.getElementById(
        "listeIngredients"
    ) as HTMLElement;
    ingredients.innerHTML = prod.getIngredient();
};

const afficher = function (prod: Produit): void {
    afficherCaracteristiques(prod);
    afficherImages(prod);
    afficherIngredients(prod);
};
/**
 * Ajoute un écouteur sur le bouton rechercher qui lance la création de l'objet produit  et
 * rend visible la fiche produit.
 */

formulaire?.addEventListener("submit", function (e) {
    const codeBarre: number = Number((code as HTMLInputElement).value);
    if (regex.test(codeBarre.toString())) {
        e.preventDefault();
        const prod: Produit = new Produit(codeBarre);
        prod.afficherTableau(prod.getNutriments as any);
        afficher(prod);

        section.classList.add("sectionVisible");
    } else {
        alert("veuillez entrer un code barre valide");
    }
});
