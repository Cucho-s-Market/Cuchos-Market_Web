// @ts-nocheck
export class Order {
    constructor(id = '', branchId = '', clientAddress = '', creationDate = '', endDate = '', status = '', type = '', totalPrice = '', products = [], customer = null) {
        this.id = id;
        this.branchId = branchId;
        this.clientAddress = clientAddress;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.status = status;
        this.type = type;
        this.totalPrice = totalPrice;
        this.products = products;
        this.customer = customer;
    }
}