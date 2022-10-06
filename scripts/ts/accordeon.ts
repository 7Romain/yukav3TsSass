export function genererAccordeon() {
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
}
