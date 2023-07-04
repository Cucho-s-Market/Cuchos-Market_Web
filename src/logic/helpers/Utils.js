<<<<<<< HEAD
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
        return `${year}-${month}-${day}`;
    }

    return {
        getDateNow
    }
})();

=======
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

    function isEditMode () {
        if (browser) {
            const res = window.location.pathname !== '/admin/productos/nuevo';
            return res;
        }

        return false;
    }

    return {
        getDateNow,
        showLoading,
        removeLoading,
        isEditMode
    }
})();

>>>>>>> c0aeb8a1e854b15a8d3c70a0bcf313c9045601a4
export default Utils;