// @ts-nocheck
import { User } from "./dtos/User";
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";

// @ts-nocheck
const adminController = (() => {
    //USERS
    async function getUsers() {
        let token = await sessionAdminController.getUserToken();
        return await fetchController.execute('https://cuchos-market-2023-34241c211eef.herokuapp.com/users', 'GET', null, token);
    }

    async function getUser(id) {
        
        if (!id) return null;

        let token = await sessionAdminController.getUserToken();
        return await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/users/${id}`, 'GET', null, token);
    }

    async function registerEmployee(employee, branch) {
        let token = await sessionAdminController.getUserToken();

		if (employee === null) null;

        employee.role = "EMPLOYEE";

		const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/users/${branch}/employee`, 'POST', employee, token);
		return res;
	}

    async function updateEmployee(employee) {
        let token = await sessionAdminController.getUserToken();

        if (employee === null) null;

        let user = new User();
        user.id = employee.id;
        user.firstName = employee.firstName;
        user.lastName = employee.lastName;
        user.email = employee.email;
        user.password = employee.password;


        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/users`, 'PUT', user, token);
		return res;
    }

    async function deleteEmployee(user_id) {
        if (user_id === null) return null;

        let token = await sessionAdminController.getUserToken();

        const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/users/${user_id}`, 'DELETE', null, token);

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