export const restaurantIntroTemplate = (restaurant) => {

    return `
        <section class="restaurant">
            <figure class="restaurant__banner">
                <picture>
                    <img src="${restaurant.bannerImage}" alt="${restaurant.name}-${restaurant.description}">
                </picture>
            </figure>

            <div class="restaurant__wrapper">
                <h1 class="restaurant__name">
                    ${restaurant.name}
                </h1>

                <nav class="restaurant__navigation swiper" data-js="swiper">
                    <ul class="restaurant__category-list swiper-wrapper">
                        ${restaurant.dishesCategories.map(category => (
                            `
                                <li class="restaurant__category swiper-slide">
                                    <a href="#${category}">
                                        ${category}
                                    </a>
                                </li>
                            `
                        )).join('')}
                    </ul>
                </nav>
            </div>

        </section>
    `

}