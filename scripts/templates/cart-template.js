import { cartItemTemplate } from './cart-item-template';

const cart = {
    cartItems: [
        {
            id: "001",
            name: "test",
            quantity: 2,
            price: 13.99,
            formatedTotalPrice: "27,97€"
        },
        {
            id: "002",
            name: "test",
            quantity: 2,
            price: 13.99,
            formatedTotalPrice: "27,97€"
        },
    ],
    itemsTotal: "27,97€",
    noDeliveryFee: false,
    deliveryFee: 3.99,
    total: 2
}

export const cartTemplate = () => {

    return `
        <aside class="cart" data-js="cart">
            <h2 class="cart__title">
                Warenkorb
            </h2>

            <fieldset aria-label="Art der Bestellung" class="cart__delivery-type-switch">
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
            </fieldset>

            <ul class="cart__list">
                ${cart.cartItems.map(cartItem => (
                    `
                        <li class="cart__item">
                            ${cartItemTemplate(cartItem)}
                        </li>
                    `
                ))}
            </ul>

            <div class="cart__summary">
                <span>
                    Zwischensumme
                </span>

                <span>
                    ${cart.itemsTotal}
                </span>

                ${!cart.noDeliveryFee && (
                    `
                        <span>
                            Liefergebühr
                        </span>

                        <span>
                            ${cart.deliveryFee}
                        </span>
                    `
                )}
            </div>

            <div class="cart__total">
                <strong>
                    Gesamt
                </strong>

                <strong>
                    ${cart.total}
                </strong>
            </div>

        </aside>
    `

}