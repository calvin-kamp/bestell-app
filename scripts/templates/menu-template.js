import { dishTemplate } from './dish-template';

export const menuTemplate = (category) => {

    return `
        ${category.map(category => (
            `
                <section class="menu" id="${category.name}">
                    <h2 class="menu__title">
                        ${category.name}
                    </h2>
        
                    <ul class="menu__list">
                        ${category.dishes.map(dish => (
                            `
                                <li class="menu__item">
                                    ${dishTemplate(dish)}
                                </li>
                            `
                        )).join('')}
                    </ul>
                </section>
            `
        )).join('')}
    `

}
