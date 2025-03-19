let cart = [];

function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to invoice!");
}

window.onload = function() {
    // Redirect to login page if not logged in
    if (!localStorage.getItem("loggedIn") && !window.location.pathname.includes("login.html")) {
        window.location.href = "login.html";
    }

    // Checkout button functionality
    let checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function() {
            alert("Proceeding to checkout...");
        });
    }

    // Clear Invoice button functionality
    let clearInvoiceButton = document.getElementById("clear-invoice-button");
    if (clearInvoiceButton) {
        clearInvoiceButton.addEventListener("click", function() {
            cart = []; // Clear the cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
            document.getElementById("invoice-list").innerHTML = ""; // Clear the invoice list
            document.getElementById("subtotal").textContent = "Subtotal: $0";
            document.getElementById("tax").textContent = "Tax: $0";
            document.getElementById("total").textContent = "Total: $0";
            alert("Invoice cleared!");
        });
    }

    if (window.location.pathname.includes("invoice.html")) {
        let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        let subtotal = 0;
        let taxRate = 0.1; // 10% tax rate
        let list = document.getElementById("invoice-list");

        storedCart.forEach(item => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.product}</td><td>1</td><td>$${item.price.toFixed(2)}</td>`;
            list.appendChild(tr);
            subtotal += item.price;
        });

        let tax = subtotal * taxRate;
        let total = subtotal + tax;

        document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        document.getElementById("tax").textContent = `Tax: $${tax.toFixed(2)}`;
        document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    }

    // Logout Functionality
    let logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("loggedIn"); // Clear login status
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Login Form Validation
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            if (username !== "147Kev" || password !== "007854@#y") {
                event.preventDefault();
                alert("Invalid username or password.");
            } else if (password.length < 8) {
                event.preventDefault();
                alert("Password must be at least 8 characters long.");
            } else {
                localStorage.setItem("loggedIn", "true"); // Store login status
                window.location.href = "index.html"; // Redirect to home page
            }
        });
    }

    // Add to Cart functionality for products page
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart({ product, price });
        });
    });
};
