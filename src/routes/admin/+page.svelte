<script>
	import { browser } from '$app/environment';
	import AdminHeader from '$lib/components/admin/common/AdminHeader.svelte';
	import SideMenu from '$lib/components/admin/common/SideMenu/SideMenu.svelte';
	import sessionAdminController from '../../logic/sessionAdminController';

	const userLogged = async () => {
		let user = await sessionAdminController.getUser();

		if (!user && browser) {
			window.location.href = '/admin/auth/login';
		}
	};

	userLogged();
</script>
