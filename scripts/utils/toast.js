import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const base = {
    duration: 2500,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    close: true
};

export const toastCartAdded = (text = "Zum Warenkorb hinzugefügt") =>
    Toastify({
        ...base,
        text,
        className: "toast toast--primary",
        offset: { y: window.innerWidth >= 1024 ? 0 : 100 }
    }).showToast();

export const toastOrderSuccess = (text = "Bestellung erfolgreich") =>
    Toastify({
        ...base,
        text,
        className: "toast toast--success",
        offset: { y: window.innerWidth >= 1024 ? 0 : 100 }
    }).showToast();
