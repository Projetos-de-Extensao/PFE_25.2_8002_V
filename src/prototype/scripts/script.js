document.addEventListener("DOMContentLoaded", function() {
    
            const SetaParaCima = "../assets/imgs/setinha-preta-cima.png";
            const SetaParaBaixo = "../assets/imgs/setinha-card-baixo.png";
    
            const todosOsCards = document.querySelectorAll(".job-card");
    
            todosOsCards.forEach(function(card) {
                
                card.addEventListener("click", function(event) {
                    
                    const alvoDoClique = event.target;
                    if (alvoDoClique.closest("button") || alvoDoClique.closest("a")) {
                        return; 
                    }
                    card.classList.toggle("job-card--expanded");
    
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