let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
                    <p>${item.name} - ₹${item.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });

    totalPriceContainer.innerHTML = `Total: ₹${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

updateCart();

//product adding into localstorage

const cart1 = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const parent = e.target.closest(".product-card");
        const name = parent.querySelector("h3").textContent;
        const price = parseFloat(e.target.dataset.price);

        cart1.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart1));
        alert(`${name} added to cart!`);
    });
});


// Registration form validation
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;

    if (username && email && password) {
        alert('Registration successful!');
        // You can add the logic for saving the data here
    } else {
        alert('Please fill in all fields');
    }
});
