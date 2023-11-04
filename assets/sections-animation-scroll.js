//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()
        this.initScroll();
    }
    initScroll(){
        this.addEventListener('scroll', () => {
            console.log("window.innerHeight: " + this.offsetHeight)
            console.log("document.documentElement.scrollTop: " + this.scrollTop)   
        });
    }
    initSectionHero(){
        let hero_button = this.querySelector(".play_video_hero_btn");
        let video_hero_element = this.querySelector(".video_container");
        let video_iframe = video_hero_element.querySelector("iframe");
        hero_button.addEventListener('click', () => {
            video_hero_element.style.display = "flex";
        })
        let remove_video_from_hero = this.querySelector(".remove_button_video_btn");
        remove_video_from_hero.addEventListener("click" , () => {
            video_iframe.src = ""
            video_hero_element.style.display = "none";
            video_iframe.src = "https://www.youtube.com/embed/WE155WwKNkk?&controls=0&loop=1&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=https%3A%2F%2Fglobal.dreametech.com%2Fproducts%2Fl20-ultra&rel=0&showinfo=1&iv_load_policy=3&modestbranding=1&customControls=false&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Fglobal.dreametech.com&widgetid=1"
        })
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);

