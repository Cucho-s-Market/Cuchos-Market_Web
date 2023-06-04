
//@ts-nocheck
import fetchController from "./fetchController";
import { Customer } from "./dtos/Customer";

const sessionController = (() => {

	let user = {};
	let cart = {items: [], total: 0};
	let paymentMethods = {};
	let address = {};

	// ------------------ CUSTOMER REGISTER ------------------
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

	// ------------------ CUSTOMER LOGIN ------------------
	async function login(customerDetails) {
		// login logic
		const res = await fetchController.execute("http://localhost:8080/users/auth/login", "POST", customerDetails);
		if(res == null && res.error) return res;
		
		// Store user data in session
		user = res.data;
		user.token = res.token;
		user.isLoggedIn = true;

		sessionStorage.setItem("user", JSON.stringify(user));
		sessionStorage.setItem("cart", JSON.stringify(cart));
		return res;
	}

	async function logout() {
		// logout logic
		user = {};
		sessionStorage.clear();
		localStorage.clear();
		
		// Redirect user to homepage
		window.location.href = "/";
	}

	async function isUserLoggedIn() {
		// Check if user is logged in
		let user = sessionStorage.getItem("user") != null ? true : false;
		return user
	}

	return {
		register,
		login,
		logout,
		isUserLoggedIn
	}
})();

export default sessionController;