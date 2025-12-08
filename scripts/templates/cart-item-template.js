export const cartItemTemplate = (item) => {

    return `
        <article class="cart-item">
            <h3 class="cart-item__title">
                ${item.name}
            </h3>

            <div class="cart-item__quantity-control" data-cart-quantity-control>
                <button data-quantity-control-decrease class="quantity-controll__decrease">
                    -
                </button>

                <span data-quantity-control-amount>
                    ${item.quantity}
                <span/>

                <button data-quantity-control-increase class="quantity-controll__increase">
                    +
                </button>
            </div>

            <strong class="cart-item__total-price">
                ${item.formatedTotalPrice}
            </strong>
        
        </article>
    `

}