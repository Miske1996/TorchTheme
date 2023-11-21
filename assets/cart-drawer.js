class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();

    //TASK 2 LOGIC
    this.cart =  document.querySelector('cart-drawer');
    this.bundleDataFetch();
    
    //TASK 3 LOGIC 
    let product_article_container = document.querySelector(".product_article_container")
    if(product_article_container){
      product_article_container.addEventListener('click',()=>{
        this.addToCartProductArticle(product_article_container);
      })
    }
  }


  //TASK 2 FUNCTIONS

  //Task 2: Add to cart
  addToCartUpsell(item) {
    var productsToAdd = []
    const mainProduct = item
    productsToAdd.push({
      id: mainProduct.getAttribute("data-product-upsell-id"),
      quantity : mainProduct.getAttribute("data-product-upsell-quantity")
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
  //Task 2 : upsell products functions
  bundleDataFetch() {
    var upsell_products_ids = this.querySelector('.productsUpsell[type="application/json"]');
    if (!upsell_products_ids) return;
    //Take the variantData
    var variantData = JSON.parse(upsell_products_ids.innerText);
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
    var productAjaxURL = '?q=id:' + query + '&section_id=cart-drawer';
    //Searching for this products using the routes.search_url provided from shopify
    //the search url when used  return a search result and replace in liquid file
    fetch(`${routes.search_url}${productAjaxURL}`)
    .then((response) => response.text())
    .then(async (responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        //change the section inner html with the products retrieved
        this.querySelector(".upsell_container").innerHTML = html.querySelector(".upsell_container").innerHTML
        const productsCollectionCart = this.querySelectorAll(".upsell_product");
      const debouncedOnClick = debounce((item) => {
        this.addToCartUpsell(item);
      }, ON_CHANGE_DEBOUNCE_TIMER);
      if(productsCollectionCart.length > 0){
        productsCollectionCart.forEach((item) => {
          item.querySelector(".add_upsell_product_img").addEventListener('click',(event)=>{
            event.preventDefault()
            debouncedOnClick(item);   
          });
        });
      }
    })
    .catch((e) => {
        console.log(e)
        throw e;
    })
    .finally(() => {
        
    });
    }

  //END TASKT 2 FUNCTIONS

  //TASK 3 FUNCTIONS
  addToCartProductArticle(item){
    var productsToAdd = []
    const mainProduct = item
    productsToAdd.push({
      id: mainProduct.getAttribute("data-pid"),
      quantity : mainProduct.getAttribute("data-product-article-quantity")
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

  getSectionsToRenderInner() {
    return [
      {
        id: 'cart-drawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }
  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink)
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    this.bundleDataFetch();
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {this.classList.add('animate', 'active')});

    this.addEventListener('transitionend', () => {
      const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
      const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
      trapFocus(containerToTrapFocusOn, focusElement);
    }, { once: true });

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if(cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {
      const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
      sectionElement.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }

  
  }

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
