// @ts-nocheck
import { browser } from "$app/environment";
import LoadingOverlay from "$lib/components/utils/LoadingOverlay.svelte";

// @ts-nocheck
const Utils = (() => {
    
    function getDateNow() {
        let date = new Date();

        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();

        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        //${hour}:${min}:${sec}
        return `${year}-${month}-${15}`;
    }

    function showLoading(time) {
        if (browser) {
			const loading = new LoadingOverlay({
				target: document.querySelector('body')
			});

			if(time && parseInt(time)) {
                setTimeout(() => {
                    loading.$destroy();
                }, time);
            }
		}
    }

    function removeLoading() {
        if(browser) {
            const loadings = document.querySelectorAll('.loading-overlay');

            loadings.forEach(element => {
                element.remove();
            });
        }
    }

    return {
        getDateNow,
        showLoading,
        removeLoading
    }
})();

export default Utils;