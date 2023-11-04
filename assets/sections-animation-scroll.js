//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()
        this.initScroll();
        this.initSectionFirstDescription();
    }

    initScroll(){
        
        let break_point_first_section_container = (window.innerHeight * 4) ;
        let first_section_container = this.querySelector(".first_description_container")
        let white_overlay_video = first_section_container.querySelector(".text_description_animation_container");
        let text_white_overlay = white_overlay_video.querySelector("h1");
        window.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > (window.innerHeight * 1) && document.documentElement.scrollTop <= (window.innerHeight * 4)){
                first_section_container.style.background = "black";
                first_section_container.style.marginTop = "calc(" + Math.min( document.documentElement.scrollTop - window.innerHeight,break_point_first_section_container) + "px - 6.74vw)";
                white_overlay_video.style.opacity = (1 - (document.documentElement.scrollTop/window.innerHeight * 8)) ;
                text_white_overlay.style.transform = "scale(" + document.documentElement.scrollTop % window.innerHeight * 5   +")"

            }else if(document.documentElement.scrollTop <= (window.innerHeight * 1)){
                first_section_container.style.marginTop = "0px"
            }

            // if(document.documentElement.scrollTop > (window.innerHeight * 4) || document.documentElement.scrollTop < window.innerHeight){
            //     first_section_container.style.position = "default"
            //     let first_section_container = this.querySelector(".first_description_container")
            //     first_section_container.style.background = "black";

            // }
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
    initSectionFirstDescription(){
        
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);

