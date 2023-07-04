<script>
	import { browser } from '$app/environment';
	import sessionAdminController from '../../logic/sessionAdminController';

	const userLogged = async () => {
		let user = await sessionAdminController.getUser();

		if (!user && browser) {
			window.location.href = '/admin/auth/login';
		}
	};

	userLogged();
</script>
