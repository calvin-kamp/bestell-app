import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export const swiper = {

    vars: {
        queries: {
            swiper:     '*[data-js=swiper]'
        },

        swiperSettings: {
            modules: [Navigation, Pagination],
            slidesPerView: "auto"
        }

    },

    init() {

        this.initializeSwiper();

    },

    initializeSwiper() {

        const $swiper = document.querySelector(this.vars.queries.swiper);

        new Swiper($swiper, this.vars.swiperSettings);

    }

}