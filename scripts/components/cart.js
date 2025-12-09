import { cartStore } from '../stores/cart.js';
import { renderCart } from "../page.js";

export const cart = {

    vars: {
        queries: {
            component:                  '*[data-js=cart]'
        }
    },

    init() {

        const $cart = document.querySelector(this.vars.queries.component);

        if(!$cart) {
            return;
        }

        this.addEventTrigger();

    },

    addEventTrigger() {

        const $delivery = document.getElementById('deliveryType_delivery');
        const $pickup = document.getElementById('deliveryType_pickUp');

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
            }
            
        })
        
        $pickup.addEventListener('change', () => {
            
            if($pickup.checked) {
                cartStore.setDeliveryType('pickup');
                renderCart();
            }
            
        })

    }

}