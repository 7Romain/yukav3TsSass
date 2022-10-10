function genererAccordeon() {
    const accordeon = document.getElementsByClassName("accordion");
    const accordeon2 = Array.from(accordeon);
    for (const element of accordeon2) {
        element.addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that control the panel */
            element.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            const panel = element.nextElementSibling as HTMLElement;

            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}
