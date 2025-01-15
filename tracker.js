// Espera a que el DOM est� completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obt�n el bot�n y el contenedor donde se a�adir� el texto
    const button = document.getElementById("add-text-btn");
    const output = document.getElementById("output");

    // A�ade un evento al bot�n
    button.addEventListener("click", () => {
        // Crea un nuevo elemento de texto
        const newText = document.createElement("p");
        newText.textContent = "Hola Notion";

        // A�ade el texto al contenedor
        output.appendChild(newText);
    });
});
