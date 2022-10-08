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
