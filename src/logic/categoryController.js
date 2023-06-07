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

    return {
        getCategories
    }
})();

export default categoryController;