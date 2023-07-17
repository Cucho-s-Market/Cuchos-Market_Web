
//@ts-nocheck
import fetchController from "./fetchController";
import { Customer } from "./dtos/Customer";
import { cartStore } from "./Stores/CartStore";
import { userStore } from "./Stores/UserStore";
import { browser } from "$app/environment";

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
		if (res == null || res.error) return res;


		// Initialize values
		user = res.data;

		if(user?.role != "CUSTOMER"){
			res.message = "No es un usuario valido";
			res.error = true;
			return res;
		}

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
		sessionStorage.clear();
		
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

		if(!browser) return null;
		if(!sessionStorage) return null;

		// Get user token from session storage
		let user = sessionStorage.getItem("user") != "null" ? JSON.parse(sessionStorage.getItem("user")) : null;
		if (user == null) return null;

		return user.token;
	}

	async function sentForgotPassword(email){
		
		const res = await fetchController.execute("http://localhost:8080/users/auth/resetPassword", "POST", {"email": email});
		if (res == null || res.error) return null;

		return res;
	}

	async function checkForgotPasswordToken(token){
		
		const res = await fetchController.execute("http://localhost:8080/users/token", "GET", null, token);
		if (res == null || res.error) return null;

		return res;
	}

	async function changePasswordUser(token, password){
		
		const res = await fetchController.execute("http://localhost:8080/users/updatePassword", "PUT", {"password": password}, token);
		return res;
	}

	async function updateCustomerInformation(customerDetails){

		const token = await getUserToken();

		const res = await fetchController.execute("http://localhost:8080/users", "PUT", customerDetails, token);
		return res;
	}

	async function sendActualizarDatos(token, password){
		const res = await fetchController.execute("http://localhost:8080/users/updatePassword", "PUT", {"password": password}, token);
		return res;
	}

	async function disableCustomer(userEmail, token, disabled = true){
		const res = await fetchController.execute("http://localhost:8080/users/admin/disable-customer", "PUT", {"email": userEmail, "disabled": disabled}, token);
		return res;
	}


	return {
		register,
		login,
		logout,
		isUserLoggedIn,
		getUser,
		setUser,
		getUserToken,
		sentForgotPassword,
		checkForgotPasswordToken,
		changePasswordUser,
		sendActualizarDatos,
		updateCustomerInformation,
		disableCustomer
	}
})();

export default sessionController;