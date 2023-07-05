<script context="module">
	import Notification from './Notification.svelte';
	import { browser } from '$app/environment';

	// @ts-ignore
	export const notify = ({ text, type, props}) => {
		if (browser) {
			const notification = new Notification({
				// @ts-ignore
				target: document.querySelector('#notifications'),
				props: { text: text, type: type, props: props }
			});

			setTimeout(() => {
				notification.$destroy();
			}, 3000);
		}
	};
</script>

<div id="notifications" class="flex flex-col gap-5 fixed bottom-10 right-5" />
