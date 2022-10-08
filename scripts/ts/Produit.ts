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
     * Test pour éviter d'afficher undefind
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

    afficherTableau = function (result: Map<string, number | string>) {
        const tableNut = document.getElementById("tableNutri") as HTMLElement;
        tableNut.innerHTML = "";
        const tableauNutri = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        tableauNutri.classList.add("table-style");
        tableauNutri.appendChild(thead);
        tableauNutri.appendChild(tbody);
        tableNut.appendChild(tableauNutri);

        result.forEach(function (value, key) {
            const row1: HTMLElement = document.createElement("tr");

            let heading1;

            if (heading1 === undefined) {
                heading1 = document.createElement("th");
            } else {
                heading1 = document.createElement("td");
            }

            heading1.innerHTML = key;
            let heading2;
            if (heading2 === undefined) {
                heading2 = document.createElement("th");
            } else {
                heading2 = document.createElement("td");
            }

            heading2.innerHTML = value.toString();
            row1.appendChild(heading1);
            row1.appendChild(heading2);
            console.log(thead.firstChild);
            if (thead.firstChild === null) {
                thead.appendChild(row1);
            } else {
                tbody.appendChild(row1);
            }
        });
    };

    public constructor(resultat: any) {
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
            this.imageEco =
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

    public getNutriments() {
        return this.nutriments;
    }
}
