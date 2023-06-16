// @ts-nocheck
export class Product {
    constructor(code, name, description, price, images, brand, category) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
        this.entryDate = Date.now();
        this.brand = brand;
        this.categoryId = category;
    }
}