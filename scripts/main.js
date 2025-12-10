import {renderPage} from './page'
import { dish } from './components/dish.js';
import { cartStore } from './stores/cart.js';
import { cartItem } from './components/cart-item.js';
import { cart } from './components/cart.js';
import { cartModal } from './components/cart-modal.js';
import { cartLayoutHelper } from './utils/cart-layout-helper.js';

cartStore.init();
renderPage();
dish.init();
cart.init()
cartItem.init();
cartLayoutHelper.init();
cartModal.init();