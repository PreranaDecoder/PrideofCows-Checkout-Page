import { PAYMENT_METHODS, ONLINE_PAYMENT_DISCOUNT } from './constants.js';

export async function processPayment(method, orderDetails) {
    // Simulate payment processing
    return new Promise((resolve) => {
        setTimeout(() => {
            const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
            resolve({
                success: true,
                orderId,
                timestamp: new Date().toISOString(),
                discount: method === PAYMENT_METHODS.ONLINE ? ONLINE_PAYMENT_DISCOUNT : 0
            });
        }, 1500);
    });
}