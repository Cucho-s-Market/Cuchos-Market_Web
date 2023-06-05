import adminController from '../../../logic/adminSession';

/** @type {import('./$types').PageLoad} */
export async function load() {

    const users = await adminController.getUsers();
    return {users};
}