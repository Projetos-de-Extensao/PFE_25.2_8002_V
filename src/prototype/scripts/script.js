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



    // ==========================
    //   MODAL DE CONFIRMAÇÃO
    // ==========================
    const modal = document.getElementById("deleteModal");
    const modalOverlay = document.getElementById("modalOverlay");

    const stateConfirm = document.getElementById("modalStateConfirm");
    const stateDone    = document.getElementById("modalStateDone");

    const confirmBtn = document.getElementById("confirmDeleteBtn");
    const cancelBtn  = document.getElementById("cancelDeleteBtn");
    const doneBtn    = document.getElementById("doneBtn");

    let pendingDeleteCard = null; // referência do card que será apagado

    function setModalState(isDone) {
    if (isDone) {
        stateConfirm.classList.add("is-hidden");
        stateDone.classList.remove("is-hidden");
        doneBtn && doneBtn.focus();
    } else {
        stateDone.classList.add("is-hidden");
        stateConfirm.classList.remove("is-hidden");
        confirmBtn && confirmBtn.focus();
    }
    }

    function openModal(card) {
        pendingDeleteCard = card;
        setModalState(false); // abre no estado de confirmação
        modal.classList.add("is-visible");
        modalOverlay.classList.add("is-visible");
        document.documentElement.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("is-visible");
        modalOverlay.classList.remove("is-visible");
        pendingDeleteCard = null;
        document.documentElement.style.overflow = "";
    }

    // Delegação: abrir modal ao clicar em qualquer botão Excluir
    document.addEventListener("click", function(e) {
    const delBtn = e.target.closest(".job-card__delete");
    if (!delBtn) return;
    e.stopPropagation();
    e.preventDefault();
    const card = delBtn.closest(".job-card");
    if (card) openModal(card);
    });

    // Confirmar: remove o card e muda o modal para estado “sucesso”
    if (confirmBtn) {
    confirmBtn.addEventListener("click", function() {
        if (pendingDeleteCard) {
        pendingDeleteCard.remove(); // aqui ficaria a chamada da API real
        }
        setModalState(true); // mostra mensagem de sucesso + "Entendido"
    });
    }

    // Cancelar: fecha modal
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    // “Entendido”: fecha modal
    if (doneBtn) doneBtn.addEventListener("click", closeModal);

    // Fechar clicando no overlay
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    // Fechar com ESC
    document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
        closeModal();
    }
    });
});