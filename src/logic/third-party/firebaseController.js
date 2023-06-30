// @ts-nocheck

import { notify } from '$lib/components/utils/Notifications.svelte';
import { initializeApp } from 'firebase/app';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import productController from '../productController';
import sessionAdminController from '../sessionAdminController';

const firebaseController = (() => {
    const firebaseUrl = 'https://firebasestorage.googleapis.com/v0/b';
	const firebaseConfig = {
		apiKey: 'AIzaSyCaai6PeD02rZWSvWU-2l7hm-lTVfx9nfc',
		authDomain: 'cuchos-55e24.firebaseapp.com',
		projectId: 'cuchos-55e24',
		storageBucket: 'cuchos-55e24.appspot.com',
		messagingSenderId: '568559104547',
		appId: '1:568559104547:web:6fc54751622b8f74c93796'
	};

    

	initializeApp(firebaseConfig);

	const storage = getStorage();

    async function getPath(metadata) {

        if(!metadata) return null;

        return `${firebaseUrl}/${metadata.bucket}/o/${metadata.fullPath}?alt=media`;
    }

	async function upload(file, productName) {
		if (!file) return null;

        const imageId = nanoid();

        const fileName = `${productName}__${imageId}.png`;

		const imageRef = ref(storage, fileName);

		const uploadFile = await uploadBytes(imageRef, file);

        if(!uploadFile) {
            
            notify({
                text: `Al ocurrido un error al intentar subir la imagen.`,
                type: 'alert-error'
            });
        }

        if (uploadFile.metadata) {
            const filePath = await getPath(uploadFile.metadata);
       
            let productDB = await productController.getProduct(productName.replaceAll(' ', '_'));

            if(productDB) {
                productDB = productDB.data.content[0];
                
                if(productDB.images === null) productDB.images = [];

                productDB.images = productDB.images.map(elem => JSON.stringify(elem));
                productDB.images.push(JSON.stringify({url: filePath, name: fileName, alt: `${productDB.name.replace(' ', '_')}__${imageId}`}));

                
                const token = await sessionAdminController.getUserToken();
                const res = await productController.editProduct(productDB, token);

                if (!res) {
                    notify({ type: 'alert-error', text: 'Error en el servidor' });
                    return null;
                }
        
                if (res.error) {
                    notify({ type: 'alert-error', text: res.message });
                    return null;
                }

                return {ok: true};
            }
        }
	}

    async function remove(fileName, productName = null) {
		if (!fileName) return null;

		try {
            const imageRef = ref(storage, fileName);
		    const uploadFile = await deleteObject(imageRef);
        } catch (error) {
            console.log(error);
        }

        if(productName) {
            let productDB = await productController.getProduct(productName.replaceAll(' ', '_'));

            if(productDB) {
                productDB = productDB.data.content[0];

                productDB.images = productDB.images.filter(elem => {return elem.name !== fileName});
                productDB.images = productDB.images.map(elem => {return JSON.stringify(elem)});
                
                const token = await sessionAdminController.getUserToken();
                const res = await productController.editProduct(productDB, token);

                if (!res) {
                    notify({ type: 'alert-error', text: 'Error en el servidor' });
                    return null;
                }

                if (res.error) {
                    notify({ type: 'alert-error', text: res.message });
                    return null;
                }

                notify({
                    text: `Imagen eliminada correctamente.`,
                    type: 'alert-success'
                });

                return {ok: true};
            }
        }

        return null;
	}

	return {
		upload,
        remove
	};
})();

export default firebaseController;
