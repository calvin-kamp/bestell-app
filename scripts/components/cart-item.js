import { cartStore } from "../stores/cart";
import { formatToCurrency } from "../utils/format-to-currency";
import { renderCart } from "../page.js";

export const cartItem = {
    vars: {
        queries: {
            component:                  '*[data-js=cart-item]',
            quantityControl:            '*[data-js=quantity-control]',
            increase:                   '*[data-quantity-control-increase]',
            decrease:                   '*[data-quantity-control-decrease]',
            amount:                     '*[data-quantity-control-amount]',
            totalPrice:                 '*[data-cart-item-total-price]'
        },

        attributes: {
            productId:                  'data-quantity-control'
        }
    },

    init() {

        const $cartItems = document.querySelectorAll(this.vars.queries.component);
        if(!$cartItems || !$cartItems.length) {
            return;
        }

        this.addEventTrigger($cartItems);

    },

    addEventTrigger($cartItems) {

        for (const $cartItem of $cartItems) {

            const $quantityControl = $cartItem.querySelector(this.vars.queries.quantityControl);

            if(!$quantityControl) {
                continue;
            }

            const $increaseBtn = $quantityControl.querySelector(this.vars.queries.increase);
            const $decreaseBtn = $quantityControl.querySelector(this.vars.queries.decrease);

            const itemId = $quantityControl.getAttribute(this.vars.attributes.productId);

            if($increaseBtn) {
                $increaseBtn.addEventListener('click', () => {
                
                    cartStore.changeQuantity(itemId, 'increase');
                    renderCart();
                
                })
            }

            if($decreaseBtn) {
                $decreaseBtn.addEventListener('click', () => {
                    
                    cartStore.changeQuantity(itemId, 'decrease');
                    renderCart();
                
                })
            }

        }

    },

    updateTotalPrice(itemId, $totalPrice) {
        
        if(!$totalPrice) {
            return;
        }

        const { cartItems } = cartStore.getCartData();
        const item = cartItems.find((item) => String(item.id) === String(itemId));

        if(!item) {
            return;
        }

        $totalPrice.textContent = formatToCurrency(item.totalPrice);

    }

}
