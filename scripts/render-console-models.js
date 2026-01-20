async function loadFooter() {
    try {
        const response = await fetch("components/footer.html");
        const footerHTML = await response.text();
        document.getElementById("footer").innerHTML = footerHTML;
    } catch (error) {
        console.error("Erro ao carregar o rodapé:", error);
    }
}

async function loadConsoleModels(consoleId) {
    try {
        const response = await fetch(`data/modelos-consoles/${consoleId}.json`);
        const data = await response.json();

        // 🔹 Título da aba
        document.title = data.pageTitle;

        // 🔹 Cabeçalho da página
        document.getElementById("console-title").innerText =
            `${data.console} – ${data.section}`;

        document.getElementById("console-description").innerText =
            data.description;

        // 🔹 Cards de modelos
        const container = document.getElementById("models-container");
        container.innerHTML = "";

        data.models.forEach(model => {
            const card = document.createElement("a");
            card.className = "card-link";
            card.href = model.page;

            card.innerHTML = `
        <div class="category-card console-card">
          <img src="images/consoles/${model.image}" alt="${model.name}">
          <h2>${model.name}</h2>
        </div>
      `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar dados do console:", error);
    }
}

// 🔹 Inicialização padrão da página
document.addEventListener("DOMContentLoaded", () => {
    loadFooter();
});
