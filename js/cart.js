import { applyCoupon } from './coupons.js';

export class Cart {
    constructor() {
        this.items = [];
        this.couponDiscount = 0;
        this.appliedCoupon = null;
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
    }

    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    applyCouponCode(code) {
        const subtotal = this.calculateSubtotal();
        const result = applyCoupon(code, subtotal);
        if (result.valid) {
            this.couponDiscount = result.discount;
            this.appliedCoupon = code;
        }
        return result;
    }

    calculateSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    calculateTotals() {
        const subtotal = this.calculateSubtotal();
        const discount = this.couponDiscount;
        const discountedSubtotal = subtotal - discount;
        const tax = discountedSubtotal * 0.18;
        const total = discountedSubtotal + tax;

        return { subtotal, discount, tax, total };
    }
}