import { Produit } from "./Produit";
export const afficherImages = function (prod: Produit): void {
    const imgProduct = document.getElementById("imgProduct") as HTMLElement;
    imgProduct.setAttribute("src", prod.getImageProduit());

    const imgNutri = document.getElementById("imgNutri") as HTMLElement;
    imgNutri.setAttribute("src", prod.getImageNutri());

    const imgNova = document.getElementById("imgNova") as HTMLElement;
    imgNova.setAttribute("src", prod.getImageNova());

    const imgEcoscore = document.getElementById("imgEcoscore") as HTMLElement;
    imgEcoscore.setAttribute("src", prod.getImageEco());
};
