// @ts-nocheck

import { notify } from '$lib/components/utils/Notifications.svelte';
import { initializeApp } from 'firebase/app';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
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

        

        const fileName = `${productName}__${v4()}.png`;

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

                
                productDB.images.push(JSON.stringify({url: filePath, name: fileName}));

                
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
                    text: `Imagen de producto ${productName} se ha guardado correctamente`,
                    type: 'alert-success'
                });

                return {ok: true};
            }
        }
	}

    async function remove(fileName, productName) {
		if (!fileName) return null;

		try {
            const imageRef = ref(storage, fileName);
		    const uploadFile = await deleteObject(imageRef);
        } catch (error) {
            console.log(error);
        }

        let productDB = await productController.getProduct(productName.replaceAll(' ', '_'));

        if(productDB) {
            productDB = productDB.data.content[0];
            
            productDB.images = productDB.images.filter(elem => {
                elem = JSON.parse(elem);
                return elem.name !== fileName;
            });

               

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
                text: `${fileName} se ha eliminado correctamente.`,
                type: 'alert-success'
            });

            return {ok: true};
        }
	}

	return {
		upload,
        remove
	};
})();

export default firebaseController;
