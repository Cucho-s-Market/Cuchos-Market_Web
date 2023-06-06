// @ts-nocheck
import fetchController from "./fetchController";
import sessionController from "./sessionController";

// @ts-nocheck
const addressController = (() => {

    async function getAddresses() {
        const userToken = await sessionController.getUserToken();
        let addresses = await fetchController.execute("http://localhost:8080/users/customer/address", "GET", null, userToken);
        if (addresses == null || addresses.error) return null;

        return addresses.data;
    }

    async function getSelectedAddress() {
        let user = await sessionController.getUser();
        if (user == null) return null;

        const userAddress = Object.entries(JSON.parse(sessionStorage.getItem("user")).address).length <= 0 ? null : user.address = JSON.parse(sessionStorage.getItem("user")).address;
        return userAddress;
    }

    // Set selected address into user session
    async function setSelectedAddress(addressId) {
        let user = await sessionController.getUser();
        if (user == null) return null;

        let addresses = await sessionController.getUser();
        if(addresses == null) return null;

        addresses = addresses.addresses;
        if (addresses == null || addresses?.length <= 0) return null;

        const selectedAddress = addresses.find(address => address.id == addressId);
        if (selectedAddress == null) return null;

        user.address = selectedAddress;
        sessionController.setUser(user);

        return true;
    }

    return {
        getAddresses,
        setSelectedAddress,
        getSelectedAddress
    }
})();

export default addressController;