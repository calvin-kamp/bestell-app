import { cartStore } from '../stores/cart';

export const updateCartButtonAmount = () => {
    const $btn = document.querySelector('[data-modal-open-cart-button]');
    
    if(!$btn) {
        return
    }

    const { itemsAmount } = cartStore.getCartData();
    $btn.setAttribute('data-cart-item-amount', String(itemsAmount));

}