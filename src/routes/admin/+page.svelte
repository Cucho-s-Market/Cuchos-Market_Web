<script>
	import AdminHeader from "$lib/components/admin/common/AdminHeader.svelte";
	import SideMenu from "$lib/components/admin/common/SideMenu/SideMenu.svelte";

	import { browser } from '$app/environment';
	import sessionAdminController from '../../logic/sessionAdminController';

	// let user = null;

	// let getUser = async () => {
	// 	user = await sessionAdminController.getUser();
	// };

	// debugger;
	// getUser().then(() => {
	// 	if (browser) {
	// 		let path = window.location.href;

	// 		if ((path.includes('/admin') && !user) || user?.role === 'CUSTOMER') {
	// 			debugger;
	// 			window.location.href = '/admin/auth/login';
	// 		}
	// 	}
	// });
</script>