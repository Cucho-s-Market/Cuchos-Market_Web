// @ts-nocheck

import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseController = (() => {

    const firebaseConfig = {
        apiKey: "AIzaSyCaai6PeD02rZWSvWU-2l7hm-lTVfx9nfc",
        authDomain: "cuchos-55e24.firebaseapp.com",
        projectId: "cuchos-55e24",
        storageBucket: "cuchos-55e24.appspot.com",
        messagingSenderId: "568559104547",
        appId: "1:568559104547:web:6fc54751622b8f74c93796"
    };

    const app = initializeApp(firebaseConfig);

    const storage = getStorage();

    async function upload(file) {
        console.log(file);
    }

    return {
        upload
    }

})();

export default firebaseController;