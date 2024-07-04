// toast.js
export function showToast(message, isError) {
    Toastify({
        text: message,
        duration: 10000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        style: {
            background: isError ? "linear-gradient(to right, #a83232, #a83232)" : "linear-gradient(to right, #32a852, #32a852)",
            color: "#fff",
            boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.3)"
        },
        className: "info",
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}