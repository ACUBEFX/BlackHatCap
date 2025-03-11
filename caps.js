    // Get all the product cards
    const productCards = document.getElementsByClassName('product-card');
   // Get the product modal and close button
const productModal = document.getElementById('product-modal');
const closeButton = productModal.getElementsByClassName('close')[0];
// Iterate over each product card
for (let i = 0; i < productCards.length; i++) {
    const productCard = productCards[i];
    // Add click event listener to each product card (excluding "Add to Cart" button and size selector)
    productCard.addEventListener('click', function(event) {
        const clickedElement = event.target;
        const isAddToCartButton = clickedElement.classList.contains('add-to-cart-button');
        const isSizeSelector = clickedElement.tagName === 'SELECT';
        // Show the modal if the clicked element is not the "Add to Cart" button or size selector
        if (!isAddToCartButton && !isSizeSelector) {
            // Get the relevant information from the clicked product card
            const productName = productCard.getElementsByClassName('product-name')[0].textContent;
            const productImage = productCard.getElementsByClassName('product-image')[0].src;
            const productPrice = productCard.getElementsByClassName('product-price')[0].textContent;
            const productSize = productCard.getElementsByTagName('select')[0].value;
            const button = productCard.getElementsById('button');
            const productDescription = productCard.getElementsByClassName('product-description')[0].textContent;
            // Set the information in the modal
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-product-image').src = productImage;
            document.getElementById('modal-product-price').textContent = productPrice;
            document.getElementById('modal-size-select').value = productSize;
            document.getElementById('modal-product-description').textContent = productDescription;
            // Show the modal
            productModal.style.display = 'block';
        }
    });
}
// Close the modal when the close button is clicked
closeButton.addEventListener('click', function() {
    productModal.style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of it
window.addEventListener('click', function(event) {
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

    // Add the Font Awesome stylesheet dynamically for the social icons
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css';
    document.head.appendChild(linkElement);
    // Phone number click event handler
    const phoneNumberLink = document.getElementById('phoneNumber');
    phoneNumberLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const phoneNumber = phoneNumberLink.textContent.trim();
        initiatePhoneCall(phoneNumber);
    });
    // Function to initiate phone call
    function initiatePhoneCall(phoneNumber) {
        // Modify the code below to suit the phone call functionality of your platform or device
        console.log("Initiating phone call to " + phoneNumber);
        // Example using HTML <a> element to initiate phone call (requires the tel: prefix)
        window.location.href = "tel:" + phoneNumber;
    }
   // Get the email modal element for email us form
const emailModal = document.getElementById('emailModal');
// Get the link that triggers the modal
const emailUsLink = document.getElementById('emailUsLink');
// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];
// Open the modal when "Email Us" link is clicked
emailUsLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    emailModal.style.display = 'block';
});
// Close the modal when the user clicks on <span> (x)
closeBtn.addEventListener('click', function() {
    emailModal.style.display = 'none';
});
// Close the modal when the user clicks anywhere outside of it
window.addEventListener('click', function(event) {
    if (event.target === emailModal) {
        emailModal.style.display = 'none';
    }
});
// Handle form submission
const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // Get the entered email and message values
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // You can use the email and message values to send an email or perform any desired action
    // Clear the form fields
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    // Close the modal after form submission
    emailModal.style.display = 'none';
});

    // Searchbar functionality
    let searchTimeout;
    // Add an event listener to the search input
    document.getElementById("search-input").addEventListener("input", search);

    function search() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterProducts, 300); // Debounce search for 300ms
    }

    function filterProducts() {
        const query = document.getElementById("search-input").value.toLowerCase().trim(); // Trim whitespace
        const productCards = document.getElementsByClassName("product-card");
        for (let i = 0; i < productCards.length; i++) {
            const productName = productCards[i].getElementsByClassName("product-name")[0].textContent.toLowerCase();
            // Compare query with the start of the product name for better matching
            const display = productName.startsWith(query) ? "block" : "none";
            productCards[i].style.display = display;
        }
        const noResultsMessage = document.getElementById("no-results-message");
        if (query !== "" && Array.from(productCards).every(card => card.style.display === "none")) {
            noResultsMessage.style.display = "block";
        } else {
            noResultsMessage.style.display = "none";
        }
    }
    // address button
    const addressLinkElement = document.getElementById('addressLink');
    const address = addressLinkElement.innerHTML.trim();
    // Get the address and remove leading/trailing whitespace
    addressLinkElement.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        // Open the address in a new tab or window
        window.open('https://www.google.com/maps?q=' + encodeURIComponent(address), '_blank');
    });
    // sidemenu
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
    });
    document.addEventListener("click", (event) => {
        const targetElement = event.target;
        if (!menuBtn.contains(targetElement) && !sidebar.contains(targetElement)) {
            menuBtn.classList.remove("open");
        }
    });





    // Select all the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    // Select the cart count element
    const cartCount = document.querySelector('.cart-count');
    // Select the cart items element
    const cartItems = document.querySelector('.cart-items');
    // Set the initial cart count and items to empty
    let count = 0;
    let items = [];
    // Add an event listener to each "Add to Cart" button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the name, price, and size of the product
            const productName = button.parentNode.querySelector('.product-name').textContent;
            const productPrice = button.parentNode.querySelector('.product-price').textContent;
            const productSize = button.parentNode.querySelector('#size-select').value;
            // Add the item to the cart
            items.push({
                name: productName,
                price: productPrice,
                size: productSize,
                quantity: 1
            });
            // Increment the cart count
            count++;
            // Update the cart count element with the new count
            cartCount.textContent = count;
            // Update the cart items element with the new item list
            updateCartItems();
            updateTotalPrice();
        });
    });
    // Update the cart items element with the current item list
    function updateCartItems() {
        // Clear the cart items element
        cartItems.innerHTML = '';
        // Create an h3 element for the title
        const titleElement = document.createElement('h3');
        titleElement.textContent = 'Your Cart';
        cartItems.appendChild(titleElement);
        // Create a new list element for each item in the items array
        items.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');
            const itemName = document.createElement('div');
            itemName.textContent = item.name;
            productDetails.appendChild(itemName);
            const itemPrice = document.createElement('div');
            itemPrice.textContent = `₦${item.price}`;
            productDetails.appendChild(itemPrice);
            const itemSize = document.createElement('div');
            itemSize.textContent = `Size: ${item.size}`;
            productDetails.appendChild(itemSize);
            listItem.appendChild(productDetails);
            const quantitySelector = document.createElement('input');
            quantitySelector.type = 'number';
            quantitySelector.value = item.quantity; // Set the quantity to the item's quantity
            quantitySelector.min = 0; // Minimum quantity (changed to 0)
            quantitySelector.classList.add('quantity-selector');
            quantitySelector.dataset.index = index; // Store the item index as a data attribute
            quantitySelector.addEventListener('change', handleQuantityChange); // Add event listener
            listItem.appendChild(quantitySelector);
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button', 'small'); // Add 'small' class to the remove button
            removeButton.dataset.index = index;
            removeButton.addEventListener('click', handleRemoveItem);
            listItem.appendChild(removeButton);
            cartItems.appendChild(listItem);
        });
        // Create the total and checkout button elements
        const totalElement = document.createElement('div');
        totalElement.classList.add('total');
        totalElement.textContent = `Total: ₦${calculateTotalPrice()}`;
        const checkoutButton = document.createElement('button');
        const button = document.createElement('botton');
        checkoutButton.classList.add('checkout-button');
        button.classList.add('checkout-btn');
        checkoutButton.textContent = 'Review';
        // button.textContent = 'Hello';
        // Append the total and checkout button to the cart items element
        cartItems.appendChild(totalElement);
        cartItems.appendChild(checkoutButton);
        cartItems.appendChild(button);
        // Show the cart items element if there are items in the cart, hide it otherwise
        if (items.length > 0) {
            cartItems.style.display = 'block';
        } else {
            cartItems.style.display = 'none';
        }
    }

    function handleRemoveItem(event) {
        const index = event.target.dataset.index;
        items.splice(index, 1); // Remove the item from the items array
        count--; // Decrement the cart count
        cartCount.textContent = count; // Update the cart count element
        updateCartItems(); // Update the cart items
        updateTotalPrice(); // Update the total price
    }
    // Event listener for quantity change
    function handleQuantityChange(event) {
        const index = event.target.dataset.index;
        const quantity = parseInt(event.target.value);
        if (quantity === 0) {
            items.splice(index, 1); // Remove the item from the items array
        } else {
            items[index].quantity = quantity; // Update the quantity of the item
        }
        updateCartItems(); // Update the cart items
        updateTotalPrice(); // Update the total price
    }
    // Calculate the total price of the added items
    function calculateTotalPrice() {
        let total = 0;
        items.forEach(item => {
            total += parseFloat(item.price) * item.quantity; // Multiply price by quantity
        });
        return total.toFixed(2);
    }
    // Update the total price element with the current total price
    function updateTotalPrice() {
        const totalElement = document.querySelector('.total');
        totalElement.textContent = `Total: ₦${calculateTotalPrice()}`;
    }
    // Select the cart icon
    const cartIcon = document.querySelector('.cart-icon');
    // Add a click event listener to the cart icon
    cartIcon.addEventListener('click', () => {
        // Toggle the display of the cart items element
        if (cartItems.style.display === 'none' || cartItems.style.display === '') {
            cartItems.style.display = 'block';
        } else {
            cartItems.style.display = 'none';
        }
    });
    // Add a click event listener to the document
    document.addEventListener('click', (event) => {
        // Check if the clicked element is outside the cart icon, cart items, and remove buttons
        if (!event.target.closest('.cart-icon') && !event.target.closest('.cart-items') && !event.target.closest('.remove-button')) {
            // Hide the cart items
            cartItems.style.display = 'none';
        }
    });
    // Select the "Add to Cart" button in the modal
    const addToCartButton = document.getElementById('add-to-cart-button');
    // Add a click event listener to the button
    addToCartButton.addEventListener('click', addToCart);
    // Function to handle the click event
    function addToCart() {
        // Get the selected size from the modal
        const selectedSize = document.getElementById('modal-size-select').value;
        // Get the product name, price, and image from the modal
        const productName = document.getElementById('modal-product-name').textContent;
        const productPrice = document.getElementById('modal-product-price').textContent;
        const productImage = document.getElementById('modal-product-image').src;
        // Create a new cart item object with initial quantity 1
        const cartItem = {
            name: productName,
            price: productPrice,
            size: selectedSize,
            image: productImage,
            quantity: 1, // Set initial quantity to 1
        };
        // Add the item to the cart
        items.push(cartItem);
        // Increment the cart count
        count++;
        // Update the cart count element with the new count
        cartCount.textContent = count;
        // Update the cart items element with the new item list
        updateCartItems();
        updateTotalPrice();
    }
    // Select the profile icon
    const profileIcon = document.querySelector('.profile-icon');
    // Add a click event listener to the profile icon
    profileIcon.addEventListener('click', () => {
        // Redirect to the profile page
        window.location.href = "profile.html";
    });
