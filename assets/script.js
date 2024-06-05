// Sample products array
const products = [
	{
		id: 1,
		name: 'WINTER WONDERLAND',
		price: 8.99,
		description: 'Keep your feet cozy with the winter wonderland socks range.',
		imageUrl: './assets/images/winter-socks.png',
	},
	{
		id: 2,
		name: 'DREAM TEAM',
		price: 8.99,
		description:
			"Drift off and have the perfect night's sleep with the dream team sock range.",
		imageUrl: './assets/images/dream.png',
	},
	{
		id: 3,
		name: 'LIGHT & SOFT',
		price: 8.99,
		description:
			'Give your feet a little hug with the light & soft sock range.',
		imageUrl: './assets/images/light-soft.png',
	},
	{
		id: 4,
		name: 'BEARLY THERE',
		price: 8.99,
		description: 'Feels like a second skin in our bearly there sock range.',
		imageUrl: './assets/images/bearly-there.png',
	},
	{
		id: 5,
		name: 'CUSTOMISE ME',
		price: 9.99,
		description:
			'Find the perfect gift for someone special with customization.',
		imageUrl: './assets/images/customise.png',
	},
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render products to the DOM
function renderProducts() {
	const container = document.querySelector('.item-container');
	if (container) {
		container.innerHTML = ''; // Clear any existing content

		products.forEach((product) => {
			const productElement = document.createElement('div');
			productElement.className = 'item';

			productElement.innerHTML = `
                <h5><em><strong>${product.name}</strong></em></h5>
                <img src="${product.imageUrl}" alt="${product.name}">
                <p class="description">${product.description}</p>
                <p class="price"><strong>$${product.price.toFixed(
									2
								)}</strong></p>
                <button type="button" class="btn btn-outline-primary" onclick="addToCart(${
									product.id
								})">Add to cart</button>
            `;

			container.appendChild(productElement);
		});
	}
}

// Function to add items to the cart
function addToCart(productId) {
	const product = products.find((p) => p.id === productId);
	if (product) {
		const cartItem = cart.find((item) => item.id === product.id);
		if (cartItem) {
			cartItem.quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		updateCartCount();
		updateCart();
		localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
		alert(`${product.name} has been added to your cart.`);
	}
}

// Function to update the cart count in the DOM
function updateCartCount() {
	const cartCount = document.getElementById('cart-count');
	if (cartCount) {
		cartCount.textContent = cart.reduce(
			(total, item) => total + item.quantity,
			0
		);
	}
}

// Function to update the cart content in the DOM
function updateCart() {
	const cartItemsContainer = document.getElementById('cart-items');
	const cartTotalContainer = document.getElementById('cart-total');
	if (cartItemsContainer && cartTotalContainer) {
		cartItemsContainer.innerHTML = ''; // Clear existing cart items

		let total = 0;
		cart.forEach((item) => {
			const itemTotal = item.price * item.quantity;
			total += itemTotal;

			const cartItemElement = document.createElement('tr');
			cartItemElement.innerHTML = `
                <td>
                    <div class="cart-info d-flex align-items-center">
                        <img src="${item.imageUrl}" alt="${
				item.name
			}" class="cart-img">
                        <div>
                            <p>${item.name}</p>
                            <small>$${item.price.toFixed(2)}</small>
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <input type="number" value="${
											item.quantity
										}" min="1" class="form-control cart-quantity" onchange="updateQuantity(${
				item.id
			}, this.value)">
                </td>
                <td class="text-center">$${itemTotal.toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-outline-danger" onclick="removeFromCart(${
											item.id
										})">Remove</button>
                </td>
            `;

			cartItemsContainer.appendChild(cartItemElement);
		});

		cartTotalContainer.textContent = `$${total.toFixed(2)}`;
	}
}

// Function to update item quantity in the cart
function updateQuantity(productId, quantity) {
	const cartItem = cart.find((item) => item.id === productId);
	if (cartItem) {
		cartItem.quantity = parseInt(quantity);
		updateCartCount();
		updateCart();
		localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
	}
}

// Function to remove items from the cart
function removeFromCart(productId) {
	cart = cart.filter((item) => item.id !== productId);
	updateCartCount();
	updateCart();
	localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
}

// Function that uses fetch to get data from the API
function getData() {
	fetch('https://onlineprojectsgit.github.io/API/WDEndpoint.json')
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Request failed');
			}
		})
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.error(error.message);
		});
}

// Call getData function to fetch and log the data
getData();

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
	renderProducts();
	updateCart();
	updateCartCount();
	getData();
});
