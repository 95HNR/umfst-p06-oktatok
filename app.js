// App modul az erintokepernyos kezeleshez
document.addEventListener("DOMContentLoaded", () => {
    initTouchToggle();
});

// Erintokepernyos fordito gomb kezeles aria-pressed allapottal
function initTouchToggle() {
    const touchBtns = document.querySelectorAll(".card__touch-btn");

    touchBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".card");
            const isFlipped = card.classList.contains("is-flipped");

            if (isFlipped) {
                card.classList.remove("is-flipped");
                updateAriaPressed(card, false);
            } else {
                card.classList.add("is-flipped");
                updateAriaPressed(card, true);
            }
        });
    });
}

function updateAriaPressed(card, state) {
    const btns = card.querySelectorAll(".card__touch-btn");
    btns.forEach((btn) => {
        btn.setAttribute("aria-pressed", state ? "true" : "false");
    });
}