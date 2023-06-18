
//@ts-nocheck
import fetchController from "./fetchController";
import { Customer } from "./dtos/Customer";
import { cartStore } from "./Stores/CartStore";
import { userStore } from "./Stores/UserStore";

const sessionController = (() => {

	let user = {};
	let cart = { items: [], total: 0, totalQty: 0 };

	async function register(customerDetails) {
		const customer = new Customer(
			customerDetails.firstName,
			customerDetails.lastName,
			customerDetails.email,
			customerDetails.password,
			customerDetails.role,
			customerDetails.birthdate,
			customerDetails.phone,
			customerDetails.ci
		);

		if (customer === null) throw new Error('Error creating customer');

		const res = await fetchController.execute('http://127.0.0.1:8080/users/customer', 'POST', customer);
		return res;
	}

	async function login(customerDetails) {
		// login logic
		const res = await fetchController.execute("http://localhost:8080/users/auth/login", "POST", customerDetails);
		if (res == null || res.error) return null;

		// Initialize values
		user = res.data;
		user.token = res.token;
		user.address = {};
		user.isLoggedIn = true;

		userStore.set(user);
		cartStore.set(cart);
		return res;
	}

	async function logout() {
		// logout logic
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("cart");
		
		// Redirect user to homepage
		window.location.href = "/";
	}

	async function isUserLoggedIn() {
		// Check if user is logged in
		let user = sessionStorage.getItem("user") != "null" ? true : false;
		return user
	}

	async function getUser() {
		// Get user from session storage
		let user = sessionStorage.getItem("user") != "null" ? JSON.parse(sessionStorage.getItem("user")) : null;
		return user;
	}

	function setUser(user) {
		// Set user into session storage
		sessionStorage.setItem("user", JSON.stringify(user));
	}

	async function getUserToken() {
		// Get user token from session storage
		let user = sessionStorage.getItem("user") != "null" ? JSON.parse(sessionStorage.getItem("user")) : null;
		if (user == null) return null;

		return user.token;
	}

	return {
		register,
		login,
		logout,
		isUserLoggedIn,
		getUser,
		setUser,
		getUserToken
	}
})();

export default sessionController;