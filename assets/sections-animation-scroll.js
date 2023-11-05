//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()
        this.initScroll();
        this.prevY = 0;
        this.isScrollingDown = true;
    }

    initScroll(){
        
       

        window.addEventListener('scroll', () => {

            // 0 - Finding the scroll direction
            if(document.documentElement.scrollTop > this.prevY){
                this.prevY = document.documentElement.scrollTop;
                this.isScrollingDown = true;
            }else if( this.prevY > document.documentElement.scrollTop){
                this.prevY = document.documentElement.scrollTop;
                this.isScrollingDown = false;
            }

            // 1 - FIRST SECTION DESCRIPTION SCROLL ANIMATION LOGIC
            if(document.documentElement.scrollTop > (window.innerHeight * 1) && document.documentElement.scrollTop <= (window.innerHeight * 8)){
                this.initSectionFirstDescription(document.documentElement.scrollTop,window.innerHeight,this.isScrollingDown,window.innerHeight * 8)
            }else if (document.documentElement.scrollTop <= (window.innerHeight * 1)){
                this.initSectionFirstDescription(document.documentElement.scrollTop,window.innerHeight,this.isScrollingDown,window.innerHeight * 8)
            } else if( document.documentElement.scrollTop >= (window.innerHeight * 8)){
                this.initSectionFirstDescription(document.documentElement.scrollTop,window.innerHeight,this.isScrollingDown,window.innerHeight * 8)
            }
        });
    }

    // HERO SECTION LOGIC
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

    // FIRST DESCRIPTION SECTION LOGIC
    initSectionFirstDescription(scrollTopY,windowHeight,scrollDown,breakPoint){

        let first_section_container = this.querySelector(".first_description_container")

        let white_overlay_video = first_section_container.querySelector(".text_description_animation_container");
        
        let scroll_succession_text_animation = first_section_container.querySelector(".scroll_succession_text_animation_container")

        let headers_scroll_succession = scroll_succession_text_animation.querySelectorAll("h1");

        //Animations Y breaks
        let inner_break_1 = breakPoint / 3.2;
        let inner_break_2 = breakPoint - inner_break_1;

        //here we move and fix the section white scrolling
        if(scrollTopY <= windowHeight){

            //When we go to the previous section
            white_overlay_video.style.removeProperty("transform");
            first_section_container.style.position = "relative";

        }else if(scrollTopY >= breakPoint){ 

            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            first_section_container.style.marginTop = (breakPoint - first_section_container.offsetHeight) + "px";
            first_section_container.style.position = "relative";

        }else{
            //Succession of scenes logic

            first_section_container.style.position = "fixed";
            first_section_container.style.removeProperty("margin");

            if(scrollTopY < inner_break_1){

                //Start first animation
                white_overlay_video.style.display = "flex";
                const scaleValue = 1 + ((scrollTopY - windowHeight) / (inner_break_1 / 10));
                first_section_container.style.background = "black"; 
                white_overlay_video.style.opacity = (1 - (( scrollTopY - windowHeight) / (inner_break_1) ));
                white_overlay_video.style.transform = `scale(${Math.min(scaleValue, 11)})`;

                //remove 2nd animation
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "90%"; 

            }
            else if (scrollTopY >= inner_break_1 && scrollTopY <= inner_break_2 ){
                //End of the first animation over
                white_overlay_video.style.opacity = "0";

                const lengthOfBreaks = (inner_break_2 - inner_break_1) / headers_scroll_succession.length;

                //Start Second Animation
                if(scrollTopY >=  (inner_break_1 ) && scrollTopY < (inner_break_1 + lengthOfBreaks * 1)){
                    headers_scroll_succession[0].style.top = "50%"; 
                    headers_scroll_succession[0].style.opacity = "1"; 

                    headers_scroll_succession[1].style.opacity = "0";
                    headers_scroll_succession[1].style.top = "90%";  
                }else if(scrollTopY >=  (inner_break_1 + lengthOfBreaks * 1) && scrollTopY < (inner_break_1 + lengthOfBreaks * 2)) { 
                    
                    headers_scroll_succession[0].style.opacity = "0";
                    headers_scroll_succession[0].style.top = "0%"; 

                    headers_scroll_succession[1].style.top = "50%"; 
                    headers_scroll_succession[1].style.opacity = "1"; 

                    headers_scroll_succession[2].style.opacity = "0";
                    headers_scroll_succession[2].style.top = "90%"; 
                }
                else if(scrollTopY >=  (inner_break_1 + lengthOfBreaks * 2) && scrollTopY < (inner_break_1 + lengthOfBreaks * 3)) {
                    headers_scroll_succession[1].style.opacity = "0";
                    headers_scroll_succession[1].style.top = "0%"; 

                    headers_scroll_succession[2].style.top = "50%"; 
                    headers_scroll_succession[2].style.opacity = "1"; 

                    headers_scroll_succession[3].style.opacity = "0";
                    headers_scroll_succession[3].style.top = "90%"; ;  
                }
                else if(scrollTopY >=  (inner_break_1 + lengthOfBreaks * 3) && scrollTopY < (inner_break_1 + lengthOfBreaks * 4)) {
                    headers_scroll_succession[2].style.opacity = "0";
                    headers_scroll_succession[2].style.top = "0%"; 

                    headers_scroll_succession[3].style.top = "50%"; 
                    headers_scroll_succession[3].style.opacity = "1";  
                }

            }
        }
       
       
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);

