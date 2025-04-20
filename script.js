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
        // Check if user is logged in (based on localStorage)
        const currentUser = localStorage.getItem("user");

        if (!currentUser) {
            // User not logged in, redirect to login page
            // alert("Please log in to access your cart.");
            window.location.href = "login.html";
            return;
        }

        const parent = e.target.closest(".product-card");
        const name = parent.querySelector("h3").textContent;
        const price = parseFloat(e.target.dataset.price);

        cart1.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart1));
        // alert(`${name} added to cart!`);
    });
});


// Registration form validation
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    // Basic Validation
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already registered with this email.");
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        username,
        email,
        password
    };

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    window.location.href = 'login.html'; // Optional: Redirect to login page
});


//  Login Form JavaScript (Validation + localStorage Verification)
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        alert("Invalid email or password");
        return;
    }

    // Save logged-in user
    localStorage.setItem("user", JSON.stringify(validUser));
    alert("Login successful!");
    window.location.href = "index.html";
});

//Navbar update for logged in user and Logout button
window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const navList = document.querySelector("nav ul");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username) {
        // Remove "Login" link if present
        const loginLink = navList.querySelector("a[href='login.html']");
        if (loginLink) {
            loginLink.parentElement.remove();
        }

        // Create list item for greeting
        const welcomeItem = document.createElement("a");
        welcomeItem.textContent = `Welcome, ${user.username}`;
        welcomeItem.classList.add("nav-greeting");
        welcomeItem.addEventListener("click",()=>{
            window.location.href = "account.html";
        })

        // Create list item for logout button
        const logoutItem = document.createElement("li");
        const logoutButton = document.createElement("a");
        logoutButton.textContent = "Logout";
        logoutButton.style.cursor = "pointer";
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("user");
            alert("You have been logged out.");
            location.reload(); // Reload page to reflect change
        });

        logoutItem.appendChild(logoutButton);

        // Append greeting and logout button to navbar
        navList.appendChild(logoutItem);
        nav.appendChild(welcomeItem);
    }
});

// Contact form email submission
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const params = {
        name: name,
        contact_email: email,
        message: message
    };

    emailjs.send("service_noh0fr8", "template_aqadljt", params)
        .then(() => {
            alert("Message sent successfully!");
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error("Email send error:", error);
            alert("Oops! Something went wrong. Try again later.");
        });
});
