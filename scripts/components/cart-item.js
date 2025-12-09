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
            const $amount = $quantityControl.querySelector(this.vars.queries.amount);
            const $totalPrice = $cartItem.querySelector(this.vars.queries.totalPrice);

            const itemId = $quantityControl.getAttribute(this.vars.attributes.productId);

            $increaseBtn.addEventListener('click', () => {

                const result = cartStore.changeQuantity(itemId, 'increase');

                if(result.quantity > 1) {
                    $decreaseBtn.innerHTML = '-';
                }

                if(!result.removed) {
                    $amount.textContent = result.quantity;
                    this.updateTotalPrice(itemId, $totalPrice);
                }

            })

            $decreaseBtn.addEventListener('click', () => {

                const result = cartStore.changeQuantity(itemId, 'decrease');

                if(result.quantity === 1) {
                    $decreaseBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 6-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 0 1-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 0 1-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6"/></svg>
                    `;
                }

                if(result.removed) {
                    $cartItem.remove();
                    renderCart()
                } else {
                    $amount.textContent = result.quantity;
                    this.updateTotalPrice(itemId, $totalPrice);
                }

            })

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
