//HERE IS THE LOGIC OF A SWATCH OF A PROCUT IN A COLLECTION 
class CartDrawer extends HTMLElement {
    constructor() {
        super();
        this.overlay_dark = this.querySelector(".overlay_dark");
        this.close_icon = this.querySelector(".close_icon")
        this.initCart();

    }

    //UI LOGIC
    initCart(){
        this.overlay_dark.addEventListener('click',() => {
            this.close();
        })
        this.close_icon.addEventListener('click',() => {
            this.close();
        })
    }

    close(){
        this.style.display = "none";
        document.querySelector("body").style.overflowY = "scroll"
    }

    open(){
        this.style.display = "flex";
        document.querySelector("body").style.overflowY = "hidden"
    }

    //CART DATA LOGIC
    addToCart(id,quantity){
        var productsToAdd = []
        productsToAdd.push({
          id: id,
          quantity : quantity
        })

        const items = productsToAdd.map((product) => ({
          id:product.id ,
          quantity : parseInt(product.quantity)
        }))
        const requesBody = {
          items:items
        }

        requesBody.sections = this.getSectionsToRenderInner().map((section) => section.id);
        requesBody.sections_url =  window.location.pathname;
        fetch(`${window.Shopify.routes.root}cart/add.js`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify(requesBody)
        })
          .then((response) => response.json())
          .then((response) => {
              this.renderContents(response,true);
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
          });
    }


    renderContents(parsedState,isAlreadyOpen = false) {
        if(!isAlreadyOpen){
        this.getSectionsToRenderInner().forEach((section) => {
          const sectionElement = section.selector
            ? document.querySelector(section.selector)
            : document.getElementById(section.id);
          sectionElement.innerHTML = this.getSectionsToRenderInner(parsedState.sections[section.id], section.selector);
        });
    
        setTimeout(() => {
          this.open();
        });
        }else{
      
        this.getSectionsToRenderInner().forEach((section) => {
            
          const sectionElement = section.selector
            ? document.querySelector(section.selector)
            : document.getElementById(section.id);


          sectionElement.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id],section.selector);
        });
        }
       
    }

    getSectionsToRenderInner() {
        return [
          {
            id: 'cart-drawer',
            section: 'cart-drawer',
            selector: '.items_cart_container',
          },
          {
            id: 'header-section',
            section:'header-section',
            selector: '#cart-icon-header'
          },
        ];
    }

    getSectionInnerHTML(html, selector = '.shopify-section') {
        return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }

}
customElements.define('cart-drawer', CartDrawer);