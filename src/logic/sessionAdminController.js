
//@ts-nocheck
import { browser } from "$app/environment";
import { adminSession } from "../stores";
import fetchController from "./fetchController";


const sessionAdminController = (() => {
	async function login(userDetails) {
		// login logic

		if (!sessionStorage) return null;

		const res = await fetchController.execute("http://localhost:8080/users/auth/login", "POST", userDetails);
		if (res == null) return null;

		if (res.error) return res;

		// Initialize values
		let user = res.data;

		if (user.role === "CUSTOMER") {
			return {error: true, message: "Usuario invalido."};
		}

		user.token = res.token;

		sessionStorage.setItem("adminOperator", JSON.stringify(user));

		return {error: false, message: "Iniciando sesion.", data: user};
	}

	async function logout() {
		// logout logic
		sessionStorage.clear();
		localStorage.clear();

		// Redirect user to homepage
		window.location.href = "/admin/auth/login";
	}

	async function getUser() {
		if (!browser) return null;

		if (!sessionStorage) return null;

		// Get user from session storage
		let user = sessionStorage.getItem("adminOperator") != null ? JSON.parse(sessionStorage.getItem("adminOperator")) : null;
		return user;
	}

	async function getUserToken() {
		// Get user token from session storage

		if (!browser) return null;

		if (!sessionStorage) return null;

		let user = sessionStorage.getItem("adminOperator") != null ? JSON.parse(sessionStorage.getItem("adminOperator")) : null;
		if (user == null) return null;

		return user.token;
	}

	return {
		login,
		logout,
		getUser,
		getUserToken
	}
})();

export default sessionAdminController;