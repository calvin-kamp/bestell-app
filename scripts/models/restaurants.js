import { Dish } from "@models/dish.js";

export class Restaurant {

    #restaurant
    #menu
    constructor(restaurantData) {
        this.#restaurant = restaurantData;
        this.#menu = restaurantData.menu.map(d => new Dish(d));
    }

    get name() {
        return this.#restaurant.name;
    }

    get description() {
        return this.#restaurant.description;
    }

    get bannerImage() {
        return this.#restaurant.bannerImage;
    }

    get rating() {
        return this.#restaurant.rating;
    }

    get offersDelivery() {
        return this.#restaurant.offersDelivery;
    }

    get delivery() {
        return this.#restaurant.delivery;
    }

    get offersPickup() {
        return this.#restaurant.offersPickup;
    }

    get pickUp() {
        return this.#restaurant.pickUp;
    }

    get menu() {
        return this.#menu;
    }

    get dishesCategories() {
        return [...new Set(this.#menu.map(dish => dish.category))];
    }

    get dishesByCategory() {

        const categories = this.dishesCategories;
        const dishes = this.#menu;

        return categories.map((categoryName) => {

            const categoryDishes = dishes.filter((dish) => dish.category === categoryName);

            return {
                category: categoryName,
                dishes: categoryDishes
            };

        });

    }

}
