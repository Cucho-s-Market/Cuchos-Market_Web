// @ts-nocheck
import { User } from "./dtos/User";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

// @ts-nocheck
const adminController = (() => {
    //USERS
    async function getUsers() {
        let token = await sessionAdminController.getUserToken();
        return await fetchController.execute('http://localhost:8080/users', 'GET', null, token);
    }

    async function getUser(id) {
        
        if (!id) return null;

        let token = await sessionAdminController.getUserToken();
        return await fetchController.execute(`http://localhost:8080/users/${id}`, 'GET', null, token);
    }

    async function registerEmployee(employee, branch) {
        let token = await sessionAdminController.getUserToken();

		if (employee === null) null;

		const res = await fetchController.execute(`http://127.0.0.1:8080/users/${branch}/employee`, 'POST', employee, token);
		return res;
	}

    async function updateEmployee(employee) {
        debugger;
        let token = await sessionAdminController.getUserToken();

        if (employee === null) null;

        let user = new User();
        user.id = employee.id;
        user.name = employee.name;
        user.surname = employee.surname;
        user.email = employee.email;

        const res = await fetchController.execute(`http://127.0.0.1:8080/users`, 'PUT', user, token);
		return res;
    }

    async function deleteEmployee(user_id) {
        if (user_id === null) return null;

        let token = await sessionAdminController.getUserToken();

        const res = await fetchController.execute(`http://127.0.0.1:8080/users/${user_id}`, 'DELETE', null, token);

        return res;
    }


    return {
        getUsers,
        getUser,
        registerEmployee,
        updateEmployee,
        deleteEmployee
    }
})();

export default adminController;