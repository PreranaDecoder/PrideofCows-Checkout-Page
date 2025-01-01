import {
  PAYMENT_METHODS,
  MINIMUM_COD_AMOUNT,
  ONLINE_PAYMENT_DISCOUNT,
} from "../payment/constants.js";
import { validatePayment } from "../payment/validation.js";
import { showNotification } from "./notifications.js";

export function showPaymentMethods(total) {
  const mainContent = document.querySelector(".main-content");
  const onlineTotal = total * (1 - ONLINE_PAYMENT_DISCOUNT);

  mainContent.innerHTML = `
        <div class="payment-section animate-fade-in">
            <h2>Select Payment Method</h2>
            <div class="payment-methods">
                <div class="payment-method" data-method="${
                  PAYMENT_METHODS.ONLINE
                }">
                    <h3>Online Payment</h3>
                    <p>Pay securely online</p>
                    <p class="discount-text">Get 5% discount</p>
                    <p class="price">Final amount: ₹${onlineTotal.toFixed(
                      2
                    )}</p>
                </div>
                <div class="payment-method" data-method="${
                  PAYMENT_METHODS.COD
                }">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when you receive your order</p>
                    <p class="minimum-text">Minimum order: ₹${MINIMUM_COD_AMOUNT}</p>
                    <p class="price">Final amount: ₹${total.toFixed(2)}</p>
                </div>
            </div>
            <button class="purchase-btn" onclick="window.confirmOrder()">Confirm Order</button>
        </div>
    `;

  // Add payment method selection functionality
  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      const methodType = method.dataset.method;
      const validation = validatePayment(methodType, total);

      if (!validation.valid) {
        showNotification(validation.message, "error");
        return;
      }

      paymentMethods.forEach((m) => m.classList.remove("selected"));
      method.classList.add("selected");
      window.selectedPaymentMethod = methodType;
    });
  });

  // Select online payment by default
  paymentMethods[0].click();
}
