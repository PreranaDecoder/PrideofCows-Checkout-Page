// Coupon management
export const coupons = {
    'PRIDE10': {
        discount: 0.10,
        description: '10% off on your order'
    }
};

export function applyCoupon(code, subtotal) {
    const coupon = coupons[code.toUpperCase()];
    if (coupon) {
        return {
            valid: true,
            discount: subtotal * coupon.discount,
            message: 'Coupon applied successfully!'
        };
    }
    return {
        valid: false,
        discount: 0,
        message: 'Invalid coupon code'
    };
}