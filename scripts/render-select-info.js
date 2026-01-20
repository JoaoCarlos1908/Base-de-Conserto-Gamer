// 🔹 Carrega o rodapé
async function loadFooter() {
    try {
        const response = await fetch("components/footer.html");
        const footerHTML = await response.text();
        document.getElementById("footer").innerHTML = footerHTML;
    } catch (error) {
        console.error("Erro ao carregar o rodapé:", error);
    }
}

// 🔹 Carrega informações da página do console
async function loadConsolePage(consoleId) {
    try {
        const response = await fetch(`data/select-info/${consoleId}.json`);
        const data = await response.json();

        // 🔹 Título da aba
        document.title = data.pageTitle || data.console;

        // 🔹 Cabeçalho
        const logo = document.getElementById("console-logo");
        logo.src = data.logo;
        logo.alt = data.console;

        document.getElementById("console-name").innerText = data.console;
        document.getElementById("console-description").innerText = data.description;

        // 🔹 Links das seções
        document.getElementById("link-desmontagem").href = data.links.desmontagem;
        document.getElementById("link-defeitos").href = data.links.defeitos;
        document.getElementById("link-diagramas").href = data.links.diagramas;
        document.getElementById("link-avancado").href = data.links.avancado;
        document.getElementById("link-cuidados").href = data.links.cuidados;

        // 🔹 Diagnóstico (opcional)
        if (data.diagnostic) {
            const list = document.getElementById("diagnostic-list");
            const tip = document.getElementById("diagnostic-tip");

            list.innerHTML = "";

            data.diagnostic.items.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${item.problem}:</strong> ${item.solution}`;
                list.appendChild(li);
            });



            tip.innerText = data.diagnostic.tip || "";
        }

    } catch (error) {
        console.error("Erro ao carregar dados do console:", error);
    }
}

// 🔹 Inicialização padrão da página
document.addEventListener("DOMContentLoaded", () => {
    loadFooter();
});
