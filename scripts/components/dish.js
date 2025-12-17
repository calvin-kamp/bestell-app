import { cartStore } from "../stores/cart";
import { renderCart } from "../page.js";
import { updateCartButtonAmount } from '../utils/cart-amount-helper.js';

export const dish = {
    vars: {
        queries: {
            component:                  '*[data-js=dish]',
            addToCart:                  '*[data-add-to-cart]'
        },

        attributes: {
            addToCart:                  'data-add-to-cart'
        }
    },

    init() {

        const $dishes = document.querySelectorAll(this.vars.queries.component);
        
        if(!$dishes) {
            return;
        }

        this.addEventTrigger($dishes)

    },

    addEventTrigger($dishComponents) {

        for(const $dish of $dishComponents) {
            
            const $addToCart = $dish.querySelector(this.vars.queries.addToCart);

            $addToCart.addEventListener('click', () => {

                const dishId = $addToCart.getAttribute(this.vars.attributes.addToCart);
                
                cartStore.addToCart(dishId);
                updateCartButtonAmount();
                renderCart();

            })

        }

    }

}
