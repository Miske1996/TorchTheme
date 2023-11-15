
//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()


        // //Scroll behavior
        // this.scrollSpeedFactor = 0.2;
        // this.lastScrollTop = window.scrollY;
        // this.lastTimestamp = performance.now();

        // // Bind the handleWheel method to the current instance
        // this.handleWheel = this.handleWheel.bind(this);

        // // Add the wheel event listener to the window
        // window.addEventListener('wheel', this.handleWheel);


        // this.initScroll();
        this.prevY = 0;
        this.isScrollingDown = true;
        window.scrollTo(0, 0);
        this.topTop = this.getBoundingClientRect().top
        
        //Animation Canvas 1 
        this.check_animation_1 = false
        //Animation Canvas 2
        this.animation_frame_canvas1 = 1;
        this.animations_sequences_canvas1 = [
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/tmwhite_",
                "link_end": ".webp?v=1691663754",
                "frameRate": 15,
                "startFrame": 1,
                "endFrame": 7,
                "isStartedForward": false,
                "isStartedBackward": false,
                "scrollDown":true
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/tmwhite_",
                "link_end": ".webp?v=1691663754",
                "frameRate": 12,
                "startFrame": 7,
                "endFrame": 11,
                "isStarted": false,
                "scrollDown":true
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/tmwhite_",
                "link_end": ".webp?v=1691663754",
                "frameRate": 20,
                "startFrame": 11,
                "endFrame": 26,
                "isStarted": false,
                "scrollDown":true

            },
        ]
        //Animation Canvas 3 roatating 
        this.animation_frame_canvas_rotating = 1;
        this.animations_sequences_canvas_rotating = [
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 35,
                "startFrame": 1,
                "endFrame": 13,
                "isStartedForward": false,
                "isStartedBackward": false,
                "scrollDown":true
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 35,
                "startFrame": 13,
                "endFrame": 28,
                "isStarted": false,
                "scrollDown":true
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 35,
                "startFrame": 28,
                "endFrame": 101,
                "isStarted": false,
                "scrollDown":true

            },
        ]
        //Aimation Canvas Rotating Logic
        this.initAnimationCanvasRotatingLogic()
        //Animation Ai Action Logic
        this.initAnimationAiActionLogic()
        //Animation Ojects identified horizontal Scroll
        this.initAnimationSectionIndentifiedLogic();
        // Initialize requestAnimationFrame loop
        this.rafId = null;
        this.animateScroll = this.animateScroll.bind(this);
        
        this.animateScroll();
        //Last Vertical Tabs 
        this.lastVerticalTabs();
        // Last Section initiate
        this.isScrollingDownLastSection = true;
        this.prevYLastSection = 0
        this.initiateLastSectionScroll();
             
    }
    
    handleWheel(event) {
        // event.preventDefault();

        const deltaY = event.deltaY;
        const timestamp = performance.now();
        const timeDiff = timestamp - this.lastTimestamp;

        const newScrollTop = window.scrollY + deltaY * this.scrollSpeedFactor;

        window.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
        });

        this.lastScrollTop = newScrollTop;
        this.lastTimestamp = timestamp;
    }

    // Clean up the event listener when the instance is no longer needed
    destroy() {
        window.removeEventListener('wheel', this.handleWheel);
    }
    animateOnScroll(window_height){
        let scrollTopY = document.documentElement.scrollTop

        // 1 - FIRST SECTION DESCRIPTION SCROLL ANIMATION LOGIC
        if(scrollTopY > (this.topTop + window_height * 0.75) && scrollTopY <= (window_height * 6)){
                                
            //START SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*0.75,this.isScrollingDown,window_height * 6)
            //RESET SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY,window_height*6,this.isScrollingDown,window_height * 10)

        }else if (scrollTopY <= (this.topTop + window_height * 0.75)){
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*0.75,this.isScrollingDown,window_height * 6)
        } 

        // 2 - SECTION 2: AVAILABLE PRODUCTS SCROLL ANIMATION LOGIC
        else if(scrollTopY > (window_height * 6) && scrollTopY <= (window_height * 8)){
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY,window_height*0.75,this.isScrollingDown,window_height * 6,window_height*6)
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
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*12,this.isScrollingDown,window_height * 17)
        }  

        // 4 - SECTION 4: PRODUCT SPECIAL FEATURE OPENNING CIRCLE ANIMATION LOGIC
        else if(scrollTopY > (window_height * 12) && scrollTopY <= (window_height * 17)){
            //RESET SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY,window_height*8,this.isScrollingDown,window_height * 12)
            //START SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*12,this.isScrollingDown,window_height * 17)
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*17,this.isScrollingDown,window_height * 20)       
        }

        // 5 - SECTION 5 : CHANGING IMAGES FEATURE PRODUCT ANIMATION LOGIC
        else if(scrollTopY > (window_height * 17) && scrollTopY <= (window_height * 20)){
            //RESET SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY,window_height*14,this.isScrollingDown,window_height * 17);
            //START SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*17,this.isScrollingDown,window_height * 20)
            //RESET SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY,window_height*20,this.isScrollingDown,window_height * 24,window_height*20)
        } 

        // 6 - SECTION 6: VERTICAL TABS FEATURES ANIMATION LOGIC
        else if( scrollTopY >= (window_height * 20) && scrollTopY <= (window_height * 24)){
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY,window_height*17,this.isScrollingDown,window_height * 20)
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
            //RESET SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY,window_height*26,this.isScrollingDown,window_height * 29)

        }

        // 8 - SECTION 8: ANIMATION CANVAS WITH TITLE SECTION
        else if( scrollTopY >= (window_height * 26) && scrollTopY <= (window_height * 29)){

            //RESET SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY,window_height*24,this.isScrollingDown,window_height * 26)
            //START SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY,window_height*26,this.isScrollingDown,window_height * 29)
            //START SECTION 9 ANIMATION
            this.initAnimationCanvasRotating(scrollTopY,window_height*29,this.isScrollingDown,window_height * 32)

        }

         // 9 - SECTION 9: ANIMATION CANVAS WITH ROTATION
         else if( scrollTopY >= (window_height * 29) && scrollTopY <= (window_height * 32)){

            //START SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY,window_height*26,this.isScrollingDown,window_height * 29)
            //START SECTION 9 ANIMATION
            this.initAnimationCanvasRotating(scrollTopY,window_height*29,this.isScrollingDown,window_height * 32)
            //RESET SECTION 10 ANIMATION
            this.initAnimationSectionIndentified(scrollTopY,window_height*32,this.isScrollingDown,window_height * 32.5)
        }

        // 10 - SECTION 10: ANIMATION OBJECT IDENTIFIED
        else if( scrollTopY >= (window_height * 32) && scrollTopY <= (window_height * 32.5)){
            //RESET SECTION 9 ANIMATION
           this.initAnimationCanvasRotating(scrollTopY,window_height*29,this.isScrollingDown,window_height * 32)
            //START SECTION 10 ANIMATION
            this.initAnimationSectionIndentified(scrollTopY,window_height*32,this.isScrollingDown,window_height * 32.5)
            //RESET SECTION 11 ANIMATION
            this.initAnimationAiAction(scrollTopY,window_height*32.5,this.isScrollingDown,window_height * 33.3)
        }

        // 11 - SECTION 11: ANIMATION AI ACTION
        else if( scrollTopY >= (window_height * 32.5) && scrollTopY <= (window_height * 33.3)){
            //START SECTION 10 ANIMATION
            this.initAnimationSectionIndentified(scrollTopY,window_height*32,this.isScrollingDown,window_height * 32.5)
            //START SECTION 11 ANIMATION
            this.initAnimationAiAction(scrollTopY,window_height*32.5,this.isScrollingDown,window_height * 33.3)
            //RESET SECTION 12 ANIMATION
            this.initAnimationPathFinder(scrollTopY,window_height*33.3,this.isScrollingDown,window_height * 33.9)
        }

        // 12 - SECTION 12: ANIMATION PATH FINDER
        else if( scrollTopY >= (window_height * 33.3) && scrollTopY <= (window_height * 33.9)){
            //START SECTION 11 ANIMATION
            this.initAnimationAiAction(scrollTopY,window_height*32.5,this.isScrollingDown,window_height * 33.3)
            //START SECTION 12 ANIMATION
            this.initAnimationPathFinder(scrollTopY,window_height*33,this.isScrollingDown,window_height * 33.9)
             //START SECTION 13 ANIMATION
             this.initLastVerticalTabs(scrollTopY,window_height*33.9,this.isScrollingDown,window_height * 35)
        }

        // 13 - SECTION 13: LAST VERTICAL TABS
        else if( scrollTopY >= (window_height * 33.9) && scrollTopY <= (window_height * 35)){
            //RESET SECTION 12 ANIMATION
            this.initAnimationPathFinder(scrollTopY,window_height*33,this.isScrollingDown,window_height * 33.9)
            //START SECTION 13 ANIMATION
            this.initLastVerticalTabs(scrollTopY,window_height*33.9,this.isScrollingDown,window_height * 35)
            //RESET SECTION 14 ANIMATION
            this.initLastSection(scrollTopY,window_height*35,this.isScrollingDown,window_height * 36.2)
        }

        // 14 - SECTION 13: LAST SECTION
        else if( scrollTopY >= (window_height * 35) && scrollTopY <= (window_height * 36.2)){
            //RESET SECTION 13 ANIMATION
            this.initLastVerticalTabs(scrollTopY,window_height*33.9,this.isScrollingDown,window_height * 35)
            //START SECTION 14 ANIMATION
            this.initLastSection(scrollTopY,window_height*35,this.isScrollingDown,window_height * 36.2)
        
        }else if( scrollTopY > (window_height * 36.2)){
            //START SECTION 14 ANIMATION
            this.initLastSection(scrollTopY,window_height*35,this.isScrollingDown,window_height * 36.2)
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
        let inner_break_6 = inner_break_5 +  (breakPoint - startPoint) / 5;
        //here we move and fix the section white scrolling
        if(scrollTopY <= startPoint + this.topTop ){
            
            //When we go to the previous section
            white_overlay_video.style.removeProperty("transform");
            first_section_container.style.position = "relative";
            // first_section_container.style.opacity = "0";
            first_section_container.style.removeProperty("z-index");
            white_overlay_video.style.opacity = "1";
            headers_scroll_succession[0].style.opacity = "0";
            headers_scroll_succession[0].style.top = "90%"; 
            //End of the first animation over
            // white_overlay_video.style.opacity = "0";
        }else if(scrollTopY >= breakPoint){ 

            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // first_section_container.style.marginTop = (breakPoint - first_section_container.offsetHeight) + "px";
            first_section_container.style.position = "relative";
            first_section_container.style.removeProperty("z-index");
            first_section_container.style.opacity = "0";



        }else{
         

            first_section_container.style.position = "fixed";
            first_section_container.style.removeProperty("margin");
            first_section_container.style.zIndex = "1000";
            first_section_container.style.opacity = "1";



            

            

            //Start Second Animation
            if(scrollTopY >=  (inner_break_1 ) && scrollTopY < (inner_break_2)){
                
            }else if(scrollTopY >=  (inner_break_2) && scrollTopY < (inner_break_3)) { 
                
                
                //Start first animation
                white_overlay_video.style.display = "flex";
                const progress = (scrollTopY - inner_break_2) / (inner_break_3 - inner_break_2);
  
                // Calculate new values based on the progress
                let newScale = 1 + (11 * progress); // Adjust as needed
                let newOpacity = 1 - (progress); // Adjust as needed

                const scaleValue = 1 + ((scrollTopY - startPoint) / (inner_break_1 / 10));
                first_section_container.style.background = "black"; 
                white_overlay_video.style.opacity = `${newOpacity}`;
                white_overlay_video.style.transform = `scale(${newScale})`;
                //remove 2nd animation
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "90%";  
              
            }
            else if(scrollTopY >=  (inner_break_3) && scrollTopY < (inner_break_4)) {
                
                white_overlay_video.style.opacity = `0`;


                headers_scroll_succession[0].style.top = "50%"; 
                headers_scroll_succession[0].style.opacity = "1"; 

                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "90%";  
                
            }
            else if(scrollTopY >=  (inner_break_4) && scrollTopY < (inner_break_5)) {
                
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "0%"; 

                headers_scroll_succession[1].style.top = "50%"; 
                headers_scroll_succession[1].style.opacity = "1"; 

                headers_scroll_succession[2].style.opacity = "0";
                headers_scroll_succession[2].style.top = "90%"; 

            }else if(scrollTopY >= inner_break_5 && scrollTopY < (inner_break_6) ){
                
                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "0%"; 

                headers_scroll_succession[2].style.top = "50%"; 
                headers_scroll_succession[2].style.opacity = "1"; 

                headers_scroll_succession[3].style.opacity = "0";
                headers_scroll_succession[3].style.top = "90%"; 
            }else if(scrollTopY >= inner_break_6){
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
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint)/ 3);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint)/3);
        let inner_break_4 = inner_break_3  + ((breakPoint - startPoint)/3);

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
                overlay_animation_container.style.display = "none";
              
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
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint)/3);
        let inner_break_3 = inner_break_2  + ((breakPoint - startPoint)/3);
        let inner_break_4 = inner_break_3  + ((breakPoint - startPoint)/3);

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

              
            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
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

        let canvas = animation_canvas_feature_product_component.querySelector("canvas");
        let ctx = canvas.getContext("2d")

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

            this.check_animation_1 = false;
            
            


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
                  
                if(!this.check_animation_1){

                    const imageCount = 101;  // Number of images in the sequence
                    let currentFrame = 1;
                    
                    const frameRate = 40; 
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/Installmops_${currentFrame}.webp?v=1691028939`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/Installmops_${currentFrame}.webp?v=1691028939`;
                            
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
            
                                currentFrame++;
                                if (currentFrame > imageCount) {
                                    text_description_container.style.opacity = "1"

                                    return
                                    // currentFrame = 1;
                                }
            
                                setTimeout(loadNextFrame, 1000 / frameRate);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        this.check_animation_1 = true;
                    };
                    
                }
             
                animation_canvas_feature_product_component_images_container.style.opacity = "1"

            }else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                
                
                animation_canvas_feature_product_component_images_container.style.opacity = "1"
                text_description_container.style.opacity = "1"
                last_description_container.style.opacity = "0"
                last_description_container.style.transform = "scale(0)"

            }else if(scrollTopY>=inner_break_3 && scrollTopY < inner_break_4){
            
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
        let inner_break_2 = inner_break_1 +  ((breakPoint - startPoint)/ 2);
        let inner_break_3 = inner_break_2 +  ((breakPoint - startPoint)/ 2);

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

    // 8 - ANIMATION CANVAS WITH TITLE
    initAnimationCanvasWithTitle(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){

        let animation_canvas_with_title = this.querySelector(".animation_canvas_with_title");
        
        let title_behind_canvas = animation_canvas_with_title.querySelector(".title_behind_canvas");
        let bottom_description = animation_canvas_with_title.querySelector(".bottom_description");

        let canvas_layout_desc_1 = animation_canvas_with_title.querySelector(".canvas_layout_desc_1");
        let canvas_layout_desc_1_span = canvas_layout_desc_1.querySelector("span");
        let canvas_layout_desc_2 = animation_canvas_with_title.querySelector(".canvas_layout_desc_2");                  
        let canvas_layout_desc_2_span = canvas_layout_desc_2.querySelector("span");
        let canvas_layout_desc_3 = animation_canvas_with_title.querySelector(".canvas_layout_desc_3");                  
        let canvas_layout_desc_3_span = canvas_layout_desc_3.querySelector("span");
        let canvas_layout_desc_4 = animation_canvas_with_title.querySelector(".canvas_layout_desc_4");                  
        let canvas_layout_desc_4_span = canvas_layout_desc_4.querySelector("span");

        let canvas = animation_canvas_with_title.querySelector("canvas")
        let ctx = canvas.getContext("2d")       

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  300;
        let inner_break_3 = inner_break_2 +  600;
        let inner_break_4 = inner_break_3 +  600;
        let inner_break_5 = inner_break_4 +  600;

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            animation_canvas_with_title.style.removeProperty("position");
            animation_canvas_with_title.style.removeProperty("z-index");

            animation_canvas_with_title.style.opacity = "0"

           

        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_canvas_with_title.style.position = "relative";  
            animation_canvas_with_title.style.removeProperty("z-index");
            animation_canvas_with_title.style.opacity = "0";

            canvas_layout_desc_3.style.opacity = "0";
            canvas_layout_desc_4.style.opacity = "0";
            // canvas_layout_desc_3_span.style.paddingLeft = "0"
            // canvas_layout_desc_4_span.style.paddingRight = "0";
            
        }else{
            animation_canvas_with_title.style.position = "fixed";
            animation_canvas_with_title.style.removeProperty("margin");
            animation_canvas_with_title.style.zIndex = "1000";

            animation_canvas_with_title.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){

                const image = new Image();
              
                
                let currentFrame = 1;
                const imagePrefix = 'tmwhite_';
                image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.width = image.width;
                    ctx.height = image.height;
                    ctx.clearRect(0, 0, ctx.width, ctx.height);
                    ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                }
                this.animations_sequences_canvas1[0]["isStartedForward"] = false
                this.animation_frame_canvas1 = 1
                //reset bottom desc
                bottom_description.style.opacity = "0"
                bottom_description.style.bottom = "3%"
                //reset behind title animation
                title_behind_canvas.style.opacity = "0";
                title_behind_canvas.style.bottom = "20%";
                title_behind_canvas.style.transform = "scale(.7)";
                title_behind_canvas.style.color = "#4c4c4c";
            }
            else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3 ){
                //reset next anim desc 
                canvas_layout_desc_1.style.opacity = "0";
                canvas_layout_desc_2.style.opacity = "0";
                // canvas_layout_desc_1_span.style.paddingLeft = "0"
                // canvas_layout_desc_2_span.style.paddingRight = "0";

                this.animations_sequences_canvas1[0]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas1[0]["isStartedForward"] && this.animations_sequences_canvas1[0]["scrollDown"]){ 
                     
                    this.animations_sequences_canvas1[0]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[0]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[0]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[0]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[0]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                this.animation_frame_canvas1++;
                             
                                if(!this.animations_sequences_canvas1[0]["scrollDown"]){
                                    
                                    return
                                }
                                if (this.animation_frame_canvas1 > this.animations_sequences_canvas1[0]["endFrame"]) {
                                    
                                 


                                    return
                                }
            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas1[0]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                     //behind title animation
                    title_behind_canvas.style.opacity = "1";
                    let mediaQuery = window.matchMedia("(max-width: 550px)");
                    title_behind_canvas.style.bottom = "10%";
                    // Check if the media query matches
                    if (mediaQuery.matches) {
                        title_behind_canvas.style.bottom = "70%";
                    }
                    title_behind_canvas.style.transform = "scale(1)";
                    title_behind_canvas.style.color = "white";
                    this.animations_sequences_canvas1[0]["scrollDown"] = scrollDown;
                    //bottom desc
                    bottom_description.style.opacity = "1"
                    bottom_description.style.bottom = "10%"
                    if (mediaQuery.matches) {
                        bottom_description.style.bottom = "24%";
                    }
                }

                if (!this.animations_sequences_canvas1[0]["scrollDown"] &&  !this.animations_sequences_canvas1[0]["isStartedBackward"]){
                    
                 
                    this.animations_sequences_canvas1[0]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[0]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[0]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[0]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[0]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas1--;

                                if(this.animations_sequences_canvas1[0]["scrollDown"]){
                                    this.animation_frame_canvas1++
                                    return
                                }
                                if (this.animation_frame_canvas1 < this.animations_sequences_canvas1[0]["startFrame"]) {
                                    this.animation_frame_canvas1++

                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas1[0]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    //reset bottom desc
                    bottom_description.style.opacity = "0"
                    bottom_description.style.bottom = "3%"
                    //reset behind title animation
                    title_behind_canvas.style.opacity = "0";
                    title_behind_canvas.style.bottom = "20%";
                    title_behind_canvas.style.transform = "scale(.7)";
                    title_behind_canvas.style.color = "#4c4c4c";
                }
                this.animations_sequences_canvas1[1]["isStartedForward"] = false;
                // this.animations_sequences_canvas1[1]["isStartedBackward"] = false;
            }
            else if ( scrollTopY >= inner_break_3 && scrollTopY < inner_break_4){
                //reset next anim desc
                canvas_layout_desc_3.style.opacity = "0";
                canvas_layout_desc_4.style.opacity = "0";
                // canvas_layout_desc_3_span.style.paddingLeft = "0"
                // canvas_layout_desc_4_span.style.paddingRight = "0";
                //reset bottom desc
                bottom_description.style.opacity = "0"
                bottom_description.style.bottom = "3%"
                //reset behind title animation
                title_behind_canvas.style.opacity = "0";
                title_behind_canvas.style.bottom = "20%";
                title_behind_canvas.style.transform = "scale(.7)";
                title_behind_canvas.style.color = "#4c4c4c";

                this.animations_sequences_canvas1[2]["isStartedBackward"] = false;

                // this.animations_sequences_canvas1[0]["isStartedForward"] = false;
                this.animations_sequences_canvas1[0]["isStartedBackward"] = false;

                this.animations_sequences_canvas1[1]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas1[1]["isStartedForward"] && this.animations_sequences_canvas1[1]["scrollDown"]){ 
         
                    this.animations_sequences_canvas1[1]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[1]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[1]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[1]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[1]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                this.animation_frame_canvas1++;

                                if(!this.animations_sequences_canvas1[1]["scrollDown"]){
                                    
                                    return
                                }
                                if (this.animation_frame_canvas1 > this.animations_sequences_canvas1[1]["endFrame"]) {
                                    
                             

                                    canvas_layout_desc_1.style.opacity = "1";
                                    canvas_layout_desc_2.style.opacity = "1";
                                    // canvas_layout_desc_1_span.style.paddingLeft = "7vw"
                                    // canvas_layout_desc_2_span.style.paddingRight = "22vw";
                                    return
                                }
            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas1[1]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                    
                }
                if (!this.animations_sequences_canvas1[1]["scrollDown"] &&  !this.animations_sequences_canvas1[1]["isStartedBackward"]){
                    
                    this.animations_sequences_canvas1[1]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[1]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[1]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[1]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[1]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas1--;
                                if(this.animations_sequences_canvas1[1]["scrollDown"]){
                                    
                                    return
                                }
                                if (this.animation_frame_canvas1 < this.animations_sequences_canvas1[1]["startFrame"]) {
                                  
                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas1[1]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        
                    
                    };
                    
               
            }
            }
            else if ( scrollTopY >= inner_break_4 && scrollTopY < inner_break_5){
                canvas_layout_desc_1.style.opacity = "0";
                canvas_layout_desc_2.style.opacity = "0";
                // canvas_layout_desc_1_span.style.paddingLeft = "0"
                // canvas_layout_desc_2_span.style.paddingRight = "0";

                // this.animations_sequences_canvas1[0]["isStartedForward"] = false;
                this.animations_sequences_canvas1[1]["isStartedBackward"] = false;

                this.animations_sequences_canvas1[2]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas1[2]["isStartedForward"] && this.animations_sequences_canvas1[2]["scrollDown"]){ 
                     
                    this.animations_sequences_canvas1[2]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[2]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[2]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[2]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[2]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                
                            

                                if(!this.animations_sequences_canvas1[2]["scrollDown"]){
                                    this.animations_sequences_canvas1[2]["isStartedBackward"] = false;
                                    
                                    return
                                }
                                this.animation_frame_canvas1++;

                                if (this.animation_frame_canvas1 > this.animations_sequences_canvas1[2]["endFrame"] ) {
                                    this.animation_frame_canvas1--
                                  
                                    this.animations_sequences_canvas1[2]["isStartedBackward"] = false;
                                    canvas_layout_desc_3.style.opacity = "1";
                                    canvas_layout_desc_4.style.opacity = "1";
                                    // canvas_layout_desc_3_span.style.paddingLeft = "14vw"
                                    // canvas_layout_desc_4_span.style.paddingRight = "22vw";
                                    return
                                }

            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas1[2]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                    
                }
                if (!this.animations_sequences_canvas1[2]["scrollDown"] &&  !this.animations_sequences_canvas1[2]["isStartedBackward"]){
                  
                    this.animations_sequences_canvas1[2]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas1[2]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[2]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas1[2]["link_begin"] + this.animation_frame_canvas1 + this.animations_sequences_canvas1[2]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas1--;

                                if(this.animations_sequences_canvas1[2]["scrollDown"]){
                                    this.animations_sequences_canvas1[2]["isStartedForward"] = false;
                                    return
                                }
                                if (this.animation_frame_canvas1 < this.animations_sequences_canvas1[2]["startFrame"]) {
                                 
                                    this.animations_sequences_canvas1[2]["isStartedForward"] = false;
                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas1[2]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
               
            }
            }
        }
    }

    // 9 - ANIMATION CANVAS WITH ROTATION
    initAnimationCanvasRotating(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){

        let animation_rotation_canvas = this.querySelector(".animation_rotation_canvas");
        let description_text = animation_rotation_canvas.querySelector(".description_text");
        let behind_title = animation_rotation_canvas.querySelector(".behind_title");
        let behind_title_span1 = animation_rotation_canvas.querySelector(".span1")
        let behind_title_span2 = animation_rotation_canvas.querySelector(".span2")
        let button_container = animation_rotation_canvas.querySelector(".button_container")

        let canvas = animation_rotation_canvas.querySelector("canvas")
        let ctx = canvas.getContext("2d")

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  300;
        let inner_break_3 = inner_break_2 +  600;
        let inner_break_4 = inner_break_3 +  600;
        let inner_break_5 = inner_break_4 +  600;
        let inner_break_6 = inner_break_5 +  600;
        let inner_break_7 = inner_break_6 +  600;
        // let inner_break_6 = inner_break_5 +  ((breakPoint - startPoint)* ((1 - 1/8)/4));

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            animation_rotation_canvas.style.removeProperty("position");
            animation_rotation_canvas.style.removeProperty("z-index");

            animation_rotation_canvas.style.opacity = "0"
            this.animation_frame_canvas_rotating = 1;
            // this.animations_sequences_canvas_rotating[0]["isStartedForward"] = false;
            this.animations_sequences_canvas_rotating[0]["isStartedForward"] = false;
            this.animations_sequences_canvas_rotating[0]["isStartedBackward"] = false;
            behind_title_span1.style.paddingRight = "0%"
            behind_title_span2.style.paddingLeft = "0%"
            behind_title.style.opacity = "1"
            
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_rotation_canvas.style.position = "relative";  
            animation_rotation_canvas.style.removeProperty("z-index");
            animation_rotation_canvas.style.opacity = "0"
            
        }else{
            animation_rotation_canvas.style.position = "fixed";
            animation_rotation_canvas.style.removeProperty("margin");
            animation_rotation_canvas.style.zIndex = "1000";

            animation_rotation_canvas.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                

                const image = new Image();
              
                
                let currentFrame = 1;
                const imagePrefix = 'cxtbimage_';
                image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691735083`;
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.width = image.width;
                    ctx.height = image.height;
                    ctx.clearRect(0, 0, ctx.width, ctx.height);
                    ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                }
                
                
            }
            else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3 ){
               
                this.animations_sequences_canvas_rotating[0]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas_rotating[0]["isStartedForward"] && this.animations_sequences_canvas_rotating[0]["scrollDown"]){ 
                     
                    this.animations_sequences_canvas_rotating[0]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[0]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[0]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[0]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[0]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                this.animation_frame_canvas_rotating++;


                                if(!this.animations_sequences_canvas_rotating[0]["scrollDown"]){
                                   
                                    return
                                }
                                if (this.animation_frame_canvas_rotating > this.animations_sequences_canvas_rotating[0]["endFrame"]) {
                                    behind_title_span1.style.paddingRight = "18%"
                                    behind_title_span2.style.paddingLeft = "8%"
                                    let mediaQuery = window.matchMedia("(max-width: 550px)");

                                    // Check if the media query matches
                                    if (mediaQuery.matches) {
                                        behind_title.style.transform = "translateY(-350%)";
                                        behind_title_span1.style.paddingRight = "5%"
                                        behind_title_span2.style.paddingLeft = "0%"
                                    }

                                    


                                    return
                                }
            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas_rotating[0]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                    
                }
                if (!this.animations_sequences_canvas_rotating[0]["scrollDown"] &&  !this.animations_sequences_canvas_rotating[0]["isStartedBackward"]){
                 
                    this.animations_sequences_canvas_rotating[0]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[0]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[0]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[0]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[0]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas_rotating--;

                                if(this.animations_sequences_canvas_rotating[0]["scrollDown"]){
                                    this.animation_frame_canvas_rotating++
                                    return
                                }
                                if (this.animation_frame_canvas_rotating < this.animations_sequences_canvas_rotating[0]["startFrame"]) {
                                    this.animation_frame_canvas_rotating++
                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating[0]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                }
                this.animations_sequences_canvas_rotating[1]["isStartedForward"] = false;
                // this.animations_sequences_canvas_rotating[1]["isStartedBackward"] = false;
            }
            else if ( scrollTopY >= inner_break_3 && scrollTopY < inner_break_4){
                button_container.style.opacity = "0";
                description_text.style.opacity = "0";
                behind_title.style.opacity = "0"
                this.animations_sequences_canvas_rotating[2]["isStartedBackward"] = false;

                // this.animations_sequences_canvas_rotating[0]["isStartedForward"] = false;
                this.animations_sequences_canvas_rotating[0]["isStartedBackward"] = false;

                this.animations_sequences_canvas_rotating[1]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas_rotating[1]["isStartedForward"] && this.animations_sequences_canvas_rotating[1]["scrollDown"]){ 
                  
                    this.animations_sequences_canvas_rotating[1]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[1]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[1]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[1]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[1]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                this.animation_frame_canvas_rotating++;

                                if(!this.animations_sequences_canvas_rotating[1]["scrollDown"]){
                                    
                                    return
                                }
                                if (this.animation_frame_canvas_rotating > this.animations_sequences_canvas_rotating[1]["endFrame"]) {
                                    
                        


                                    return
                                }
            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas_rotating[1]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                    
                }
                if (!this.animations_sequences_canvas_rotating[1]["scrollDown"] &&  !this.animations_sequences_canvas_rotating[1]["isStartedBackward"]){
               
                    description_text.style.opacity = "0";
                    this.animations_sequences_canvas_rotating[1]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[1]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[1]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[1]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[1]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas_rotating--;

                                if(this.animations_sequences_canvas_rotating[1]["scrollDown"]){
                                    
                                    return
                                }
                                if (this.animation_frame_canvas_rotating < this.animations_sequences_canvas_rotating[1]["startFrame"]) {
                                  
                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating[1]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
               
            }
            }
            else if ( scrollTopY >= inner_break_4 && scrollTopY < inner_break_5){
               

                // this.animations_sequences_canvas_rotating[0]["isStartedForward"] = false;
                this.animations_sequences_canvas_rotating[1]["isStartedBackward"] = false;

                this.animations_sequences_canvas_rotating[2]["scrollDown"] = scrollDown;
                // ANIMATION 1 START FORWARD
                if(!this.animations_sequences_canvas_rotating[2]["isStartedForward"] && this.animations_sequences_canvas_rotating[2]["scrollDown"]){ 
                  
                    this.animations_sequences_canvas_rotating[2]["isStartedForward"] = true;
                        
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[2]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[2]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[2]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[2]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
               

                                if(!this.animations_sequences_canvas_rotating[2]["scrollDown"]){
                                    this.animations_sequences_canvas_rotating[2]["isStartedBackward"] = false;
                                    
                                    return
                                }
                                this.animation_frame_canvas_rotating++;

                                if (this.animation_frame_canvas_rotating > this.animations_sequences_canvas_rotating[2]["endFrame"] ) {
                                    description_text.style.opacity = "1";
                                    this.animation_frame_canvas_rotating--
                            
                                    this.animations_sequences_canvas_rotating[2]["isStartedBackward"] = false;
                                    button_container.style.opacity = "1";

                                    return
                                }

            
                                setTimeout(loadNextFrame, 750 / this.animations_sequences_canvas_rotating[2]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
                    
                }
                if (!this.animations_sequences_canvas_rotating[2]["scrollDown"] &&  !this.animations_sequences_canvas_rotating[2]["isStartedBackward"]){
             
                    this.animations_sequences_canvas_rotating[2]["isStartedBackward"] = true;
                    const image = new Image();
                    image.src = this.animations_sequences_canvas_rotating[2]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[2]["link_end"]
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;
        
                        const  loadNextFrame = () => {
                            image.src = this.animations_sequences_canvas_rotating[2]["link_begin"] + this.animation_frame_canvas_rotating + this.animations_sequences_canvas_rotating[2]["link_end"]
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
                                

                           
                                this.animation_frame_canvas_rotating--;
                                if(this.animations_sequences_canvas_rotating[2]["scrollDown"]){
                                    this.animations_sequences_canvas_rotating[2]["isStartedForward"] = false;
                                    return
                                }
                                if (this.animation_frame_canvas_rotating < this.animations_sequences_canvas_rotating[2]["startFrame"]) {
                                   
                              
                                    this.animations_sequences_canvas_rotating[2]["isStartedForward"] = false;
                                    return
                                }

            
                                setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating[2]["frameRate"]);  // Adjust the delay for the desired frame rate
                            };
                        }
            
                        loadNextFrame();
                        

                    };
                    
               
            }
            }
        }
    }
    initAnimationCanvasRotatingLogic(){
        let animation_rotation_canvas = this.querySelector(".animation_rotation_canvas");
        let button = animation_rotation_canvas.querySelector(".img_click_container");
        let horizontal_scroll = animation_rotation_canvas.querySelector(".horizontal_scroll_container")
        let horizontal_scroll__inner = animation_rotation_canvas.querySelector(".inside_container_horizontal_scroll")
        let remove_button_scroll = animation_rotation_canvas.querySelector(".remove_button_scroll")
        let  progress_horizontal_scroll = animation_rotation_canvas.querySelector(".progress_horizontal_scroll")
        

        // Calculate new values based on the progress
        let startSize = 0; // Initial size
        let endSize = horizontal_scroll.scrollWidth / 2 ; // Target size
        let mediaQuery = window.matchMedia("(max-width: 550px)");
        
                // Check if the media query matches
        if (mediaQuery.matches) {
            endSize = horizontal_scroll.clientWidth * 4; 
        }
        horizontal_scroll.addEventListener('scroll',()=>{
    
            const progress = (horizontal_scroll.scrollLeft - startSize) / (endSize - startSize);

            progress_horizontal_scroll.style.width = progress*100 +"%"
        })
        button.addEventListener('click',()=>{
            horizontal_scroll.style.transform = "translateX(0)";
        })
        remove_button_scroll.addEventListener('click',() => {
            horizontal_scroll.style.transform = "translateX(100%)";
        })
    }
    // 10 - ANIMATION OVECT IDENTIFIED SECTION
    initAnimationSectionIndentified(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){

        let objects_identified_component = this.querySelector(".objects_identified_component");
       

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  300;
        let inner_break_3 = inner_break_2 +  600;
     
      

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            objects_identified_component.style.removeProperty("position");
            objects_identified_component.style.removeProperty("z-index");

            objects_identified_component.style.opacity = "0"
           
            
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            objects_identified_component.style.position = "relative";  
            objects_identified_component.style.removeProperty("z-index");
            objects_identified_component.style.opacity = "0"
            
        }else{
            objects_identified_component.style.position = "fixed";
            objects_identified_component.style.removeProperty("margin");
            objects_identified_component.style.zIndex = "1000";

            objects_identified_component.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
         
            }
            else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3 ){

            }
        }        
    }
    initAnimationSectionIndentifiedLogic(){
        let objects_identified_component = this.querySelector(".objects_identified_component");
        let button = objects_identified_component.querySelector(".img_click_container");
        let horizontal_scroll = objects_identified_component.querySelector(".horizontal_scroll_container")
        let horizontal_scroll__inner = objects_identified_component.querySelector(".inside_container_horizontal_scroll")
        let remove_button_scroll = objects_identified_component.querySelector(".remove_button_scroll")
        let  progress_horizontal_scroll = objects_identified_component.querySelector(".progress_horizontal_scroll")
        

        // Calculate new values based on the progress
        let startSize = 0; // Initial size
        let endSize = horizontal_scroll__inner.clientWidth/2; // Target size
        let mediaQuery = window.matchMedia("(max-width: 550px)");
        
                // Check if the media query matches
        if (mediaQuery.matches) {
            endSize = horizontal_scroll.clientWidth * 2 ; 
        }
        horizontal_scroll.addEventListener('scroll',()=>{
        

            const progress = (horizontal_scroll.scrollLeft - startSize) / (endSize - startSize);

            progress_horizontal_scroll.style.width = progress*100 +"%"
        })
        button.addEventListener('click',()=>{
            horizontal_scroll.style.transform = "translateX(0)";
        })
        remove_button_scroll.addEventListener('click',() => {
            horizontal_scroll.style.transform = "translateX(100%)";
        })
    }
    // 11 - ANIMATION AI ACTION SECTION
    initAnimationAiAction(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){

        let ai_action_feature_component = this.querySelector(".ai_action_feature_component");
        let bg_img = ai_action_feature_component.querySelector(".bg_img");

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  150;

     
      

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            ai_action_feature_component.style.removeProperty("position");
            ai_action_feature_component.style.removeProperty("z-index");

            ai_action_feature_component.style.opacity = "0"
           
            bg_img.style.opacity = "0";
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            ai_action_feature_component.style.position = "relative";  
            ai_action_feature_component.style.removeProperty("z-index");
            ai_action_feature_component.style.opacity = "0"
            
        }else{
            ai_action_feature_component.style.position = "fixed";
            ai_action_feature_component.style.removeProperty("margin");
            ai_action_feature_component.style.zIndex = "1000";

            ai_action_feature_component.style.opacity = "1";
            if(scrollTopY > inner_break_2){
                bg_img.style.opacity = "1";      
            }
           
        }        
    }
    initAnimationAiActionLogic(){
        
        let ai_action_feature_component = this.querySelector(".ai_action_feature_component");
        let button = ai_action_feature_component.querySelector(".img_click_container");
        let horizontal_scroll = ai_action_feature_component.querySelector(".horizontal_scroll_container")
        let horizontal_scroll__inner = ai_action_feature_component.querySelector(".inside_container_horizontal_scroll")
        let remove_button_scroll = ai_action_feature_component.querySelector(".remove_button_scroll")
        let  progress_horizontal_scroll = ai_action_feature_component.querySelector(".progress_horizontal_scroll")
        

        // Calculate new values based on the progress
        let startSize = 0; // Initial size
        let endSize = horizontal_scroll.scrollWidth / 2 ; // Target size
        let mediaQuery = window.matchMedia("(max-width: 550px)");
        
                // Check if the media query matches
        if (mediaQuery.matches) {
          
            endSize = horizontal_scroll.clientWidth * 4; 
        }
        horizontal_scroll.addEventListener('scroll',()=>{
    
            const progress = (horizontal_scroll.scrollLeft - startSize) / (endSize - startSize);

            progress_horizontal_scroll.style.width = progress*100 +"%"
        })
        button.addEventListener('click',()=>{
            horizontal_scroll.style.transform = "translateX(0)";
        })
        remove_button_scroll.addEventListener('click',() => {
            horizontal_scroll.style.transform = "translateX(100%)";
        })
    }
    // 12 - ANIMATION PATH FINDER SECTION
    initAnimationPathFinder(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){

        let path_finder_feature_component = this.querySelector(".path_finder_feature_component");
        

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  300;
        let inner_break_3 = inner_break_2 +  600;
     
      

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            path_finder_feature_component.style.removeProperty("position");
            path_finder_feature_component.style.removeProperty("z-index");

            path_finder_feature_component.style.opacity = "0"
           
            
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            path_finder_feature_component.style.position = "relative";  
            path_finder_feature_component.style.removeProperty("z-index");
            path_finder_feature_component.style.opacity = "0"
            
        }else{
            path_finder_feature_component.style.position = "fixed";
            path_finder_feature_component.style.removeProperty("margin");
            path_finder_feature_component.style.zIndex = "1000";

            path_finder_feature_component.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                
            }
            else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3 ){
                
            }
        }        
    }

    //SECTION 13 - LAST VERTICAL TABS
    initLastVerticalTabs(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let last_vertical_tabs_component = this.querySelector(".last_vertical_tabs_component");
        let elements = last_vertical_tabs_component.querySelectorAll(".scroll_el");
        let buttons_click = last_vertical_tabs_component.querySelectorAll(".scroller_container div")

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  (breakPoint - startPoint)/2;
        let inner_break_3 = inner_break_2 +  (breakPoint - startPoint)/2;
     
      
        if(scrollTopY <= startPoint){
            //When we go to the previous section
            last_vertical_tabs_component.style.removeProperty("position");
            last_vertical_tabs_component.style.removeProperty("z-index");

            last_vertical_tabs_component.style.opacity = "0"
            
         
            
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            last_vertical_tabs_component.style.position = "relative";  
            last_vertical_tabs_component.style.removeProperty("z-index");
            last_vertical_tabs_component.style.opacity = "0"
            last_vertical_tabs_component.style.overflowY = "scroll"
            
        }else{
            // last_vertical_tabs_component.focus();
            last_vertical_tabs_component.style.position = "fixed";
            last_vertical_tabs_component.style.removeProperty("margin");
            last_vertical_tabs_component.style.zIndex = "1000";

            last_vertical_tabs_component.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                elements[0].style.opacity = "1";
                elements[1].style.opacity = "0";
                buttons_click[0].style.opacity = "1"
                buttons_click[1].style.opacity = "0.3"

                
            }
            else if(scrollTopY>=inner_break_2 && scrollTopY < inner_break_3){
                elements[0].style.opacity = "0";
                elements[1].style.opacity = "1";
                buttons_click[0].style.opacity = "0.3"
                buttons_click[1].style.opacity = "1"

     

            }
          
        }        
    } 
    
    lastVerticalTabs(){
        let last_vertical_tabs_component = this.querySelector(".last_vertical_tabs_component");
        let elements = last_vertical_tabs_component.querySelectorAll(".scroll_el");
        let buttons_click = last_vertical_tabs_component.querySelectorAll(".scroller_container div")
        buttons_click[0].addEventListener('click' , () => {
            elements[0].style.opacity = "1";
            elements[1].style.opacity = "0";
            buttons_click[0].style.opacity = "1"
            buttons_click[1].style.opacity = "0.3"
            
        })
        buttons_click[1].addEventListener('click' , () => {
          
            elements[0].style.opacity = "0";
            elements[1].style.opacity = "1";
            buttons_click[0].style.opacity = "0.3"
            buttons_click[1].style.opacity = "1"
        })
    }
    // 14 - LAST SECTION LOGIC
    initLastSection(scrollTopY,startPoint,scrollDown,breakPoint,previousBreakPoint){
        let last_section_component = this.querySelector(".last_section_component");

        //section_1
        let section_1 = last_section_component.querySelector(".section_1");
        

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 +  breakPoint/3;
     
      

        if(scrollTopY <= startPoint){
            //When we go to the previous section
            last_section_component.style.removeProperty("position");
            last_section_component.style.removeProperty("z-index");

            last_section_component.style.opacity = "0"
            
            last_section_component.style.overflowY = "scroll"
            
        }else if(scrollTopY > breakPoint){ 
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            last_section_component.style.position = "relative";  
            last_section_component.style.removeProperty("z-index");
            last_section_component.style.opacity = "0"
            last_section_component.style.overflowY = "scroll"
            
        }else{
            last_section_component.focus();
            last_section_component.style.position = "fixed";
            last_section_component.style.removeProperty("margin");
            last_section_component.style.zIndex = "1000";

            last_section_component.style.opacity = "1";

            
            if(scrollTopY>=inner_break_1 && scrollTopY < inner_break_2){
                
            }
          
        }        
    }
 
   
    //Initiate Last Section
    handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // If the target div is in the viewport
            entry.target.style.animation = ""
            entry.target.offsetHeight
            entry.target.style.animation = "fade 1s"
            // observer.unobserve(entry.target); // Stop observing once the div is visible
          }
        });
      }
    initiateLastSectionScroll(){
        
        let last_section_component = this.querySelector(".last_section_component")

        // HORIZONTAL SCROLL LOGIC
        let button = last_section_component.querySelector(".img_click_container");
        let horizontal_scroll = last_section_component.querySelector(".horizontal_scroll_container")
        let horizontal_scroll__inner = last_section_component.querySelector(".inside_container_horizontal_scroll")
        let remove_button_scroll = last_section_component.querySelector(".remove_button_scroll")
        let  progress_horizontal_scroll = last_section_component.querySelector(".progress_horizontal_scroll")
        

        // Calculate new values based on the progress
        let startSize = 0; // Initial size
        let endSize = horizontal_scroll.scrollWidth / 2 ; // Target size
        let mediaQuery = window.matchMedia("(max-width: 550px)");
        
                // Check if the media query matches
        if (mediaQuery.matches) {
            endSize = horizontal_scroll.clientWidth * 4; 
        }
        horizontal_scroll.addEventListener('scroll',()=>{
    
            const progress = (horizontal_scroll.scrollLeft - startSize) / (endSize - startSize);

            progress_horizontal_scroll.style.width = progress*100 +"%"
        })
        button.addEventListener('click',()=>{
            horizontal_scroll.style.transform = "translateX(0)";
        })
        remove_button_scroll.addEventListener('click',() => {
            horizontal_scroll.style.transform = "translateX(100%)";
        })



        // let elements = document.querySelectorAll(".scroll_el");
        // let buttons_click = document.querySelectorAll(".scroller_container div")
        last_section_component.addEventListener('click',()=>{
           
        })
        last_section_component.addEventListener('scroll', (event) => {
            let scrollTopY = last_section_component.scrollTop
            // Finding the scroll direction
            if (scrollTopY > this.prevYLastSection) {
                this.prevYLastSection = scrollTopY;
                this.isScrollingDownLastSection = true;
            } else  {
                this.prevYLastSection = scrollTopY;
                this.isScrollingDownLastSection = false;
            }

            
            if(this.isScrollingDownLastSection && this.prevYLastSection == (last_section_component.scrollHeight - window.innerHeight)){
                
                last_section_component.click()
                last_section_component.style.position = "relative";
                last_section_component.style.opacity = "0";
                // last_section_component.style.overflowY = "hidden"
            }else if (!this.isScrollingDownLastSection && this.prevYLastSection === 0){
                last_section_component.click()
                
               
                // last_section_component.style.overflowY = "hidden"
                last_section_component.style.position = "relative";
                last_section_component.style.opacity = "0";

            }

            // if(this.isScrollingDownLastSection){
            //     elements[0].style.opacity = "0";
            //     elements[1].style.opacity = "1";
            //     buttons_click[0].style.opacity = "0.3"
            //     buttons_click[1].style.opacity = "1"
            // }else{
            //     elements[0].style.opacity = "1";
            //     elements[1].style.opacity = "0";
            //     buttons_click[0].style.opacity = "1"
            //     buttons_click[1].style.opacity = "0.3"
            // }
        });
        
        

        const observer = new IntersectionObserver(this.handleIntersection, { threshold: 0 });
        // elements.forEach((el) => {
        //     observer.observe(el.querySelector(".text_feature_description"));
        // })

        let text1 =  last_section_component.querySelector(".app_container h1")
        observer.observe(text1);
        let text2 =  last_section_component.querySelectorAll(".app_container p")
        text2.forEach((txt) => {
            observer.observe(txt);
        })
        let rows = last_section_component.querySelectorAll(".features_section_rows .feature_row")
 
        rows.forEach((row) => {
            let header = row.querySelector("h1");
            let paragraph = row.querySelector("p");
            let image = row.querySelector("img");
            observer.observe(header);
            observer.observe(paragraph);
            observer.observe(image);
        })
        
        let cards_hovered_on = last_section_component.querySelectorAll(".cell")
        let changin_card = last_section_component.querySelector(".changing_card")
        observer.observe(changin_card);
        let changin_card_img =  changin_card.querySelector("img")
        let changin_card_title =  changin_card.querySelector("span")
        cards_hovered_on.forEach((card) => {
            observer.observe(card);
            card.addEventListener('mouseover' , ()=> {
                changin_card_img.src = card.querySelector(".hidden").src
                changin_card_title.innerText = card.querySelector(".title").innerHTML
            })
        })
        
        let specs = last_section_component.querySelectorAll(".main_specifications_content > div")
        specs.forEach((spec) => {
            observer.observe(spec);
        }) 
        
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);

