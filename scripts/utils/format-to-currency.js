export const formatToCurrency = (amount = 0, currency = "EUR", locale = "de-DE") => {

    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);

}