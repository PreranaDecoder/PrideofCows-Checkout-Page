export const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Pay securely with your card",
  },
  { id: "upi", name: "UPI", description: "Pay using UPI" },
];

export function processPayment(method, orderDetails) {
  // Simulate payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
      });
    }, 1500);
  });
}
