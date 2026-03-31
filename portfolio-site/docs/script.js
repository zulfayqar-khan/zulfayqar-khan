const cards = [...document.querySelectorAll(".project-card")];
const chips = [...document.querySelectorAll(".filter-chip")];
const revealEls = [...document.querySelectorAll("[data-reveal]")];

const spotlightTitle = document.getElementById("spotlight-title");
const spotlightSummary = document.getElementById("spotlight-summary");
const spotlightStack = document.getElementById("spotlight-stack");
const spotlightLink = document.getElementById("spotlight-link");

function updateSpotlight(card) {
  cards.forEach((item) => item.classList.remove("is-selected"));
  card.classList.add("is-selected");

  spotlightTitle.textContent = card.dataset.title;
  spotlightSummary.textContent = card.dataset.summary;
  spotlightStack.textContent = card.dataset.stack;
  spotlightLink.href = card.dataset.link;
}

cards.forEach((card) => {
  card.addEventListener("click", () => updateSpotlight(card));
  card.addEventListener("mouseenter", () => updateSpotlight(card));
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    chips.forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");

    const visibleCards = cards.filter((card) => {
      const tags = card.dataset.filterTags.split(" ");
      const shouldShow = filter === "all" || tags.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
      return shouldShow;
    });

    if (!visibleCards.some((card) => card.classList.contains("is-selected"))) {
      updateSpotlight(visibleCards[0]);
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealEls.forEach((element) => observer.observe(element));
