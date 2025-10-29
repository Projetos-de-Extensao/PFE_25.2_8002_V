document.addEventListener("DOMContentLoaded", function() {

    const hamburgerButton = document.querySelector(".header__hamburger");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    // Função para fechar a sidebar
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("sidebar--open");
        if (overlay) overlay.classList.remove("overlay--visible");
    }

    // Função para abrir a sidebar
    function openSidebar() {
        if (sidebar) sidebar.classList.add("sidebar--open");
        if (overlay) overlay.classList.add("overlay--visible");
    }

    // Abre a sidebar ao clicar no hamburguer
    if (hamburgerButton) {
        hamburgerButton.addEventListener("click", function() {
            // Verifica se já está aberta para decidir se fecha ou abre
            const isSidebarOpen = sidebar.classList.contains("sidebar--open");
            if (isSidebarOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Fecha a sidebar ao clicar no overlay
    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // --- LÓGICA DOS CARDS (EXPANDIR/RECOLHER) ---

    // Define os caminhos das imagens de seta
    // (Ajuste se seus caminhos forem diferentes)
    const SetaParaCima = "../assets/imgs/setinha-preta-cima.png";
    const SetaParaBaixo = "../assets/imgs/setinha-card-baixo.png";

    // Pega todos os cartões da página
    const todosOsCards = document.querySelectorAll(".job-card");

    // Adiciona a lógica de clique para cada um
    todosOsCards.forEach(function(card) {
        
        card.addEventListener("click", function(event) {
            
            // Lógica de segurança:
            // Se o clique foi em um botão ou link, NÃO faz nada.
            const alvoDoClique = event.target;
            if (alvoDoClique.closest("button") || alvoDoClique.closest("a")) {
                return; 
            }

            // Se o clique foi no card (fora dos botões),
            // liga ou desliga a classe principal.
            card.classList.toggle("job-card--expanded");

            // Lógica para trocar o ícone (a seta)
            const icon = card.querySelector(".job-card__toggle-icon");
            const estaExpandido = card.classList.contains("job-card--expanded");

            if (estaExpandido) {
                icon.src = SetaParaCima;
                icon.alt = "Recolher";
            } else {
                icon.src = SetaParaBaixo;
                icon.alt = "Expandir";
            }
        });
    });

});

