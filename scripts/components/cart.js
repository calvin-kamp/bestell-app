import { cartStore } from '../stores/cart.js';
import { renderCart } from "../page.js";

export const cart = {

    vars: {
        queries: {
            component:                  '*[data-js=cart]',
            cartList:                   '*[data-cart-list]',
            cartItem:                   '*[data-cart-item]',
            orderBtn:                   '*[data-cart-order]'
        },

        classes: {
            cartListScrollable:         'cart__list--scrollable',
            cartHasScrollableList:      'cart--list-scrollable'
        }
    },

    init() {

        const $cart = document.querySelector(this.vars.queries.component);

        if(!$cart) {
            return;
        }

        this.addEventTrigger();
        this.checkIfScrollable();
        this.attachGlobalListeners();

    },

    attachGlobalListeners() {

        if(this.vars.listenersAttached) {
            return;
        }

        this.vars.listenersAttached = true;

        window.addEventListener('resize', () => {
            
            this.checkIfScrollable();
        
        })

    },

    addEventTrigger() {

        const $delivery = document.getElementById('deliveryType_delivery');
        const $pickup = document.getElementById('deliveryType_pickUp');
        const $order = document.querySelector(this.vars.queries.orderBtn);

        const { deliveryType } = cartStore.getCartData();

        if(deliveryType === 'pickup') {
            $pickup.checked = true;
        } else {
            $delivery.checked = true;
        }

        $delivery.addEventListener('change', () => {
            
            if($delivery.checked) {
                cartStore.setDeliveryType('delivery');
                renderCart();
                this.checkIfScrollable();
            }
            
        })
        
        $pickup.addEventListener('change', () => {
            
            if($pickup.checked) {
                cartStore.setDeliveryType('pickup');
                renderCart();
                this.checkIfScrollable();
            }
            
        })

        $order.addEventListener('click', () => {

            cartStore.clearCart();
            renderCart();
            this.checkIfScrollable();

        })

    },

    checkIfScrollable() {

        const $cart = document.querySelector(this.vars.queries.component);
        const $list = document.querySelector(this.vars.queries.cartList);
        
        if(!$cart || !$list) {
            return;
        }

        requestAnimationFrame(() => {

            const epsilon = 1;
            const scrollable = $list.scrollHeight > ($list.clientHeight + epsilon);

            $cart.classList.toggle(this.vars.classes.cartHasScrollableList, scrollable);
            $list.classList.toggle(this.vars.classes.cartListScrollable, scrollable);

            const sbw = scrollable ? ($list.offsetWidth - $list.clientWidth) : 0;
            $cart.style.setProperty('--cart-scrollbar-width', `${sbw}px`);

        })

    }

}
