import { formatToCurrency } from '../utils/format-to-currency'

export const cartItemTemplate = (item) => {

    return `
        <article class="cart-item" data-js="cart-item">
            <h3 class="cart-item__title">
                ${item.name}
            </h3>

            <div>
                <div class="cart-item__quantity-control" data-js="quantity-control" data-quantity-control=${item.id}>
                    <button data-quantity-control-decrease class="quantity-controll__decrease">
                        ${item.quantity > 1 ? (
                            '-'
                        ) : (
                            '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 6-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 0 1-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 0 1-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6"/></svg>'
                        )}
                    </button>

                    <span class="quantity-control__amount" data-quantity-control-amount>
                        ${item.quantity}
                    </span>

                    <button data-quantity-control-increase class="quantity-controll__increase">
                        +
                    </button>

                </div>

                <strong class="cart-item__total-price" data-cart-item-total-price>
                    ${formatToCurrency(item.totalPrice)}
                </strong>
            </div>
        
        </article>
    `

}