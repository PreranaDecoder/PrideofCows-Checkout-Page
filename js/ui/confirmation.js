export function showOrderConfirmation(orderId, paymentMethod) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="order-confirmation">
            <div class="success-checkmark">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <h2>Order Confirmed!</h2>
            <div class="order-details">
                <p>Order ID: ${orderId}</p>
                <p>Payment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                <p>Thank you for your purchase!</p>
                <p>Your order will be delivered soon.</p>
            </div>
            <button class="return-btn" onclick="window.location.reload()">Place New Order</button>
        </div>
    `;
}