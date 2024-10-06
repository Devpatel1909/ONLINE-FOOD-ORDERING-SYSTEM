// Sample food items (Replace these with actual items from your database)
const foodItems = [
  { id: 1, name: "Pizza", price: 300 },
  { id: 2, name: "Burger", price: 150 },
  // Add more food items as needed
];

let cart = []; // Empty cart for a new customer

// Function to simulate adding a food item to the cart
function addFoodToCart(itemId) {
  const item = foodItems.find((food) => food.id === itemId);
  if (item) {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem) {
      // If item already exists in the cart, increase quantity
      existingItem.quantity++;
    } else {
      // If item doesn't exist, add it to the cart with quantity 1
      cart.push({ ...item, quantity: 1 });
    }
    loadCartItems();
  }
}

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
    cartTable.innerHTML = ""; // Clear existing content

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      let row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" value="${
                  item.quantity
                }" min="1" data-id="${item.id}" class="quantity-input"></td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
                <td><button class="remove-btn" data-id="${
                  item.id
                }">Remove</button></td>
            `;
      cartTable.appendChild(row);
    });

    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
  }
}

// Add event listeners for food item buttons (for demonstration)
document.addEventListener("DOMContentLoaded", () => {
  // Simulate adding food items to the cart when the page loads
  addFoodToCart(1); // Add Pizza to cart
  addFoodToCart(2); // Add Burger to cart
});

// Event listener to handle removing items
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    let itemId = parseInt(e.target.getAttribute("data-id"));
    cart = cart.filter((item) => item.id !== itemId);
    loadCartItems();
  }
});

// Event listener to handle quantity change
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("quantity-input")) {
    let itemId = parseInt(e.target.getAttribute("data-id"));
    let newQuantity = parseInt(e.target.value);
    cart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    loadCartItems();
  }
});
