
//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()
        // this.initScroll();
        this.prevY = 0;
        this.isScrollingDown = true;
        this.topTop = this.getBoundingClientRect().top


        // Initialize requestAnimationFrame loop
        this.rafId = null;
        this.animateScroll = this.animateScroll.bind(this);
        this.animateScroll();
    }
    
    animateOnScroll(window_height){
        let scrollTopY = document.documentElement.scrollTop

        // 1 - FIRST SECTION DESCRIPTION SCROLL ANIMATION LOGIC
        if(scrollTopY > (this.topTop + window_height * 1.5) && scrollTopY <= (window_height * 6)){
                                
            //START SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*1.5,this.isScrollingDown,window_height * 6)
            //RESET SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY,window_height*6,this.isScrollingDown,window_height * 10)

        }else if (scrollTopY <= (this.topTop + window_height * 1.5)){
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*1.5,this.isScrollingDown,window_height * 6)
        } 

        // 2 - SECTION 2: AVAILABLE PRODUCTS SCROLL ANIMATION LOGIC
        else if(scrollTopY > (window_height * 6) && scrollTopY <= (window_height * 8)){
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*1.5,this.isScrollingDown,window_height * 6,window_height*6)
            //START SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY,window_height*6,this.isScrollingDown,window_height * 8)
            //RESET SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY,window_height*8,this.isScrollingDown,window_height * 12)
        } 

        // 3 - SECTION 3: PRODUCT FEATURES CARDS ANIMATION LOGIC
        else if(scrollTopY > (window_height * 8) && scrollTopY <= (window_height * 12)){    
        //RESET SECTION 2 ANIMATION
        this.initSectionAvailableProducts(scrollTopY,window_height*6,this.isScrollingDown,window_height * 8)
        //START SECTION 3 ANIMATION
        this.initSectionFeautresCardsProduct(scrollTopY,window_height*8,this.isScrollingDown,window_height * 12,window_height*8)
        //RESET SECTION 4 ANIMATION
        this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*12,this.isScrollingDown,window_height * 16)
        }  

        // 4 - SECTION 4: PRODUCT SPECIAL FEATURE OPENNING CIRCLE ANIMATION LOGIC
        else if(scrollTopY > (window_height * 12) && scrollTopY <= (window_height * 16)){
            //RESET SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY,window_height*8,this.isScrollingDown,window_height * 12)
            //START SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*12,this.isScrollingDown,window_height * 16)
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*16,this.isScrollingDown,window_height * 20)       
        }

        // 5 - SECTION 5 : CHANGING IMAGES FEATURE PRODUCT ANIMATION LOGIC
        else if(scrollTopY > (window_height * 16) && scrollTopY <= (window_height * 20)){
            //RESET SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*14,this.isScrollingDown,window_height * 16);
            //START SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*16,this.isScrollingDown,window_height * 20)
            //RESET SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY,window_height*20,this.isScrollingDown,window_height * 24,window_height*20)
        } 

        // 6 - SECTION 6: VERTICAL TABS FEATURES ANIMATION LOGIC
        else if( scrollTopY >= (window_height * 20) && scrollTopY <= (window_height * 24)){
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*16,this.isScrollingDown,window_height * 20)
            //START SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY,window_height*20,this.isScrollingDown,window_height * 24,window_height*20)
            //START SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY,window_height*24,this.isScrollingDown,window_height * 26)
        }

        // 7 - SECTION 7: TITLE FEATURE SECTION
        else if( scrollTopY >= (window_height * 24) && scrollTopY <= (window_height * 26)){

            //RESET SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY,window_height*20,this.isScrollingDown,window_height * 24,window_height*20)
            //START SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY,window_height*24,this.isScrollingDown,window_height * 26)

        }else if( scrollTopY > (window_height * 26)){
            //RESET SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY,window_height*24,this.isScrollingDown,window_height * 26)
        }
        
      

    }

   
    animateScroll() {
        let window_height = window.innerHeight;

        let scrollTopY = document.documentElement.scrollTop;

        // Finding the scroll direction
        if (scrollTopY > this.prevY) {
            this.prevY = scrollTopY;
            this.isScrollingDown = true;
        } else if (this.prevY > scrollTopY) {
            this.prevY = scrollTopY;
            this.isScrollingDown = false;
        }

        this.animateOnScroll(window_height);

        // Request the next frame
        this.rafId = requestAnimationFrame(this.animateScroll);
    }

    disconnectedCallback() {
        // Clean up: cancel the animation frame request
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
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

    // 1 - FIRST DESCRIPTION SECTION LOGIC
    initSectionFirstDescription(scrollTopY,startPoint,scrollDown,breakPoint){

        let first_section_container = this.querySelector(".first_description_container");

        let white_overlay_video = first_section_container.querySelector(".text_description_animation_container");
        
        let scroll_succession_text_animation = first_section_container.querySelector(".scroll_succession_text_animation_container")

        let headers_scroll_succession = scroll_succession_text_animation.querySelectorAll("h1");

        //Animations Y breaks
        

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  (breakPoint - startPoint) / 5;
        let inner_break_3 = inner_break_2 +  (breakPoint - startPoint) / 5;
        let inner_break_4 = inner_break_3 +  (breakPoint - startPoint) / 5;
        let inner_break_5 = inner_break_4 +  (breakPoint - startPoint) / 5;
        //here we move and fix the section white scrolling
        if(scrollTopY <= startPoint + this.topTop ){

            //When we go to the previous section
            white_overlay_video.style.removeProperty("transform");
            first_section_container.style.position = "relative";
            // first_section_container.style.opacity = "0";
            first_section_container.style.removeProperty("z-index");
            white_overlay_video.style.opacity = "1";

        }else if(scrollTopY >= breakPoint){ 

            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // first_section_container.style.marginTop = (breakPoint - first_section_container.offsetHeight) + "px";
            first_section_container.style.position = "relative";
            first_section_container.style.removeProperty("z-index");
            first_section_container.style.opacity = "0";



        }else{
            //Succession of scenes logic

            first_section_container.style.position = "fixed";
            first_section_container.style.removeProperty("margin");
            first_section_container.style.zIndex = "1000";
            first_section_container.style.opacity = "1";



            //End of the first animation over
            white_overlay_video.style.opacity = "0";

            

            //Start Second Animation
            if(scrollTopY >=  (inner_break_1 ) && scrollTopY < (inner_break_2)){
                //Start first animation
                white_overlay_video.style.display = "flex";
                const scaleValue = 1 + ((scrollTopY - startPoint) / (inner_break_1 / 10));
                first_section_container.style.background = "black"; 
                white_overlay_video.style.opacity = (1 - (( scrollTopY - startPoint) / (inner_break_1) ));
                white_overlay_video.style.transform = `scale(${Math.min(scaleValue, 11)})`;

                //remove 2nd animation
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "90%"; 
            }else if(scrollTopY >=  (inner_break_2) && scrollTopY < (inner_break_3)) { 
                
                
                headers_scroll_succession[0].style.top = "50%"; 
                headers_scroll_succession[0].style.opacity = "1"; 

                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "90%";  
              
            }
            else if(scrollTopY >=  (inner_break_3) && scrollTopY < (inner_break_4)) {
                
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "0%"; 

                headers_scroll_succession[1].style.top = "50%"; 
                headers_scroll_succession[1].style.opacity = "1"; 

                headers_scroll_succession[2].style.opacity = "0";
                headers_scroll_succession[2].style.top = "90%"; 
                
            }
            else if(scrollTopY >=  (inner_break_4) && scrollTopY < (inner_break_5)) {
                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "0%"; 

                headers_scroll_succession[2].style.top = "50%"; 
                headers_scroll_succession[2].style.opacity = "1"; 

                headers_scroll_succession[3].style.opacity = "0";
                headers_scroll_succession[3].style.top = "90%"; ;  
              

            }else if(scrollTopY >= inner_break_5){
                headers_scroll_succession[2].style.opacity = "0";
                headers_scroll_succession[2].style.top = "0%"; 

                headers_scroll_succession[3].style.top = "50%"; 
                headers_scroll_succession[3].style.opacity = "1";  
              
            }

        }
       
       
    }

    // 2 - AVAILABLE PRODUCTS SECTION LOGIC
    initSectionAvailableProducts(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let available_products_section = this.querySelector(".available_products_component_container");
        
        let header_title = available_products_section.querySelector("h1");
        let images_to_animate = available_products_section.querySelectorAll("img");
        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  available_products_section.offsetHeight / 4;
        let inner_break_3 = inner_break_2 +  available_products_section.offsetHeight / 4;
        let inner_break_4 = inner_break_3 +  available_products_section.offsetHeight / 4;
        if(scrollTopY <= startPoint){
            //When we go to the previous section
            available_products_section.style.removeProperty("position");
            header_title.style.transform = "translateY(30%)";
            header_title.style.opacity = "0";
            images_to_animate[0].style.opacity = "0"
            available_products_section.style.removeProperty("z-index");
            available_products_section.style.opacity = "0"

        }else if(scrollTopY >= breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // available_products_section.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            available_products_section.style.position = "relative";
            header_title.style.transform = "translateY(30%)";
            header_title.style.opacity = "0";
            available_products_section.style.removeProperty("z-index");
            available_products_section.style.opacity = "0"



        }else{
            available_products_section.style.position = "fixed"
            available_products_section.style.removeProperty("margin");
            available_products_section.style.zIndex = "1000";
            available_products_section.style.opacity = "1"

            header_title.style.opacity = "1";
            header_title.style.transform = "translateY(-30%)";
          
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                images_to_animate[0].style.opacity = "1"
                images_to_animate[1].style.opacity = "0"

            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                images_to_animate[0].style.opacity = "0"
                images_to_animate[1].style.opacity = "1"
                images_to_animate[2].style.opacity = "0"


            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
                images_to_animate[2].style.opacity = "1"
                images_to_animate[1].style.opacity = "0"
            }

        }
    }

    // 3 - PRODUCT FEATURES CARDS ANIMATION LOGIC
    initSectionFeautresCardsProduct(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
    
        let feautres_cards_product_container = this.querySelector(".product_features_cards_component_container");

        let overlay_animation_container = this.querySelector(".overlay_feature_animation_container");

        let overlay_animation_container_image_container = overlay_animation_container.querySelector(".image_container_feature");

        let text_description_overlay_feature_container = overlay_animation_container.querySelector(".text_description_overlay_feature_container");

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint)/ 4);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint)*3/8);
        let inner_break_4 = inner_break_3  + ((breakPoint - startPoint)*3/8);

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            feautres_cards_product_container.style.removeProperty("position");
            feautres_cards_product_container.style.removeProperty("zIndex");
            feautres_cards_product_container.style.opacity = "0";
            overlay_animation_container.style.display = "none";
        }else if(scrollTopY >= breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            feautres_cards_product_container.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            feautres_cards_product_container.style.position = "relative";

            feautres_cards_product_container.style.removeProperty("z-index");
            

        }else{
          
            feautres_cards_product_container.style.position = "fixed";
            feautres_cards_product_container.style.zIndex = "1000";
            feautres_cards_product_container.style.opacity = "1";
            feautres_cards_product_container.style.removeProperty("margin");

            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                

                overlay_animation_container.style.display = "flex";
                const progress = (scrollTopY - inner_break_2) / (inner_break_3 - inner_break_2);
  
                // Calculate new values based on the progress
                let newSize = 24 + (24 * progress); // Adjust as needed
                let newLeft = 9 + (39 * progress); // Adjust as needed
                let newTop = 52 - (42 * progress); // Adjust as needed
                let newTopTextContainer = 100 - (60 * progress)
                
                let mediaQuery = window.matchMedia("(max-width: 550px)");

                // Check if the media query matches
                if (mediaQuery.matches) {
                    const startSize = 64.4256;
                    const endSize = 100;
                    const startLeft = -6.30838;
                    const endLeft = 0.69162;
                    const startTop = 35.2552;
                    const endTop = 30.2552;

                    newSize = startSize + (endSize - startSize) * progress;
                    newLeft = startLeft + (endLeft - startLeft) * progress;
                    newTop = startTop + (endTop - startTop) * progress;
                }

                overlay_animation_container_image_container.style.width = newSize + "vw";
                overlay_animation_container_image_container.style.height = newSize + "vw";
                overlay_animation_container_image_container.style.left = newLeft + "%";
                overlay_animation_container_image_container.style.top = newTop + "%";
                
                if (!mediaQuery.matches) {
                    text_description_overlay_feature_container.style.top = newTopTextContainer + "%"
                }
                text_description_overlay_feature_container.style.opacity = progress;
                const opacity = 0.9 + 0.1 * progress;
                overlay_animation_container.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
                
            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
                const progress = (scrollTopY - inner_break_3) / (inner_break_4 - inner_break_3);
  
                // Calculate new values based on the progress
                let newTop = 0 - (52 * progress); // Adjust as needed

                let mediaQuery = window.matchMedia("(max-width: 550px)");

                // Check if the media query matches
                if (mediaQuery.matches) {
                    const startTop = 30.2552;
                    const endTop = 0;
                    newTop = startTop + (endTop - startTop) * progress;
                }
                overlay_animation_container_image_container.style.opacity = (1 - progress);
                overlay_animation_container_image_container.style.top = newTop + "%";
                text_description_overlay_feature_container.style.opacity = (1 - progress);
            }

        }
    }

    // 4 - SPECIAL FEATURE CIRCLE OPENNING LOGIC
    initSectionSpecialFeatureCircleOpenning(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let special_feature_openning_circle_component = this.querySelector(".special_feature_openning_circle_component");

        let openning_circle = special_feature_openning_circle_component.querySelector(".openning_circle");
        
        let text_feature_description = special_feature_openning_circle_component.querySelector(".text_feature_description")
        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint)/2);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint)/2);

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            special_feature_openning_circle_component.style.removeProperty("position");
            special_feature_openning_circle_component.style.opacity = "0";
            special_feature_openning_circle_component.style.removeProperty("z-index");


        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            special_feature_openning_circle_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            special_feature_openning_circle_component.style.position = "relative";
            special_feature_openning_circle_component.style.removeProperty("z-index");


        }else{
            special_feature_openning_circle_component.style.position = "fixed";
            special_feature_openning_circle_component.style.removeProperty("margin");
            special_feature_openning_circle_component.style.opacity = "1";
            special_feature_openning_circle_component.style.zIndex = "1000";

            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){

                const progress = (scrollTopY - inner_break_1) / (inner_break_2 - inner_break_1);

                // Calculate new values based on the progress
                let startSize = 24; // Initial size
                let endSize = 150; // Target size
                let newSize = startSize + (endSize - startSize) * progress;

                let mediaQuery = window.matchMedia("(max-width: 550px)");

                // Check if the media query matches
                if (mediaQuery.matches) {
                    endSize = 330; // Target size
                    newSize = startSize + (endSize - startSize) * progress;
                }
                openning_circle.style.width = newSize + "vw";
                openning_circle.style.height = newSize + "vw";

                text_feature_description.style.opacity = "0"

            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){

                text_feature_description.style.opacity = "1"

                text_feature_description.querySelector(".paragraph2").style.opacity = "0";
                text_feature_description.querySelector(".paragraph2").style.top = "100%";
                text_feature_description.querySelector(".paragraph1").style.top = "80%";
                text_feature_description.querySelector(".paragraph1").style.opacity = "1";

              
            }else if(scrollTopY>=inner_break_3){
                text_feature_description.querySelector(".paragraph1").style.opacity = "0";
                text_feature_description.querySelector(".paragraph1").style.top = "0";
                text_feature_description.querySelector(".paragraph2").style.opacity = "1";
                text_feature_description.querySelector(".paragraph2").style.top = "80%";
            }

        }
    }

    // 5 - 1ST CANVAS ANIMATION SPECIAL FEATURE LOGIC
     initAnimationCanvasFeatureProduct(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let animation_canvas_feature_product_component = this.querySelector(".animation_canvas_feature_product_component");

        let text_description_container = animation_canvas_feature_product_component.querySelector(".text_feature_description");
        let animation_canvas_feature_product_component_images_container = animation_canvas_feature_product_component.querySelector(".images_animations");
        let last_description_container = animation_canvas_feature_product_component.querySelector(".last_text_features_container");

        let img_to_animate = animation_canvas_feature_product_component_images_container.querySelector("img");


        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint) / 4);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint) * 3/8);
        let inner_break_4 = inner_break_3  + ((breakPoint - startPoint) * 3/8);

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            animation_canvas_feature_product_component.style.removeProperty("position");
            animation_canvas_feature_product_component.style.opacity = "0";
            animation_canvas_feature_product_component_images_container.style.opacity = "0"
            animation_canvas_feature_product_component_images_container.style.removeProperty("z-index");



        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            animation_canvas_feature_product_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_canvas_feature_product_component.style.position = "relative";    
            animation_canvas_feature_product_component_images_container.style.removeProperty("z-index");
            animation_canvas_feature_product_component.style.opacity = "0";


        }else{
            animation_canvas_feature_product_component.style.position = "fixed";
            animation_canvas_feature_product_component.style.removeProperty("margin");
            animation_canvas_feature_product_component.style.zIndex = "1000";

            animation_canvas_feature_product_component.style.opacity = "1";

            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                
                const progress = (scrollTopY - inner_break_1) / (inner_break_2 - inner_break_1);

               
                // Frame number based on the progress
                let startFrame = 1; // Initial size
                let endFrame = 40; // Target size
                let frameNumber = Math.ceil(startFrame + (endFrame - startFrame) * progress);
             
                img_to_animate.src = "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/Installmops_"+frameNumber+".webp?v=1691028939";
                animation_canvas_feature_product_component_images_container.style.opacity = "1"
                text_description_container.style.opacity = "0"

            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                const progress = (scrollTopY - inner_break_2) / (inner_break_3 - inner_break_2);
               
                let startFrame = 40; // Initial size
                let endFrame = 80; // Target size
                let frameNumber = Math.ceil(startFrame + (endFrame - startFrame) * progress);
             
                img_to_animate.src = "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/Installmops_"+frameNumber+".webp?v=1691028939";
                
                animation_canvas_feature_product_component_images_container.style.opacity = "1"
                text_description_container.style.opacity = "1"
                last_description_container.style.opacity = "0"
                last_description_container.style.transform = "scale(0)"

            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
                const progress = (scrollTopY - inner_break_3) / (inner_break_4 - inner_break_3);
                
                let startFrame = 80; // Initial size
                let endFrame = 101; // Target size
                let frameNumber = Math.ceil(startFrame + (endFrame - startFrame) * progress);
                
                img_to_animate.src = "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/Installmops_"+frameNumber+".webp?v=1691028939";
                animation_canvas_feature_product_component_images_container.style.opacity = "0"

                text_description_container.style.opacity = "0"
                last_description_container.style.opacity = "1"
                last_description_container.style.transform = "scale(1)"
            }
        }
    }

    // 6 - VERTICAL TABS FEATURES ANIMATION LOGIC 
    initVerticalTabsFeatures(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let vertical_tabs_features_component = this.querySelector(".vertical_tabs_features_component");

        let progress_bar = vertical_tabs_features_component.querySelector(".scroller_container_progress_bar");
      
        let tabs = vertical_tabs_features_component.querySelectorAll(".tab_content");

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint)/ 5);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint) / 5);
        let inner_break_4 = inner_break_3  + ((breakPoint - startPoint) / 5);
        let inner_break_5 = inner_break_4  + ((breakPoint - startPoint) / 5);
        let inner_break_6 = inner_break_5  + ((breakPoint - startPoint) / 5);

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            vertical_tabs_features_component.style.removeProperty("position");
            vertical_tabs_features_component.style.removeProperty("z-index");

            vertical_tabs_features_component.style.opacity = "0"


        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            vertical_tabs_features_component.style.position = "relative";  
            vertical_tabs_features_component.style.removeProperty("z-index");

            vertical_tabs_features_component.style.opacity = "0"
        }else{
            vertical_tabs_features_component.style.position = "fixed";
            vertical_tabs_features_component.style.removeProperty("margin");
            vertical_tabs_features_component.style.zIndex = "1000";

            vertical_tabs_features_component.style.opacity = "1";

            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                progress_bar.style.top = "0%";
                tabs[0].style.opacity = "1";
                tabs[1].style.opacity = "0";
                
            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                progress_bar.style.top = "20%";
                tabs[0].style.opacity = "0";
                tabs[1].style.opacity = "1";
                tabs[2].style.opacity = "0";
                
             
            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
                progress_bar.style.top = "40%";
                tabs[1].style.opacity = "0";
                tabs[2].style.opacity = "1";
                tabs[3].style.opacity = "0";
                
            }else if(scrollTopY>=inner_break_4 && scrollTopY < inner_break_5){
                progress_bar.style.top = "60%";
                tabs[2].style.opacity = "0";
                tabs[3].style.opacity = "1";
                tabs[4].style.opacity = "0";
                     
            }else if(scrollTopY>=inner_break_5 && scrollTopY < inner_break_6){
                progress_bar.style.top = "80%";
                tabs[3].style.opacity = "0";
                tabs[4].style.opacity = "1";
            }
        }
    }

    // 7 - TITLE FEATURE ANIMATION LOGIC 
    initTitleFeautreAnimation(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let feature_title_component = this.querySelector(".feature_title_component");


        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint)/ 1);

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            feature_title_component.style.removeProperty("position");
            feature_title_component.style.removeProperty("z-index");

            feature_title_component.style.opacity = "0"


        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            feature_title_component.style.position = "relative";  
            feature_title_component.style.removeProperty("z-index");
            feature_title_component.style.opacity = "0"
        }else{
            feature_title_component.style.position = "fixed";
            feature_title_component.style.removeProperty("margin");
            feature_title_component.style.zIndex = "1000";

            feature_title_component.style.opacity = "1";

            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
              
            }
        }
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);

