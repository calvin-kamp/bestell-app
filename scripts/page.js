import { restaurantData } from './data/restaurant.js';
import { Restaurant as RestaurantModel } from './models/restaurant.js';
import { menuTemplate } from './templates/menu-template.js';
import { cartTemplate } from './templates/cart-template.js';
import { restaurantIntroTemplate } from './templates/restaurant-intro-template.js';
import { cartStore } from './stores/cart.js';
import { cart as cartScript } from './components/cart.js';
import { cartItem } from './components/cart-item.js';
import { swiper } from './components/swiper.js';
import { cartModal } from './components/cart-modal.js';
import { updateCartButtonAmount } from './utils/cart-amount-helper.js';

const restaurant = new RestaurantModel(restaurantData);

export const renderPage = () => {

    const cart = cartStore.getCartData();

    document.getElementById('main').innerHTML = `
        ${restaurantIntroTemplate(restaurant)}
        <div>
            ${menuTemplate(restaurant.dishesByCategory)}
        </div>
        <div class="sticky-button">
            <button class="button button--primary" data-modal-open-cart-button data-cart-item-amount=${cart.itemsAmount}>
                Warenkorb
            </button>
        </div>
        ${cartTemplate(cart)}
    `;

    swiper.init();

};

export const renderCart = () => {

    const cart = cartStore.getCartData();
    const $oldCart = document.querySelector('[data-js="cart"]');

    if (!$oldCart) {
        return;
    }

    const isDialog = $oldCart.tagName === 'DIALOG';
    const wasOpen = isDialog && $oldCart.open === true;

    const bigBreakpoint = window.innerWidth >= 1024;
    const layout = bigBreakpoint ? 'aside' : 'dialog';

    $oldCart.outerHTML = cartTemplate(cart, layout);

    const $newCart = document.querySelector('[data-js="cart"]');

    cartItem.init();
    cartScript.init();
    cartModal.init();
    updateCartButtonAmount();

    if (!bigBreakpoint && wasOpen && $newCart && $newCart.showModal) {
        $newCart.showModal();
    }

}
