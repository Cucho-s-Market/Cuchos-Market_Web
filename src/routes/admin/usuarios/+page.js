import adminController from '../../../logic/adminController';

/** @type {import('./$types').PageLoad} */
export async function load() {

    const users = await adminController.getUsers();

    return {users};
}