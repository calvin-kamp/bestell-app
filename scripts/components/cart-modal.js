export const cartModal = {

    vars: {
        queries: {
            component:              '*[data-cart-modal]',
            openButton:             '*[data-modal-open-cart-button]',
            closeButton:            '*[data-modal-close-cart-button]',
            orderButton:            '*[data-cart-order]',
        }
    },

    init() {

        const $openButton = document.querySelector(this.vars.queries.openButton);
        const $closeButton = document.querySelector(this.vars.queries.closeButton);
        const $orderButton = document.querySelector(this.vars.queries.orderButton);

        if(!$openButton) {
            return;
        }

        $openButton.addEventListener('click', () => {

            this.open();

        })

        if($closeButton) {
            $closeButton.addEventListener('click', () => {

                this.close();

            })
        }

        $orderButton.addEventListener('click', () => {

            console.log('test')

            this.close();

        })

    },

    getDialog() {

        const $dialog = document.querySelector(this.vars.queries.component);

        if(!$dialog || !($dialog instanceof HTMLDialogElement)) {
            return null;
        }

        if(!$dialog.isConnected) {
            return null;
        }

        return $dialog;

    },

    open() {

        const $dialog = this.getDialog();

        if(!$dialog) {
            return;
        }

        if(!$dialog.open) {

            $dialog.showModal();

        }
    },

    close() {

        const $dialog = this.getDialog();

        if(!$dialog) {

            return;

        }

        if($dialog.open) {

            $dialog.close();

        }

    }
}
