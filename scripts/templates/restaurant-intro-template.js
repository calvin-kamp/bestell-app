export const restaurantIntroTemplate = (restaurant) => {
    
    return `
        <section class="restaurant">
            <figure class="restaurant__banner">
                <picture>
                    <img src="${restaurant.bannerImage}" alt="${restaurant.name}-${restaurant.description}">
                </picture>
            </figure>

            <h1 class="restaurant__name">
                ${restaurant.name}

                <span>
                    - ${restaurant.description}
                </span>
            </h1>

            <nav class="restaurant__navigation swiper">
                <ul class="swiper-wrapper">
                    ${restaurant.dishesCategories.map(category => (
                        `
                        <li class="swiper-slide">
                            <a href="#${category}">
                                ${category}
                            </a>
                        </li>
                        `
                    )).join('')}

                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </ul>
            </nav>
        </section>
    `

}