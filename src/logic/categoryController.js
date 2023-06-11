// @ts-nocheck
import fetchController from "./fetchController";

const categoryController = (() => {

    async function getCategories() {
        let resultCategories = [];

        let categories = await fetchController.execute("http://localhost:8080/categories");
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
                subcategories: []
            };

            // Filter categories children
            const filteredCategoriesChildren = categories.filter(category => category.categoryParent == categoryParent.id);
            if(filteredCategoriesChildren == null || filteredCategoriesChildren.length <= 0) return null;

            categoryParentObj.subcategories = filteredCategoriesChildren;

            resultCategories.push(categoryParentObj);
        });

        return resultCategories;
    }

    async function findCategoryById(id){
        const categories = await getCategories();
        if(categories == null || categories.length <= 0) return null;

        let category = null;
        
        categories.forEach(categoryParent => {
            debugger;
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

    return {
        getCategories,
        findCategoryById
    }
})();

export default categoryController;