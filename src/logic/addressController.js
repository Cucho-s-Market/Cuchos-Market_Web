// @ts-nocheck
import fetchController from "./fetchController";
import sessionController from "./sessionController";

// @ts-nocheck
const addressController = (() => {

    // Create new address
    async function createAddress(address) {
        debugger;
        const userToken = await sessionController.getUserToken();
        
        const newAddress = new Address(null, address.address, address.doorNumber, address.location, address.state);
        
        let resultAddress = await fetchController.execute("http://localhost:8080/users/customer/address", "POST", newAddress, userToken);
        if (resultAddress == null || resultAddress.error) return null;

        setAddressStorageFromDB();

        return resultAddress;
    }

    // Update address
    async function updateAddress(address) {
        debugger;
        const userToken = await sessionController.getUserToken();
        let resultAddress = await fetchController.execute("http://localhost:8080/users/customer/address", "PUT", address, userToken);
        if (resultAddress == null || resultAddress.error) return null;

        setAddressStorageFromDB();

        return resultAddress;
    }

    // Delete address
    async function deleteAddress(addressId) {
        debugger;
        const userToken = await sessionController.getUserToken();
        let resultAddress = await fetchController.execute("http://localhost:8080/users/customer/address/" + addressId, "DELETE", null, userToken);
        if (resultAddress == null || resultAddress.error) return null;

        setAddressStorageFromDB();

        return resultAddress;
    }

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
        if(user == null) return null;

        let addresses = user?.addresses;
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