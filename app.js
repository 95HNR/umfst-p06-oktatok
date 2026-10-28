// App modul az erintokepernyos kezeleshez, glare effektushoz es szurokhöz
document.addEventListener("DOMContentLoaded", () => {
    initTouchToggle();
    initGlareEffect();
    initDepartmentFilter();
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

// Egermozgas kovetese a Glare csillanas CSS valtozoihoz
function initGlareEffect() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            card.style.setProperty("--mouse-x", `${xPercent}%`);
            card.style.setProperty("--mouse-y", `${yPercent}%`);
        });
    });
}

// Tanszeki szures View Transitions API-val (amennyiben tamogatott)
function initDepartmentFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const updateFilter = () => {
                cards.forEach((card) => {
                    const dept = card.getAttribute("data-dept");
                    if (filter === "all" || dept === filter) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            };

            // View Transitions API hasznalata az atrendezodes animalasahoz
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    updateFilter();
                });
            } else {
                updateFilter();
            }
        });
    });
}