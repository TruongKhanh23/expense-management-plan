import { toast } from 'vue3-toastify';

export function toastWithPromise(promise, pendingMessage, successMessage, errorMessage) {
    toast.promise(promise, {
        pending: pendingMessage,
        success: {
            render() {
                return successMessage;
            },
        },
        error: {
            render({ data }) {
                // data sẽ là lỗi được trả về từ promise
                return `${errorMessage}: ${data.message}`;
            },
        },
    }, {
        pauseOnFocusLoss: false,
        position: "bottom-left",
        theme: "colored",
        autoClose: 1000,
        dangerouslyHTMLString: true,
    });
}