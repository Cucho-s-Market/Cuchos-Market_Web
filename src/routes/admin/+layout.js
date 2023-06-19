import { browser } from '$app/environment'
import sessionAdminController from '../../logic/sessionAdminController.js'

export const load = async ({ url }) => {
    const { pathname } = url

    return {
        pathname
    }
}