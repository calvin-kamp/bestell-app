import { restaurantData } from "../data/restaurant.js";
import { localStorageHelper } from "../utils/local-storage-helper.js";

const cart = {
    cartItems: []
};

export const cartStore = {

    init() {

        const savedCart = localStorageHelper.getItem('cart', null);

        if (savedCart && Array.isArray(savedCart.cartItems)) {
            cart.cartItems = savedCart.cartItems;
        } else {
            cart.cartItems = [];
            this.save();
        }

    },

    findDishById(dishId) {

        return restaurantData.menu.find((dish) => String(dish.id) === String(dishId));

    },

    findCartItemIndex(dishId) {

        return cart.cartItems.findIndex((item) => String(item.id) === String(dishId));

    },

    getCartData() {
        return cart;
    },

    addToCart(dishId) {
        const dishData = this.findDishById(dishId);

        if (!dishData) {
            return;
        }

        const itemIndex = this.findCartItemIndex(dishData.id);

        if (itemIndex !== -1) {
            cart.cartItems[itemIndex].quantity += 1;
        } else {
            cart.cartItems.push({
                id: dishData.id,
                name: dishData.name,
                price: dishData.price,
                quantity: 1
            });
        }

        this.save();

    },

    changeQuantity(dishId, type) {

        const itemIndex = this.findCartItemIndex(dishId);

        if (itemIndex === -1) {
            return;
        }

        if (type === 'increase') {
            cart.cartItems[itemIndex].quantity += 1;
        }

        if (type === 'decrease') {
            cart.cartItems[itemIndex].quantity -= 1;

            if (cart.cartItems[itemIndex].quantity <= 0) {
                cart.cartItems.splice(itemIndex, 1);
            }
        }

        this.save();
    },

    save() {

        localStorageHelper.setItem('cart', cart);

    }

};
