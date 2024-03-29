// @ts-nocheck
import fetchController from "./fetchController";
import sessionAdminController from "./sessionAdminController";
import firebaseController from "./third-party/firebaseController";

const categoryController = (() => {

    async function getCategories() {
        let resultCategories = [];

        let categories = await fetchController.execute("https://cuchos-market-2023-34241c211eef.herokuapp.com/categories");
        if (categories == null || categories.error) return null;

        categories = categories.data;

        // Filter categories parent
        const filteredCategoriesParent = categories.filter(category => category.categoryParent == 0);
        if(filteredCategoriesParent == null || filteredCategoriesParent.length <= 0) return null;

        filteredCategoriesParent.forEach(categoryParent => {
            let categoryParentObj = {
                id: categoryParent.id,
                name: categoryParent.name,
                description: categoryParent.description,
                categoryParent: categoryParent.categoryParent,
                image: categoryParent.image,
                subcategories: []
            };

            // Filter categories children
            const filteredCategoriesChildren = categories.filter(category => category.categoryParent == categoryParent.id);

            categoryParentObj.subcategories = filteredCategoriesChildren;

            resultCategories.push(categoryParentObj);
        });

        return resultCategories;
    }
    async function getCategoriesSelect() {
        const branches = await fetchController.execute("https://cuchos-market-2023-34241c211eef.herokuapp.com/categories");
        if (branches == null || branches.error) return null;

        return branches.data;
    }

    async function findCategoryById(id){
        const categories = await getCategories();
        if(categories == null || categories.length <= 0) return null;

        let category = null;
        
        categories.forEach(categoryParent => {
            if(category != null) return;

            if(categoryParent.id == id){
                category = categoryParent;
                return;
            }

            const categoryFind = categoryParent.subcategories.find(categoryChild => {return categoryChild.id == id});
            if(categoryFind == null) return;

            category = categoryFind;
        });

        return category;
    }

    async function addCategory(category) {
        if (category === null) throw new Error('Error al intentar crear la categoria.');

        const token = await sessionAdminController.getUserToken();

        const image = await firebaseController.uploadCategoryImage(category.image.file, category.name.replace(" ", "_"));

        if(image == null) throw new Error('Error al intentar subir la imagen de la categoria.');

        category.image = image;

		const res = await fetchController.execute(`https://cuchos-market-2023-34241c211eef.herokuapp.com/categories`, 'POST', category, token);
		return res;
    }

    return {
        getCategories,
        getCategoriesSelect,
        findCategoryById,
        addCategory
    }
})();

export default categoryController;