

//HERE IS THE LOGIC OF A SWATCH OF A PROCUT IN A COLLECTION 
class AnimatedCard extends HTMLElement {
  constructor() {
      super();
      const obsever = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
          console.log("enetereredd")
          entry.target.classList.toggle("forwardAnimation");
          entry.target.offsetWidth
          entry.target.classList.toggle("backwardAnimation");
        })
      })
    const cards = this.querySelectorAll(".image_container .card_img");
    console.log(cards)
    cards.forEach((card) => {
        obsever.observe(card)
    })

  }
}
customElements.define('animated-card', AnimatedCard);
