//HERE IS THE LOGIC OF A SWATCH OF A PROCUT IN A COLLECTION 
class ProductVariantsCollection extends HTMLElement {
    constructor() {
        super();
        const card = this.querySelector('.card_container')
        card.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.addEventListener('change', () => {
                var selectedOption = this.querySelector('.card_container input[type="radio"]:checked').value;
                let images = radio.closest(".card_container .img_container").querySelectorAll("img");
                images.forEach((img) => {
                    console.log("Alt : " + img.alt + " *** " + "Option :" + selectedOption)
                    if (img.alt === selectedOption) {

                        img.classList.add("show")
                    } else {
                        img.classList.remove("show");
                    }
                })
            })
        })

    }
}
customElements.define('product-variants', ProductVariantsCollection);