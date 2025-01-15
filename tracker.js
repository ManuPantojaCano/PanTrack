// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtén el botón y el contenedor donde se añadirá el texto
    const button = document.getElementById("add-text-btn");
    const output = document.getElementById("output");

    // Añade un evento al botón
    button.addEventListener("click", () => {
        // Crea un nuevo elemento de texto
        const newText = document.createElement("p");
        newText.textContent = "Hola Notion";

        // Añade el texto al contenedor
        output.appendChild(newText);
    });
});
