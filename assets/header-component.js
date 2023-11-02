//HERE IS THE LOGIC OF A SWATCH OF A PROCUT IN A COLLECTION 
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.menu_opened = false;
        this.menu = this.querySelector(".navigation_container");
        this.open();
        this.close();

    }
    open() {
        let menu_dropdown_button = this.querySelector(".dropdown_menu_logo_container");
        menu_dropdown_button.addEventListener('click', () => {
            if (!this.menu_opened) {
                this.menu.style.display = "flex"
                document.body.style.overflow = "hidden";
                this.menu_opened = true;
            } else {
                this.menu.style.display = "none"
                document.body.style.overflow = "scroll";
                this.menu_opened = false;
            }

        })
    }
    close() {
        let close_button = this.querySelector(".close_container");
        close_button.addEventListener('click', () => {
            this.menu.style.display = "none"
            document.body.style.overflow = "scroll";
            this.menu_opened = false;
        })

    }
}
customElements.define('header-component', HeaderComponent);