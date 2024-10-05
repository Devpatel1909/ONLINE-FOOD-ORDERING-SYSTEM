// Sample cart data for demonstration (Modify this based on your backend logic)
let cart = [];  // Empty cart for a new customer

// Function to load cart items into the table
function loadCartItems() {
    let cartTable = document.querySelector("#cart-items tbody");
    let cartContainer = document.getElementById("cart-container");
    let emptyCartMessage = document.getElementById("empty-cart-message");

    if (cart.length === 0) {
        // If cart is empty, show the empty cart message
        emptyCartMessage.classList.remove("hidden");
        cartContainer.classList.add("hidden");
    } else {
        // If cart is not empty, show the cart items and summary
        emptyCartMessage.classList.add("hidden");
        cartContainer.classList.remove("hidden");
        cartTable.innerHTML = "";  // Clear existing content

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
                <td><button class="remove-btn" data-id="${item.id}">Remove</button></td>
            `;
            cartTable.appendChild(row);
        });

        document.getElementById('total-items').innerText = totalItems;
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    }
}

// Event listener to handle removing items
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        let itemId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== itemId);
        loadCartItems();
    }
});

// Event listener to handle quantity change
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity-input')) {
        let itemId = parseInt(e.target.getAttribute('data-id'));
        let newQuantity = parseInt(e.target.value);
        cart = cart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
        loadCartItems();
    }
});

// Initial load of cart items
document.addEventListener('DOMContentLoaded', loadCartItems);
