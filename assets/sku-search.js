class SKUProduct extends HTMLElement {
    constructor() {
      super();
      
      const skuProductArticle = document.querySelector('.skuProductArticle[type="application/json"]');
      const skuData = JSON.parse(skuProductArticle.innerText)[0];
      var productAjaxURL = '?type=product&q=variants.sku:' + skuData + '&section_id=main-article';
      console.log(window.location.pathname);
      fetch(`/search${productAjaxURL}`)
          .then((response) => response.text())
          .then(async (responseText) => {
            //   console.log(responseText);
              const html = new DOMParser().parseFromString(responseText, 'text/html');
      
              // Render the main-article section dynamically
              const mainArticleContainer = document.querySelector('.main-article-container'); // Replace with the actual container selector
              if (mainArticleContainer) {
                  mainArticleContainer.innerHTML = html.querySelector('.shopify-section.section').innerHTML;
              }
          })
          .catch((e) => {
              console.log(e);
              throw e;
          })
          .finally(() => {
              // Any cleanup or additional actions after fetching
          });
    }
    
}
customElements.define('sku-product', SKUProduct)

