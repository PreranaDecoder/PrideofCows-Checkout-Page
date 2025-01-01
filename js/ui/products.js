export function renderProducts(products, container) {
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/200x200?text=${encodeURIComponent(product.name)}'">
            <h3>${product.name}</h3>
            <p>${product.pack}</p>
            <div class="product-footer">
                <span class="price">₹${product.price.toFixed(2)}</span>
                <button class="btn btn-primary add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

export function renderCart(cart) {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = cart.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}"
                 onerror="this.src='https://via.placeholder.com/80x80?text=${encodeURIComponent(item.name)}'">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.pack}</p>
                <p class="price">₹${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button class="btn quantity-btn decrease">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="btn quantity-btn increase">+</button>
            </div>
        </div>
    `).join('');
}