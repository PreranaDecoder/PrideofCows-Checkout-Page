import { Cart } from "./js/cart.js";
import { processPayment } from "./js/payment/processor.js";
import { products } from "./js/products.js";
import {
  showPaymentMethods,
  showOrderConfirmation,
  showNotification,
  renderProducts,
  renderCart,
} from "./js/ui/index.js";

const cart = new Cart();

// Make necessary functions available globally
window.showNotification = showNotification;
window.selectedPaymentMethod = "online";

window.confirmOrder = async function () {
  const selectedMethod = window.selectedPaymentMethod;
  if (!selectedMethod) {
    showNotification("Please select a payment method", "error");
    return;
  }

  const orderDetails = { total: window.orderTotal }; // Ensure this variable is set when order is initialized

  try {
    const result = await processPayment(selectedMethod, orderDetails);
    if (result.success) {
      // Use the custom function to display the confirmation message
      showOrderConfirmation(result.orderId, selectedMethod);
    }
  } catch (error) {
    showNotification(error.message || "Payment failed", "error");
  }
};

window.goToHome = function () {
  // Redirect to home page after user interaction
  window.location.href = "/";
};

function init() {
  const productsList = document.getElementById("allProductsList");
  renderProducts(products, productsList);
  setupEventListeners();
  updateCartUI();
}

function setupEventListeners() {
  // Product list events
  document.getElementById("allProductsList").addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = e.target.closest(".product-card").dataset.id;
      const product = products.find((p) => p.id === productId);
      if (product) {
        cart.addItem(product);
        showNotification("Product added to cart", "success");
        updateCartUI();
      }
    }
  });

  // Cart quantity controls
  document.getElementById("cartItems").addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const productId = cartItem.dataset.id;
      const change = e.target.classList.contains("increase") ? 1 : -1;

      cart.updateQuantity(productId, change);
      updateCartUI();
    }
  });

  // Coupon code handling
  document.querySelector(".coupon-btn").addEventListener("click", () => {
    const code = document.getElementById("couponInput").value;
    const result = cart.applyCouponCode(code);
    showNotification(result.message, result.valid ? "success" : "error");
    updateCartUI();
  });

  // Form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const { total } = cart.calculateTotals();

      if (total === 0) {
        showNotification("Your cart is empty", "error");
        return;
      }

      showPaymentMethods(total);
    });
}

function updateCartUI() {
  const { subtotal, discount, tax, total } = cart.calculateTotals();

  // Update cart count
  document.querySelector(
    ".cart-count"
  ).textContent = `${cart.items.length} ITEMS`;

  // Update cart items
  renderCart(cart);

  // Update totals
  document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `₹${total.toFixed(2)}`;

  // Set global order total for reference
  window.orderTotal = total;
}

init();
