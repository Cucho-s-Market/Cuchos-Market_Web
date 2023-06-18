
//@ts-nocheck
<<<<<<< HEAD
=======
import { browser } from "$app/environment";
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
import { adminSession } from "../stores";
import fetchController from "./fetchController";


const sessionAdminController = (() => {
	async function login(userDetails) {
<<<<<<< HEAD
		// login logic
        debugger;
=======
		userDetails = {
			email: 'admin@mail.com',
			password: 'password'
		};
		// login logic
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
		const res = await fetchController.execute("http://localhost:8080/users/auth/login", "POST", userDetails);
		if(res == null) return null;

		if(res.error) return res;
		
		// Initialize values
		let user = res.data;
		user.token = res.token;
        
		sessionStorage.setItem("adminOperator", JSON.stringify(user));

		return user;
	}

	async function logout() {
		// logout logic
		sessionStorage.clear();
		localStorage.clear();
		
		// Redirect user to homepage
		window.location.href = "/admin/auth/login";
	}

	async function getUser() {
<<<<<<< HEAD
=======
		if(!sessionStorage) return null;

>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
		// Get user from session storage
		let user = sessionStorage.getItem("adminOperator") != null ? JSON.parse(sessionStorage.getItem("adminOperator")) : null;
		return user;
	}

	async function getUserToken(){
		// Get user token from session storage
<<<<<<< HEAD
=======

		if(!browser) return null;

>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
		if(!sessionStorage) return null;

		let user = sessionStorage.getItem("adminOperator") != null ? JSON.parse(sessionStorage.getItem("adminOperator")) : null;
		if(user == null) return null;

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