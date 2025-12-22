export const cartModal = {
    vars: {
        queries: {
            component: '*[data-cart-modal]',
            openButton: '*[data-modal-open-cart-button]',
            closeButton: '*[data-modal-close-cart-button]',
            orderButton: '*[data-cart-order]',
        },
    },

    init() {
        const $dialog = document.querySelector(this.vars.queries.component)

        if (!$dialog) {
            return
        }

        this.addEventTrigger()
    },

    addEventTrigger() {
        const $openButton = document.querySelector(this.vars.queries.openButton)
        const $closeButton = document.querySelector(this.vars.queries.closeButton)
        const $orderButton = document.querySelector(this.vars.queries.orderButton)

        $openButton.addEventListener('click', () => {
            this.open()
        })

        if ($closeButton) {
            $closeButton.addEventListener('click', () => {
                this.close()
            })
        }

        $orderButton.addEventListener('click', () => {
            this.close()
        })
    },

    getDialog() {
        const $dialog = document.querySelector(this.vars.queries.component)

        if (!$dialog || !($dialog instanceof HTMLDialogElement)) {
            return null
        }

        if (!$dialog.isConnected) {
            return null
        }

        return $dialog
    },

    open() {
        const $dialog = this.getDialog()

        if (!$dialog) {
            return
        }

        if (!$dialog.open) {
            const $body = document.body

            $body.style.overflow = 'hidden'
            $body.style.height = '100vh'

            $dialog.showModal()
        }
    },

    close() {
        const $dialog = this.getDialog()

        if (!$dialog) {
            return
        }

        if ($dialog.open) {
            const $body = document.body

            $body.style.overflow = ''
            $body.style.height = ''

            $dialog.close()
        }
    },
}
