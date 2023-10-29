const obsever = new IntersectionObserver(entries => {
    console.log("here")
    entries.forEach((entry) => {
      entry.target.classList.toggle("forwardAnimation");
      entry.target.offsetWidth
      entry.target.classList.toggle("backwardAnimation");
    })
  })
const cards = document.querySelectorAll(".image_container .card_img");
console.log(cards)
cards.forEach((card) => {
    obsever.observe(card)
})