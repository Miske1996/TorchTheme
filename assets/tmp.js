//HERE IS THE LOGIC OF A SCROLLING SECTIONS
class SectionsAnimationScroll extends HTMLElement {
    constructor() {
        super();
        this.initSectionHero()
        // this.initScroll();
        this.prevY = 0;
        this.isScrollingDown = true;
        window.scrollTo(0, 0);
        this.topTop = this.getBoundingClientRect().top

        //Animation Canvas 1 
        this.check_animation_1 = false
        //Animation Canvas 2
        this.check_animation_2 = false
        this.check_animation_3 = false
        this.check_animation_4 = false
        //Animation Canvas 3 roatating 
        this.current_frame_canvas_rotating = 1;
        this.animations_sequences_canvas_rotating = {"animation":[
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 25,
                "startFrame": 1,
                "endFrame": 13,
                "isStartedForward": false,
                "isStartedBackward": false,
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 15,
                "startFrame": 13,
                "endFrame": 28,
                "isStartedForward": false,
                "isStartedBackward": false,
            },
            {
                "link_begin": "https://cdn.shopify.com/s/files/1/0077/3953/9515/files/cxtbimage_",
                "link_end": ".webp?v=1691735083",
                "frameRate": 15,
                "startFrame": 28,
                "endFrame": 101,
                "isStartedForward": false,
                "isStartedBackward": false,
            },
        ],
        "prevScorllDown":true,
        "currentScorllDown":true
    }

        // Initialize requestAnimationFrame loop
        this.rafId = null;
        this.animateScroll = this.animateScroll.bind(this);

        this.animateScroll();
    }

    animateOnScroll(window_height) {
        let scrollTopY = document.documentElement.scrollTop

        // 1 - FIRST SECTION DESCRIPTION SCROLL ANIMATION LOGIC
        if (scrollTopY > (this.topTop + window_height * 0.9) && scrollTopY <= (window_height * 6)) {

            //START SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY, window_height * 0.9, this.isScrollingDown, window_height * 6)
            //RESET SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY, window_height * 6, this.isScrollingDown, window_height * 10)

        } else if (scrollTopY <= (this.topTop + window_height * 0.9)) {
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY, window_height * 0.9, this.isScrollingDown, window_height * 6)
        }

        // 2 - SECTION 2: AVAILABLE PRODUCTS SCROLL ANIMATION LOGIC
        else if (scrollTopY > (window_height * 6) && scrollTopY <= (window_height * 8)) {
            //RESET SECTION 1 ANIMATION
            this.initSectionFirstDescription(scrollTopY, window_height * 0.9, this.isScrollingDown, window_height * 6, window_height * 6)
            //START SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY, window_height * 6, this.isScrollingDown, window_height * 8)
            //RESET SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY, window_height * 8, this.isScrollingDown, window_height * 12)
        }

        // 3 - SECTION 3: PRODUCT FEATURES CARDS ANIMATION LOGIC
        else if (scrollTopY > (window_height * 8) && scrollTopY <= (window_height * 12)) {
            //RESET SECTION 2 ANIMATION
            this.initSectionAvailableProducts(scrollTopY, window_height * 6, this.isScrollingDown, window_height * 8)
            //START SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY, window_height * 8, this.isScrollingDown, window_height * 12, window_height * 8)
            //RESET SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY, window_height * 12, this.isScrollingDown, window_height * 16)
        }

        // 4 - SECTION 4: PRODUCT SPECIAL FEATURE OPENNING CIRCLE ANIMATION LOGIC
        else if (scrollTopY > (window_height * 12) && scrollTopY <= (window_height * 16)) {
            //RESET SECTION 3 ANIMATION
            this.initSectionFeautresCardsProduct(scrollTopY, window_height * 8, this.isScrollingDown, window_height * 12)
            //START SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY, window_height * 12, this.isScrollingDown, window_height * 16)
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY, window_height * 16, this.isScrollingDown, window_height * 20)
        }

        // 5 - SECTION 5 : CHANGING IMAGES FEATURE PRODUCT ANIMATION LOGIC
        else if (scrollTopY > (window_height * 16) && scrollTopY <= (window_height * 20)) {
            //RESET SECTION 4 ANIMATION
            this.initSectionSpecialFeatureCircleOpenning(scrollTopY, window_height * 14, this.isScrollingDown, window_height * 16);
            //START SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY, window_height * 16, this.isScrollingDown, window_height * 20)
            //RESET SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY, window_height * 20, this.isScrollingDown, window_height * 24, window_height * 20)
        }

        // 6 - SECTION 6: VERTICAL TABS FEATURES ANIMATION LOGIC
        else if (scrollTopY >= (window_height * 20) && scrollTopY <= (window_height * 24)) {
            //RESET SECTION 5 ANIMATION
            this.initAnimationCanvasFeatureProduct(scrollTopY, window_height * 16, this.isScrollingDown, window_height * 20)
            //START SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY, window_height * 20, this.isScrollingDown, window_height * 24, window_height * 20)
            //START SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY, window_height * 24, this.isScrollingDown, window_height * 26)
        }

        // 7 - SECTION 7: TITLE FEATURE SECTION
        else if (scrollTopY >= (window_height * 24) && scrollTopY <= (window_height * 26)) {

            //RESET SECTION 6 ANIMATION
            this.initVerticalTabsFeatures(scrollTopY, window_height * 20, this.isScrollingDown, window_height * 24, window_height * 20)
            //START SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY, window_height * 24, this.isScrollingDown, window_height * 26)
            //RESET SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY, window_height * 26, this.isScrollingDown, window_height * 29)

        }

        // 8 - SECTION 8: ANIMATION CANVAS WITH TITLE SECTION
        else if (scrollTopY >= (window_height * 26) && scrollTopY <= (window_height * 29)) {

            //RESET SECTION 7 ANIMATION
            this.initTitleFeautreAnimation(scrollTopY, window_height * 24, this.isScrollingDown, window_height * 26)
            //START SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY, window_height * 26, this.isScrollingDown, window_height * 29)
            //START SECTION 9 ANIMATION
            this.initAnimationCanvasRotating(scrollTopY, window_height * 29, this.isScrollingDown, window_height * 32)

        }

        // 9 - SECTION 9: ANIMATION CANVAS WITH ROTATION
        else if (scrollTopY >= (window_height * 29) && scrollTopY <= (window_height * 32)) {

            //START SECTION 8 ANIMATION
            this.initAnimationCanvasWithTitle(scrollTopY, window_height * 26, this.isScrollingDown, window_height * 29)
            //START SECTION 9 ANIMATION
            this.initAnimationCanvasRotating(scrollTopY, window_height * 29, this.isScrollingDown, window_height * 32)

        } else if (scrollTopY > (window_height * 32)) {
            //REET SECTION 9 ANIMATION
            this.initAnimationCanvasRotating(scrollTopY, window_height * 29, this.isScrollingDown, window_height * 32)
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
    initSectionHero() {
        let hero_button = this.querySelector(".play_video_hero_btn");
        let video_hero_element = this.querySelector(".video_container");
        let video_iframe = video_hero_element.querySelector("iframe");
        hero_button.addEventListener('click', () => {
            video_hero_element.style.display = "flex";
        })
        let remove_video_from_hero = this.querySelector(".remove_button_video_btn");
        remove_video_from_hero.addEventListener("click", () => {
            video_iframe.src = ""
            video_hero_element.style.display = "none";
            video_iframe.src = "https://www.youtube.com/embed/WE155WwKNkk?&controls=0&loop=1&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=https%3A%2F%2Fglobal.dreametech.com%2Fproducts%2Fl20-ultra&rel=0&showinfo=1&iv_load_policy=3&modestbranding=1&customControls=false&noCookie=false&enablejsapi=1&origin=https%3A%2F%2Fglobal.dreametech.com&widgetid=1"
        })
    }

    // 1 - FIRST DESCRIPTION SECTION LOGIC
    initSectionFirstDescription(scrollTopY, startPoint, scrollDown, breakPoint) {

        let first_section_container = this.querySelector(".first_description_container");

        let white_overlay_video = first_section_container.querySelector(".text_description_animation_container");

        let scroll_succession_text_animation = first_section_container.querySelector(".scroll_succession_text_animation_container")

        let headers_scroll_succession = scroll_succession_text_animation.querySelectorAll("h1");

        //Animations Y breaks


        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + (breakPoint - startPoint) / 5;
        let inner_break_3 = inner_break_2 + (breakPoint - startPoint) / 5;
        let inner_break_4 = inner_break_3 + (breakPoint - startPoint) / 5;
        let inner_break_5 = inner_break_4 + (breakPoint - startPoint) / 5;
        //here we move and fix the section white scrolling
        if (scrollTopY <= startPoint + this.topTop) {

            //When we go to the previous section
            white_overlay_video.style.removeProperty("transform");
            first_section_container.style.position = "relative";
            // first_section_container.style.opacity = "0";
            first_section_container.style.removeProperty("z-index");
            white_overlay_video.style.opacity = "1";

        } else if (scrollTopY >= breakPoint) {

            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // first_section_container.style.marginTop = (breakPoint - first_section_container.offsetHeight) + "px";
            first_section_container.style.position = "relative";
            first_section_container.style.removeProperty("z-index");
            first_section_container.style.opacity = "0";



        } else {
            // console.log("HERERERERER")
            // console.log("scrollTopY " + scrollTopY)
            // console.log("startPoint + this.topTop :  " + startPoint + " + " + this.topTop + `${startPoint + this.topTop}`)
            // console.log("BreakPoint " + breakPoint)
            //Succession of scenes logic

            first_section_container.style.position = "fixed";
            first_section_container.style.removeProperty("margin");
            first_section_container.style.zIndex = "1000";
            first_section_container.style.opacity = "1";



            //End of the first animation over
            white_overlay_video.style.opacity = "0";



            //Start Second Animation
            if (scrollTopY >= (inner_break_1) && scrollTopY < (inner_break_2)) {
                //Start first animation
                white_overlay_video.style.display = "flex";
                const scaleValue = 1 + ((scrollTopY - startPoint) / (inner_break_1 / 10));
                first_section_container.style.background = "black";
                white_overlay_video.style.opacity = (1 - ((scrollTopY - startPoint) / (inner_break_1)));
                white_overlay_video.style.transform = `scale(${Math.min(scaleValue, 11)})`;

                //remove 2nd animation
                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "90%";
            } else if (scrollTopY >= (inner_break_2) && scrollTopY < (inner_break_3)) {


                headers_scroll_succession[0].style.top = "50%";
                headers_scroll_succession[0].style.opacity = "1";

                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "90%";

            } else if (scrollTopY >= (inner_break_3) && scrollTopY < (inner_break_4)) {

                headers_scroll_succession[0].style.opacity = "0";
                headers_scroll_succession[0].style.top = "0%";

                headers_scroll_succession[1].style.top = "50%";
                headers_scroll_succession[1].style.opacity = "1";

                headers_scroll_succession[2].style.opacity = "0";
                headers_scroll_succession[2].style.top = "90%";

            } else if (scrollTopY >= (inner_break_4) && scrollTopY < (inner_break_5)) {
                headers_scroll_succession[1].style.opacity = "0";
                headers_scroll_succession[1].style.top = "0%";

                headers_scroll_succession[2].style.top = "50%";
                headers_scroll_succession[2].style.opacity = "1";

                headers_scroll_succession[3].style.opacity = "0";
                headers_scroll_succession[3].style.top = "90%";;


            } else if (scrollTopY >= inner_break_5) {
                headers_scroll_succession[2].style.opacity = "0";
                headers_scroll_succession[2].style.top = "0%";

                headers_scroll_succession[3].style.top = "50%";
                headers_scroll_succession[3].style.opacity = "1";

            }

        }


    }

    // 2 - AVAILABLE PRODUCTS SECTION LOGIC
    initSectionAvailableProducts(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {
        let available_products_section = this.querySelector(".available_products_component_container");

        let header_title = available_products_section.querySelector("h1");
        let images_to_animate = available_products_section.querySelectorAll("img");
        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + available_products_section.offsetHeight / 4;
        let inner_break_3 = inner_break_2 + available_products_section.offsetHeight / 4;
        let inner_break_4 = inner_break_3 + available_products_section.offsetHeight / 4;
        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            available_products_section.style.removeProperty("position");
            header_title.style.transform = "translateY(30%)";
            header_title.style.opacity = "0";
            images_to_animate[0].style.opacity = "0"
            available_products_section.style.removeProperty("z-index");
            available_products_section.style.opacity = "0"

        } else if (scrollTopY >= breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // available_products_section.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            available_products_section.style.position = "relative";
            header_title.style.transform = "translateY(30%)";
            header_title.style.opacity = "0";
            available_products_section.style.removeProperty("z-index");
            available_products_section.style.opacity = "0"



        } else {
            available_products_section.style.position = "fixed"
            available_products_section.style.removeProperty("margin");
            available_products_section.style.zIndex = "1000";
            available_products_section.style.opacity = "1"

            header_title.style.opacity = "1";
            header_title.style.transform = "translateY(-30%)";

            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {
                images_to_animate[0].style.opacity = "1"
                images_to_animate[1].style.opacity = "0"

            } else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {
                images_to_animate[0].style.opacity = "0"
                images_to_animate[1].style.opacity = "1"
                images_to_animate[2].style.opacity = "0"


            } else if (scrollTopY >= inner_break_3 && scrollTopY < inner_break_4) {
                images_to_animate[2].style.opacity = "1"
                images_to_animate[1].style.opacity = "0"
            }

        }
    }

    // 3 - PRODUCT FEATURES CARDS ANIMATION LOGIC
    initSectionFeautresCardsProduct(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {

        let feautres_cards_product_container = this.querySelector(".product_features_cards_component_container");

        let overlay_animation_container = this.querySelector(".overlay_feature_animation_container");

        let overlay_animation_container_image_container = overlay_animation_container.querySelector(".image_container_feature");

        let text_description_overlay_feature_container = overlay_animation_container.querySelector(".text_description_overlay_feature_container");

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) / 4);
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) * 3 / 8);
        let inner_break_4 = inner_break_3 + ((breakPoint - startPoint) * 3 / 8);

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            feautres_cards_product_container.style.removeProperty("position");
            feautres_cards_product_container.style.removeProperty("zIndex");
            feautres_cards_product_container.style.opacity = "0";
            overlay_animation_container.style.display = "none";
        } else if (scrollTopY >= breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            feautres_cards_product_container.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            feautres_cards_product_container.style.position = "relative";

            feautres_cards_product_container.style.removeProperty("z-index");


        } else {

            feautres_cards_product_container.style.position = "fixed";
            feautres_cards_product_container.style.zIndex = "1000";
            feautres_cards_product_container.style.opacity = "1";
            feautres_cards_product_container.style.removeProperty("margin");

            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {} else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {


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

            } else if (scrollTopY >= inner_break_3 && scrollTopY < inner_break_4) {
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
    initSectionSpecialFeatureCircleOpenning(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {
        let special_feature_openning_circle_component = this.querySelector(".special_feature_openning_circle_component");

        let openning_circle = special_feature_openning_circle_component.querySelector(".openning_circle");

        let text_feature_description = special_feature_openning_circle_component.querySelector(".text_feature_description")
        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) / 2);
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) / 2);

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            special_feature_openning_circle_component.style.removeProperty("position");
            special_feature_openning_circle_component.style.opacity = "0";
            special_feature_openning_circle_component.style.removeProperty("z-index");


        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            special_feature_openning_circle_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            special_feature_openning_circle_component.style.position = "relative";
            special_feature_openning_circle_component.style.removeProperty("z-index");


        } else {
            special_feature_openning_circle_component.style.position = "fixed";
            special_feature_openning_circle_component.style.removeProperty("margin");
            special_feature_openning_circle_component.style.opacity = "1";
            special_feature_openning_circle_component.style.zIndex = "1000";

            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {

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

            } else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {

                text_feature_description.style.opacity = "1"

                text_feature_description.querySelector(".paragraph2").style.opacity = "0";
                text_feature_description.querySelector(".paragraph2").style.top = "100%";
                text_feature_description.querySelector(".paragraph1").style.top = "80%";
                text_feature_description.querySelector(".paragraph1").style.opacity = "1";


            } else if (scrollTopY >= inner_break_3) {
                text_feature_description.querySelector(".paragraph1").style.opacity = "0";
                text_feature_description.querySelector(".paragraph1").style.top = "0";
                text_feature_description.querySelector(".paragraph2").style.opacity = "1";
                text_feature_description.querySelector(".paragraph2").style.top = "80%";
            }

        }
    }

    // 5 - 1ST CANVAS ANIMATION SPECIAL FEATURE LOGIC
    initAnimationCanvasFeatureProduct(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {
        let animation_canvas_feature_product_component = this.querySelector(".animation_canvas_feature_product_component");

        let canvas = animation_canvas_feature_product_component.querySelector("canvas");
        let ctx = canvas.getContext("2d")

        let text_description_container = animation_canvas_feature_product_component.querySelector(".text_feature_description");
        let animation_canvas_feature_product_component_images_container = animation_canvas_feature_product_component.querySelector(".images_animations");
        let last_description_container = animation_canvas_feature_product_component.querySelector(".last_text_features_container");

        let img_to_animate = animation_canvas_feature_product_component_images_container.querySelector("img");


        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) / 4);
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) * 3 / 8);
        let inner_break_4 = inner_break_3 + ((breakPoint - startPoint) * 3 / 8);

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            animation_canvas_feature_product_component.style.removeProperty("position");
            animation_canvas_feature_product_component.style.opacity = "0";
            animation_canvas_feature_product_component_images_container.style.opacity = "0"
            animation_canvas_feature_product_component_images_container.style.removeProperty("z-index");

            this.check_animation_1 = false;




        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            animation_canvas_feature_product_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_canvas_feature_product_component.style.position = "relative";
            animation_canvas_feature_product_component_images_container.style.removeProperty("z-index");
            animation_canvas_feature_product_component.style.opacity = "0";


        } else {
            animation_canvas_feature_product_component.style.position = "fixed";
            animation_canvas_feature_product_component.style.removeProperty("margin");
            animation_canvas_feature_product_component.style.zIndex = "1000";

            animation_canvas_feature_product_component.style.opacity = "1";


            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {

                if (!this.check_animation_1) {
                    console.log("enterere 1")

                    const imageCount = 101; // Number of images in the sequence
                    let currentFrame = 1;

                    const frameRate = 30;
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
                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 1000 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();
                        this.check_animation_1 = true;
                    };

                }

                animation_canvas_feature_product_component_images_container.style.opacity = "1"
                text_description_container.style.opacity = "0"

            } else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {


                animation_canvas_feature_product_component_images_container.style.opacity = "1"
                text_description_container.style.opacity = "1"
                last_description_container.style.opacity = "0"
                last_description_container.style.transform = "scale(0)"

            } else if (scrollTopY >= inner_break_3 && scrollTopY < inner_break_4) {

                animation_canvas_feature_product_component_images_container.style.opacity = "0"

                text_description_container.style.opacity = "0"
                last_description_container.style.opacity = "1"
                last_description_container.style.transform = "scale(1)"
            }
        }
    }

    // 6 - VERTICAL TABS FEATURES ANIMATION LOGIC 
    initVerticalTabsFeatures(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {
        let vertical_tabs_features_component = this.querySelector(".vertical_tabs_features_component");

        let progress_bar = vertical_tabs_features_component.querySelector(".scroller_container_progress_bar");

        let tabs = vertical_tabs_features_component.querySelectorAll(".tab_content");

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) / 5);
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) / 5);
        let inner_break_4 = inner_break_3 + ((breakPoint - startPoint) / 5);
        let inner_break_5 = inner_break_4 + ((breakPoint - startPoint) / 5);
        let inner_break_6 = inner_break_5 + ((breakPoint - startPoint) / 5);

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            vertical_tabs_features_component.style.removeProperty("position");
            vertical_tabs_features_component.style.removeProperty("z-index");

            vertical_tabs_features_component.style.opacity = "0"


        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            vertical_tabs_features_component.style.position = "relative";
            vertical_tabs_features_component.style.removeProperty("z-index");

            vertical_tabs_features_component.style.opacity = "0"
        } else {
            vertical_tabs_features_component.style.position = "fixed";
            vertical_tabs_features_component.style.removeProperty("margin");
            vertical_tabs_features_component.style.zIndex = "1000";

            vertical_tabs_features_component.style.opacity = "1";

            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {
                progress_bar.style.top = "0%";
                tabs[0].style.opacity = "1";
                tabs[1].style.opacity = "0";

            } else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {
                progress_bar.style.top = "20%";
                tabs[0].style.opacity = "0";
                tabs[1].style.opacity = "1";
                tabs[2].style.opacity = "0";


            } else if (scrollTopY >= inner_break_3 && scrollTopY < inner_break_4) {
                progress_bar.style.top = "40%";
                tabs[1].style.opacity = "0";
                tabs[2].style.opacity = "1";
                tabs[3].style.opacity = "0";

            } else if (scrollTopY >= inner_break_4 && scrollTopY < inner_break_5) {
                progress_bar.style.top = "60%";
                tabs[2].style.opacity = "0";
                tabs[3].style.opacity = "1";
                tabs[4].style.opacity = "0";

            } else if (scrollTopY >= inner_break_5 && scrollTopY < inner_break_6) {
                progress_bar.style.top = "80%";
                tabs[3].style.opacity = "0";
                tabs[4].style.opacity = "1";
            }
        }
    }

    // 7 - TITLE FEATURE ANIMATION LOGIC 
    initTitleFeautreAnimation(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {
        let feature_title_component = this.querySelector(".feature_title_component");


        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) / 2);
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) / 2);

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            feature_title_component.style.removeProperty("position");
            feature_title_component.style.removeProperty("z-index");

            feature_title_component.style.opacity = "0"


        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            feature_title_component.style.position = "relative";
            feature_title_component.style.removeProperty("z-index");
            feature_title_component.style.opacity = "0"
        } else {
            feature_title_component.style.position = "fixed";
            feature_title_component.style.removeProperty("margin");
            feature_title_component.style.zIndex = "1000";

            feature_title_component.style.opacity = "1";

            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {

            }
        }
    }

    // 8 - ANIMATION CANVAS WITH TITLE
    initAnimationCanvasWithTitle(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {

        let animation_canvas_with_title = this.querySelector(".animation_canvas_with_title");

        let canvas = animation_canvas_with_title.querySelector("canvas")
        let ctx = canvas.getContext("2d")

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) * (1 / 8));
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 4));
        let inner_break_4 = inner_break_3 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 4));
        let inner_break_5 = inner_break_4 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 4));
        let inner_break_6 = inner_break_5 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 4));

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            animation_canvas_with_title.style.removeProperty("position");
            animation_canvas_with_title.style.removeProperty("z-index");

            animation_canvas_with_title.style.opacity = "0"

            this.check_animation_2 = false

        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_canvas_with_title.style.position = "relative";
            animation_canvas_with_title.style.removeProperty("z-index");
            animation_canvas_with_title.style.opacity = "0"

        } else {
            animation_canvas_with_title.style.position = "fixed";
            animation_canvas_with_title.style.removeProperty("margin");
            animation_canvas_with_title.style.zIndex = "1000";

            animation_canvas_with_title.style.opacity = "1";


            if (scrollTopY >= inner_break_1 && scrollTopY < inner_break_2) {

                const image = new Image();
                console.log("ENTERED 1ST")

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


            } else if (scrollTopY >= inner_break_2 && scrollTopY < inner_break_3) {
                // ANIMATION 2 RESET 
                if (this.check_animation_3) {

                    const imageCount = 17; // Number of images in the sequence
                    let currentFrame = 11;
                    const imagePrefix = 'tmwhite_';
                    const frameRate = 20;
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                            console.log(currentFrame)
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                currentFrame--;
                                if (currentFrame < imageCount) {
                                    this.check_animation_2 = false;
                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 1000 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();

                        this.check_animation_3 = false;
                    };
                }
                // ANIMATION 1 START 
                else if (!this.check_animation_2) {

                    const imageCount = 7; // Number of images in the sequence
                    let currentFrame = 1;
                    const imagePrefix = 'tmwhite_';
                    const frameRate = 20;
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                            console.log(currentFrame)
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                currentFrame++;
                                if (currentFrame > imageCount) {
                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 750 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();


                    };
                    this.check_animation_2 = true;

                }

            } else if (scrollTopY >= inner_break_3 && scrollTopY < inner_break_4) {


                //  ANIMATION 3 RESET
                if (this.check_animation_4) {

                    const imageCount = 11; // Number of images in the sequence
                    let currentFrame = 26;
                    const imagePrefix = 'tmwhite_';
                    const frameRate = 20;
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                            console.log(currentFrame)
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                currentFrame--;
                                if (currentFrame < imageCount) {
                                    console.log("finished")
                                    this.check_animation_3 = false;

                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 750 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();

                    };
                    this.check_animation_4 = false;
                    console.log("this.check_animation_3 = ")
                }
                // ANIMATION 2 START
                else if (!this.check_animation_3 && this.check_animation_2) {

                    const imageCount = 11; // Number of images in the sequence
                    let currentFrame = 7;
                    const imagePrefix = 'tmwhite_';
                    const frameRate = 20;
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                            console.log(currentFrame)
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                currentFrame++;
                                if (currentFrame > imageCount) {
                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 750 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();

                    };
                    this.check_animation_3 = true;
                }



            } else if (scrollTopY >= inner_break_4 && scrollTopY < inner_break_5) {



                // ANIMATION 3 START
                if (!this.check_animation_4 && this.check_animation_3) {

                    const imageCount = 26; // Number of images in the sequence
                    let currentFrame = 11;
                    const imagePrefix = 'tmwhite_';
                    const frameRate = 18;
                    const image = new Image();
                    image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                    image.onload = () => {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        function loadNextFrame() {
                            image.src = `https://cdn.shopify.com/s/files/1/0077/3953/9515/files/${imagePrefix}${currentFrame}.webp?v=1691663754`;
                            console.log(currentFrame)
                            image.onload = () => {
                                ctx.width = image.width;
                                ctx.height = image.height;
                                ctx.clearRect(0, 0, ctx.width, ctx.height);
                                ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                currentFrame++;
                                if (currentFrame > imageCount) {
                                    return
                                    // currentFrame = 1;
                                }

                                setTimeout(loadNextFrame, 750 / frameRate); // Adjust the delay for the desired frame rate
                            };
                        }

                        loadNextFrame();
                    };
                    this.check_animation_4 = true;

                }
            }
        }
    }

    // 9 - ANIMATION CANVAS WITH ROTATION
    initAnimationCanvasRotating(scrollTopY, startPoint, scrollDown, breakPoint, previousBreakPoint) {

        let animation_rotation_canvas = this.querySelector(".animation_rotation_canvas");

        let canvas = animation_rotation_canvas.querySelector("canvas")
        let ctx = canvas.getContext("2d")

        let inner_break_1 = startPoint;
        let inner_break_2 = inner_break_1 + ((breakPoint - startPoint) * (1 / 8));
        let inner_break_3 = inner_break_2 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 3));
        let inner_break_4 = inner_break_3 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 3));
        let inner_break_5 = inner_break_4 + ((breakPoint - startPoint) * ((1 - 1 / 8) / 3));
        // let inner_break_6 = inner_break_5 +  ((breakPoint - startPoint)* ((1 - 1/8)/4));

        if (scrollTopY <= startPoint) {
            //When we go to the previous section
            animation_rotation_canvas.style.removeProperty("position");
            animation_rotation_canvas.style.removeProperty("z-index");

            animation_rotation_canvas.style.opacity = "0"

            this.current_frame_canvas_rotating = 1;



        } else if (scrollTopY > breakPoint) {
            //When we go to the next section
            //The margin is used to appear that we scrolled when the position fixed is over to relative
            // vertical_tabs_features_component.style.marginTop = (breakPoint - previousBreakPoint) + "px";
            animation_rotation_canvas.style.position = "relative";
            animation_rotation_canvas.style.removeProperty("z-index");
            animation_rotation_canvas.style.opacity = "0"
            this.current_frame_canvas_rotating = 101


        } else {
            animation_rotation_canvas.style.position = "fixed";
            animation_rotation_canvas.style.removeProperty("margin");
            animation_rotation_canvas.style.zIndex = "1000";

            animation_rotation_canvas.style.opacity = "1";


                if (scrollDown) {
                    this.animations_sequences_canvas_rotating["currentScorllDown"] = true;
                    //Animation 1
                    if (!this.animations_sequences_canvas_rotating["animation"][0]["isStartedForward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][0]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][0]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][0]["isStartedForward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][0]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][0]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;
                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][0]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][0]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                        if (this.animations_sequences_canvas_rotating["prevScorllDown"] && !this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][0]["isStartedBackward"] = false;
                                            console.log("STOPED FORWARD ")
                                            return
                                        }
                                        this.current_frame_canvas_rotating++;

                                        if (this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][0]["endFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][0]["isStartedBackward"] = false;
                                            return
                                          
                                        }

                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][0]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };
                       

                        }

                    }
                    //Animation 2
                    if (!this.animations_sequences_canvas_rotating["animation"][1]["isStartedForward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][1]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][1]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][1]["isStartedForward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][1]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][1]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;
                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][1]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][1]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                        if (this.animations_sequences_canvas_rotating["prevScorllDown"] && !this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][1]["isStartedBackward"] = false;
                                            console.log("STOPED FORWARD ")
                                            return
                                        }
                                        this.current_frame_canvas_rotating++;

                                        if (this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][1]["endFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][1]["isStartedBackward"] = false;
                                            return
                                          
                                        }

                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][1]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };
                           
                          

                        }

                    }
                    //Animation 3
                    if (!this.animations_sequences_canvas_rotating["animation"][2]["isStartedForward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][2]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][2]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][2]["isStartedForward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][2]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][2]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;
                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][2]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][2]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);

                                        if (this.animations_sequences_canvas_rotating["prevScorllDown"] && !this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][2]["isStartedBackward"] = false;
                                            console.log("STOPED FORWARD ")
                                            return
                                        }
                                        this.current_frame_canvas_rotating++;

                                        if (this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][2]["endFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][2]["isStartedBackward"] = false;
                                            return
                                          
                                        }

                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][2]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };
                            
                        }

                    }
                    this.animations_sequences_canvas_rotating["prevScorllDown"] = true;

                } else {
                    this.animations_sequences_canvas_rotating["currentScorllDown"] = false;
                    //Reverse Animation 1
                    if (!this.animations_sequences_canvas_rotating["animation"][0]["isStartedBackward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][0]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][0]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][0]["isStartedBackward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][0]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][0]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;

                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][0]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][0]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);



                                        if (!this.animations_sequences_canvas_rotating["prevScorllDown"] && this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][0]["isStartedForward"] = false;

                                            console.log("STOPED INVERSE")
                                            return
                                        }
                                        this.current_frame_canvas_rotating--;

                                        if (this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][0]["startFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][0]["isStartedForward"] = false;

                                            return
                                            // currentFrame = 1;
                                        }




                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][0]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };
                        
                            

                        }

                    }
                    //Reverse Animation 2
                    if (!this.animations_sequences_canvas_rotating["animation"][1]["isStartedBackward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][1]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][1]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][1]["isStartedBackward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][1]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][1]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;

                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][1]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][1]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);



                                        if (!this.animations_sequences_canvas_rotating["prevScorllDown"] && this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][1]["isStartedForward"] = false;

                                            console.log("STOPED INVERSE")
                                            return
                                        }
                                        this.current_frame_canvas_rotating--;

                                        if (this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][1]["startFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][1]["isStartedForward"] = false;

                                            return
                                            // currentFrame = 1;
                                        }




                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][1]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };
                        }

                    }
                    //Reverse Animation 3
                    if (!this.animations_sequences_canvas_rotating["animation"][2]["isStartedBackward"] && this.current_frame_canvas_rotating >= this.animations_sequences_canvas_rotating["animation"][2]["startFrame"] && this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][2]["endFrame"]) {
                        this.animations_sequences_canvas_rotating["animation"][2]["isStartedBackward"] = true;
                        if (true) {
                            const image = new Image();
                            image.src = this.animations_sequences_canvas_rotating["animation"][2]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][2]["link_end"]
                            image.onload = () => {
                                canvas.width = image.width;
                                canvas.height = image.height;

                                const loadNextFrame = () => {
                                    image.src = this.animations_sequences_canvas_rotating["animation"][2]["link_begin"] + this.current_frame_canvas_rotating + this.animations_sequences_canvas_rotating["animation"][2]["link_end"]
                                    image.onload = () => {
                                        ctx.width = image.width;
                                        ctx.height = image.height;
                                        ctx.clearRect(0, 0, ctx.width, ctx.height);
                                        ctx.drawImage(image, 0, 0, ctx.width, ctx.height);



                                        if (!this.animations_sequences_canvas_rotating["prevScorllDown"] && this.animations_sequences_canvas_rotating["currentScorllDown"]) {
                                            this.animations_sequences_canvas_rotating["animation"][2]["isStartedForward"] = false;

                                            console.log("STOPED INVERSE")
                                            return
                                        }
                                        this.current_frame_canvas_rotating--;

                                        if (this.current_frame_canvas_rotating <= this.animations_sequences_canvas_rotating["animation"][2]["startFrame"]) {
                                            this.animations_sequences_canvas_rotating["animation"][2]["isStartedForward"] = false;

                                            return
                                            // currentFrame = 1;
                                        }




                                        setTimeout(loadNextFrame, 1000 / this.animations_sequences_canvas_rotating["animation"][2]["frameRate"]); // Adjust the delay for the desired frame rate
                                    };
                                }

                                loadNextFrame();


                            };

                        }

                    }

                    this.animations_sequences_canvas_rotating["prevScorllDown"] = false;

                }   


            }


        // }
    }
}
customElements.define('sections-animation-scroll', SectionsAnimationScroll);