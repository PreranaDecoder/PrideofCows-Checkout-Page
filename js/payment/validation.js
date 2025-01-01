import { MINIMUM_COD_AMOUNT } from './constants.js';

export function validatePayment(method, amount) {
    if (method === 'cod' && amount < MINIMUM_COD_AMOUNT) {
        return {
            valid: false,
            message: `Minimum order amount for COD is ₹${MINIMUM_COD_AMOUNT}`
        };
    }
    return { valid: true };
}