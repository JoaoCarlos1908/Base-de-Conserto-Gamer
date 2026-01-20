async function loadFooter() {
    const response = await fetch("components/footer.html");
    document.getElementById("footer").innerHTML = await response.text();
}

async function loadDesmontagem(slug) {
    try {
        const response = await fetch(`data/desmontagem/${slug}.json`);
        const data = await response.json();

        // 🔹 Título
        document.title = data.pageTitle;
        document.getElementById("page-title").innerText = "Desmontagem";

        // 🔹 Cabeçalho
        document.getElementById("console-image").src = data.image;
        document.getElementById("console-name").innerText = data.console;
        document.getElementById("console-model").innerText = `Modelo ${data.model}`;
        document.getElementById("page-description").innerText = data.description;

        // 🔹 Ferramentas
        const toolsList = document.getElementById("tools-list");
        toolsList.innerHTML = "";
        data.tools.forEach(tool => {
            const li = document.createElement("li");
            li.textContent = tool;
            toolsList.appendChild(li);
        });

        // 🔹 Vídeos
        const videosContainer = document.getElementById("videos-container");
        videosContainer.innerHTML = "";

        data.videos.forEach(video => {
            const section = document.createElement("section");
            section.className = "video-section";

            section.innerHTML = `
                <h2>${video.title}</h2>

                <div class="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/${video.youtubeId}"
                        allowfullscreen
                        loading="lazy">
                    </iframe>
                </div>

                <section class="credits-section">
                    <h3>📌 Créditos</h3>
                    <p>Vídeo produzido por <strong>${video.author}</strong>.</p>
                    <p>
                        ▶️ Canal no YouTube:
                        <a href="${video.channel}" target="_blank" rel="noopener">
                            ${video.channel}
                        </a>
                    </p>
                </section>
            `;

            videosContainer.appendChild(section);
        });

        // 🔹 Dicas
        const tipsList = document.getElementById("tips-list");
        tipsList.innerHTML = "";
        data.tips.forEach(tip => {
            const li = document.createElement("li");
            li.textContent = tip;
            tipsList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao carregar desmontagem:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadFooter);
