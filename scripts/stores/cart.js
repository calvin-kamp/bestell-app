import { restaurantData } from "../data/restaurant.js";
import { localStorageHelper } from "../utils/local-storage-helper.js";

const cart = {
    cartItems: [],
    priceTotal: 0,
    deliveryFee: 0,
    deliveryType: 'delivery'
};

export const cartStore = {

    init() {

        const savedCart = localStorageHelper.getItem('cart', null);

        if(savedCart && Array.isArray(savedCart.cartItems)) {
            cart.cartItems = savedCart.cartItems;
            cart.priceTotal = savedCart.priceTotal ?? 0;
            cart.deliveryFee = savedCart.deliveryFee ?? 0;
            cart.deliveryType = savedCart.deliveryType ?? 'delivery';
        } else {
            cart.cartItems = [];
            cart.deliveryType = 'delivery';
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

        const itemsTotal = cart.priceTotal;
        const deliveryFee = cart.deliveryFee;
        const total = cart.priceTotal + cart.deliveryFee;
        const noDeliveryFee = cart.deliveryFee === 0;

        return {
            ...cart,
            itemsTotal,
            deliveryFee,
            total,
            noDeliveryFee
        };

    },

    addToCart(dishId) {

        const dishData = this.findDishById(dishId);

        if(!dishData) {
            return;
        }

        const itemIndex = this.findCartItemIndex(dishData.id);

        if(itemIndex !== -1) {
            cart.cartItems[itemIndex].quantity += 1;
        } else {
            cart.cartItems.push({
                id: dishData.id,
                name: dishData.name,
                price: dishData.price,
                quantity: 1,
                totalPrice: dishData.price
            });
        }

        this.save();
    },

    changeQuantity(dishId, type) {

        const itemIndex = this.findCartItemIndex(dishId);

        if(itemIndex === -1) {
            return { removed: false, quantity: 0 };
        }

        if(type === 'increase') {
            cart.cartItems[itemIndex].quantity += 1;
        }

        if(type === 'decrease') {
            cart.cartItems[itemIndex].quantity -= 1;

            if(cart.cartItems[itemIndex].quantity <= 0) {
                cart.cartItems.splice(itemIndex, 1);
                this.save();
                return { removed: true, quantity: 0 };
            }
        }

        this.save();

        return {
            removed: false,
            quantity: cart.cartItems[itemIndex].quantity
        };

    },

    setDeliveryType(type) {
        if(type !== 'delivery' && type !== 'pickup') {
            return;
        }

        cart.deliveryType = type;
        this.save();
    },

    save() {

        this.recalculateTotals();
        localStorageHelper.setItem('cart', cart);

    },

    recalculateTotals() {

        let itemsTotal = 0;

        for (const item of cart.cartItems) {
            item.totalPrice = item.price * item.quantity;
            itemsTotal += item.totalPrice;
        }

        cart.priceTotal = itemsTotal;

        const {
            offersDelivery,
            offersPickup,
            delivery
        } = restaurantData;

        const baseDeliveryFee = delivery?.deliveryFee;
        const freeThreshold = delivery?.freeDeliveryThreshold;

        if(!offersDelivery) {
            cart.deliveryFee = 0;
            return;
        }

        if(cart.deliveryType === 'pickup' && offersPickup) {
            cart.deliveryFee = 0;
            return;
        }

        if(itemsTotal >= freeThreshold) {
            cart.deliveryFee = 0;
            return;
        }

        cart.deliveryFee = baseDeliveryFee;

    }

}
