//HERE IS THE LOGIC OF THE UI OF PRODUCT PAGE
class ProductUI extends HTMLElement {
    constructor() {
        super();
        //Quantity
        this.quantity = 0;
        this.initOrderQuantity();
        
        //Bundle Products Cards
        this.initCardProductBundle();

        //Reviews
        this.current_review_counter = 1;
        this.initReviewSlide();

        //overlayZoomImage
        this.overlayZoomImage();

    }
    initOrderQuantity(){
        let minus_btn = this.querySelector(".minus_btn")
        let quantity = this.querySelector(".quantity")
        let plus_btn = this.querySelector(".plus_btn")

        this.quantity = parseInt(quantity.innerHTML)

        minus_btn.addEventListener('click',()=>{
            if(this.quantity>1){
                this.quantity = parseInt(quantity.innerHTML);
                this.quantity--
                quantity.innerHTML = `${this.quantity}`
            }    
        })

        plus_btn.addEventListener('click',()=>{
            this.quantity = parseInt(quantity.innerHTML);
                this.quantity++
                quantity.innerHTML = `${this.quantity}`
        })
    }

    initCardProductBundle(){
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
        const bundleDataFetch = () => {
            //from a snippet take the json directly because it is a metafield
            var boughTogether = document.querySelector('.productBoughTogether[type="application/json"]');
            if (!boughTogether) return;
            //Take the variantData
            var variantData = JSON.parse(boughTogether.innerText);
            var query = '';

            //create the query from the json to retrieve the products
            variantData.forEach((e, key, variantData) => {
            if (!Object.is(variantData.length - 1, key)) {
                //this create a query of ids seperate by OR ex: 123 OR 321
                query += e + '%20OR%20id:';
            } else {
                query += e;
            }
            });

            //get these products
            var productAjaxURL = '?q=id:' + query + '&section_id=product-bough-together';
            //Searching for this products using the routes.search_url provided from shopify
            //the search url when used  return a search result and replace in liquid file
        
            fetch(`${routes.search_url}${productAjaxURL}`)
            .then((response) => response.text())
            .then(async (responseText) => {
                const html = new DOMParser().parseFromString(responseText, 'text/html');
                //change the section inner html with the products retrieved
                document.querySelector('products_bundle_container').innerHTML =
                html.querySelector("products_bundle_container").innerHTML;
            })
            .catch((e) => {
                throw error;
            })
            .finally(() => {
                //Add event listeners to new checkboxes of the products
                // this.eventProductBoughTogetherAction();
            });
            }
        bundleDataFetch();
    }

    initReviewSlide(){

        let review_cards_container = this.querySelector('.review_cards_container');
        let arrow_left = this.querySelector(".arrow_container_left");
        let arrow_right = this.querySelector(".arrow_container_right");

        if(this.current_review_counter === 1){
            arrow_left.style.opacity = "0"
        }

        arrow_right.addEventListener('click',()=>{
            console.log("clicked right")

            let transform =  this.current_review_counter * -100;
            arrow_right.style.opacity = "1";   
            review_cards_container.style.transform = "translate("+ transform +"%)"

            if(this.current_review_counter + 1 > review_cards_container.querySelectorAll(".review_card").length - 1){
                arrow_right.style.opacity = "0"; 
                return;
            }else{
                arrow_left.style.opacity = "1";
                this.current_review_counter++;
            }
            
            
        })

        arrow_left.addEventListener('click',()=>{

            this.current_review_counter--;

            arrow_right.style.opacity = "1"; 
            let transform =  this.current_review_counter * -100;
            arrow_left.style.opacity = "1";   
            review_cards_container.style.transform = "translate("+ transform +"%)"

            

            if(this.current_review_counter  < 1){
                this.current_review_counter++;
                arrow_left.style.opacity = "0"; 
                return;
            }

            

            
        })   
          
    }

    overlayZoomImage(){
        let overlay_images_zoom_container = this.querySelector(".overlay_images_zoom_container")
        let product_images_zoom = overlay_images_zoom_container.querySelector(".product_images_zoom");
        let close_button = overlay_images_zoom_container.querySelector(".close_button")

        let image_cards = this.querySelectorAll(".image_card")
        image_cards.forEach((img_card) => {
            img_card.addEventListener('click',() => {
                document.querySelector("body").style.overflowY = "hidden"
                overlay_images_zoom_container.style.display = "block"
            })
        })
        close_button.addEventListener('click',()=>{
            overlay_images_zoom_container.style.display = "none";
            document.querySelector("body").style.overflowY = "scroll"
        })
    }
}
customElements.define('product-ui', ProductUI);

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