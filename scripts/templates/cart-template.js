import { cartItemTemplate } from './cart-item-template';
import { formatToCurrency } from '../utils/format-to-currency'

export const cartTemplate = (cart, layout = 'aside') => {
    return `
        <${layout} class="cart cart--${layout}" data-js="cart" ${layout === 'dialog' ? 'data-cart-modal' : ''}>
            <div class="cart__wrapper">
                ${layout === 'dialog' ? (
                    `
                        <button class="cart__close button--primary" data-modal-close-cart-button>X</button>
                    `
                ) : ('')}

                <h2 class="cart__title">
                    Warenkorb
                </h2>

                <fieldset aria-label="Art der Bestellung" class="cart__delivery-type-switch">
                    <div>
                        <input type="radio" id="deliveryType_delivery" name="deliveryType">
                        <label for="deliveryType_delivery">
                            <span>
                                Lieferung
                            </span>
                        </label>

                        <input type="radio" id="deliveryType_pickUp" name="deliveryType">
                        <label for="deliveryType_pickUp">
                            <span>
                                Abholung
                            </span>
                        </label>
                    </div>
                </fieldset>

                <ul class="cart__list" data-cart-list>
                    ${cart.cartItems.map(cartItem => (
                        `
                            <li class="cart__item">
                                ${cartItemTemplate(cartItem)}
                            </li>
                        `
                    )).join('')}
                </ul>

                <div class="cart__summary">
                    <span>
                        Zwischensumme
                    </span>

                    <span>
                        ${formatToCurrency(cart.itemsTotal)}
                    </span>

                    ${cart.deliveryFee > 0 ? 
                    `
                        <span>Liefergebühr</span>
                        <span>${formatToCurrency(cart.deliveryFee)}</span>
                    ` : 
                    `
                        <span>Liefergebühr</span>
                        <span>0 €</span>
                    `}
                </div>

                <div class="cart__total">
                    <strong>
                        Gesamt
                    </strong>

                    <strong>
                        ${formatToCurrency(cart.total)}
                    </strong>
                </div>

                <button class="cart__order button--primary" ${cart.cartItems?.length > 0 ? '' : 'disabled'} data-cart-order>
                    Bestellen
                </button>
            </div>
        </${layout}>
    `
}
