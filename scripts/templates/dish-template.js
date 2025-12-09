export const dishTemplate = (dish) => {

    return `
        <article class="dish" data-js="dish">
            <button data-add-to-cart=${dish.id}>
                <h3 class="dish__name">
                    ${dish.name}
                </h3>

                <strong class="dish__price">
                    ${dish.formatedPrice}
                </strong>

                <span class="dish__description">
                    ${dish.description}
                </span>
            </button>
        </article>
    `

}
