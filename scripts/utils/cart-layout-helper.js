import { renderCart } from '../page.js';
import { cartStore } from '../stores/cart.js';

export const cartLayoutHelper  = {

    vars: {
        windowWidth:        0,
        bigBreakpoint:      null,
        cartStore:          {}
    },

    init() {

        this.setVariables();
        this.addEventTrigger();

        if(this.vars.bigBreakpoint) {
            renderCart(this.vars.cartStore, 'aside');
        } else {
            renderCart(this.vars.cartStore, 'dialog');
        }

    },

    setVariables() {

        this.vars.windowWidth = window.innerWidth;
        this.vars.cartStore = cartStore.getCartData();
        this.vars.bigBreakpoint = this.vars.windowWidth >= 1024;

    },

    addEventTrigger() {

        window.addEventListener('resize', () => {

            this.handleResize();

        })

    },

    handleResize() {

        this.vars.windowWidth = window.innerWidth;
        const isBigBreakpoint = this.vars.windowWidth >= 1024;

        if(isBigBreakpoint === this.vars.bigBreakpoint) {
            return;
        }

        this.vars.bigBreakpoint = isBigBreakpoint;

        renderCart();

    }

}
