// ./scripts/modal-delete.js
document.addEventListener("DOMContentLoaded", () => {
  // Elementos fixos
  const modal        = document.getElementById("deleteModal");
  const modalOverlay = document.querySelector(".overlay");

  const stateConfirm = document.getElementById("modalStateConfirm");
  const stateDone    = document.getElementById("modalStateDone");

  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn  = document.getElementById("cancelDeleteBtn");
  const doneBtn    = document.getElementById("doneBtn");

  let pendingDeleteCard = null; // card que será removido

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
    setModalState(false);
    modal.classList.add("is-visible");
    modal.removeAttribute("aria-hidden");
    if (modalOverlay) modalOverlay.classList.add("is-visible");
    // trava scroll
    document.documentElement.style.overflow = "hidden";
    // foco acessível
    const box = modal.querySelector(".modal__box");
    box && box.focus();
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    if (modalOverlay) modalOverlay.classList.remove("is-visible");
    pendingDeleteCard = null;
    document.documentElement.style.overflow = "";
  }

  // Abrir modal ao clicar em "Excluir" de qualquer card
  document.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".job-card__actions--professor .btn--danger");
    if (!delBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const card = delBtn.closest(".job-card");
    if (card) openModal(card);
  });

  // Confirmar exclusão
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
      if (pendingDeleteCard) {
        // Exemplo: lugar da chamada real de API (DELETE)
        // await fetch(`/api/vagas/${id}`, { method: "DELETE" });
        pendingDeleteCard.remove();
      }
      setModalState(true); // muda para estado "sucesso"
    });
  }

  // Cancelar / Entendido
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (doneBtn)   doneBtn.addEventListener("click", closeModal);

  // Fechar clicando no overlay
  if (modalOverlay) {
    modalOverlay.addEventListener("click", () => {
      if (modal.classList.contains("is-visible")) closeModal();
    });
  }

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
});
