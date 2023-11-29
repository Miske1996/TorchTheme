class MenuDrawer extends HTMLElement {
    constructor() {
      super();
      this.menu_drawer_section_container = this.querySelector(".menu_drawer_section_container");
      this.drawer_menu_inner = this.querySelector(".drawer_menu_inner");
      this.drawer_menu_overlay = this.querySelector(".drawer_menu_overlay");
      this.close_icon_container = this.querySelector(".close_icon_container");
      this.open();
      this.close();

    }

    open(){
        document.addEventListener("DOMContentLoaded",  () => {
            let links = document.querySelectorAll(".left_menu_header_container .link_item")
            let more_button = document.querySelectorAll(".left_menu_header_container .more_button")
            console.log(links)
            console.log(more_button)
            links.forEach((link) => {
                link.addEventListener('click', () => {
                    this.menu_drawer_section_container.style.display = "flex";  
                    this.menu_drawer_section_container.style.opacity = "1";  
                    setTimeout(() => {
                        this.drawer_menu_inner.style.transform = "translateX(0)";  
                    },50);     
                })
            })
            more_button.forEach((more_btn) => {
                more_btn.addEventListener('click', () => {
                    this.menu_drawer_section_container.style.display = "flex";   
                    this.menu_drawer_section_container.style.opacity = "1";   
                    setTimeout(() => {
                        this.drawer_menu_inner.style.transform = "translateX(0)";  
                    },50);
                })
            })
          });
       
    }
     
    close(){
        this.close_icon_container.addEventListener('click',() => {
            this.drawer_menu_inner.style.transform = "translateX(-100%)";  
            this.menu_drawer_section_container.style.opacity = "0";   

            setTimeout(() => {
                this.menu_drawer_section_container.style.display = "none";   
            },500);
        })
        this.menu_drawer_section_container.addEventListener('click',() => {
            this.drawer_menu_inner.style.transform = "translateX(-100%)"; 
            this.menu_drawer_section_container.style.opacity = "0";    
            setTimeout(() => {
                this.menu_drawer_section_container.style.display = "none";   
            },500); 
        })   
    }
}
customElements.define('menu-drawer', MenuDrawer); 