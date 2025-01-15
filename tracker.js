// tracker.js
const startButton = document.getElementById("startButton");
const projectNameInput = document.getElementById("projectName");

// Variables de estado
let isTracking = false;
let blockId = null; // Para almacenar el ID del bloque en Notion

// Configuración de la API de Notion
const notionToken = "TU_API_KEY";
const databaseId = "TU_DATABASE_ID";

const headers = {
    "Authorization": `Bearer ${notionToken}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
};

startButton.addEventListener("click", async () => {
    const projectName = projectNameInput.value.trim();
    if (!projectName) {
        alert("Por favor, introduce un nombre de proyecto.");
        return;
    }

    if (!isTracking) {
        // Inicia el tracking
        const startTime = new Date().toISOString();
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers,
            body: JSON.stringify({
                parent: { database_id: databaseId },
                properties: {
                    Name: { title: [{ text: { content: projectName } }] },
                    Status: { select: { name: "In Progress" } },
                    Start: { date: { start: startTime } }
                }
            })
        });
        const data = await response.json();
        blockId = data.id; // Guarda el ID del bloque creado
        isTracking = true;
        startButton.textContent = "Stop Tracking";
        startButton.classList.add("stop");
    } else {
        // Detiene el tracking
        const endTime = new Date().toISOString();
        await fetch(`https://api.notion.com/v1/pages/${blockId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                properties: {
                    Status: { select: { name: "Completed" } },
                    End: { date: { start: endTime } }
                }
            })
        });
        isTracking = false;
        startButton.textContent = "Start Tracking";
        startButton.classList.remove("stop");
        blockId = null;
    }
});
