// @ts-nocheck
import Utils from "../helpers/Utils";
export class Issue {
    constructor(title, description, userEmail, orderId) {
        this.title = title;
        this.description = description;
        this.userEmail = userEmail;
        this.orderId = orderId;
        this.creationDate = Utils.getDateNow();
    }
}