import { formatToCurrency } from "@utils/format-to-currency";

export class Dish {

    #dish
    constructor(dishData) {
        this.#dish = dishData;
    }

    get id() {
        return this.#dish.id;
    }

    get name() {
        return this.#dish.name;
    }

    get description() {
        return this.#dish.description;
    }

    get price() {
        return this.#dish.price;
    }

    get formatedPrice() {
        return formatToCurrency(this.price);
    }

    get category() {
        return this.#dish.category;
    }

}