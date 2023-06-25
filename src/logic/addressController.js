// @ts-nocheck
import fetchController from "./fetchController";
import sessionController from "./sessionController";
import { Address } from "./dtos/Address";
import { userStore } from "./Stores/UserStore";
import { get } from "svelte/store";
import { branchStore } from "./Stores/BranchStore";

// @ts-nocheck
const addressController = (() => {

    // Create new address
    async function createAddress(address) {
        
        const userToken = await sessionController.getUserToken();

        const newAddress = new Address(null, address.address, address.doorNumber, address.location, address.state);

        let resultAddress = await fetchController.execute("http://localhost:8080/users/customer/address", "POST", newAddress, userToken);
        if (resultAddress == null || resultAddress.error) return null;

        setAddressStorageFromDB();

        return resultAddress;
    }

    // Update address
    async function updateAddress(address) {
        
        const userToken = await sessionController.getUserToken();
        let resultAddress = await fetchController.execute("http://localhost:8080/users/customer/address", "PUT", address, userToken);
        if (resultAddress == null || resultAddress.error) return null;

        setAddressStorageFromDB();

        return resultAddress;
    }

    // Delete address
    async function deleteAddress(addressId) {
        
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

    async function validateAddress(address) {

        if (address.address == "") {
            alert("Debe ingresar una direccion");
            return false;
        }

        if (address.doorNumber == "") {
            alert("Debe ingresar un numero de puerta");
            return false;
        }

        if (address.location == "") {
            alert("Debe ingresar una ciudad");
            return false;
        }

        if (address.state == "") {
            alert("Debe ingresar un estado");
            return false;
        }

        return true;
    }

    // Set selected address into user session
    async function setSelectedAddress(addressId, takeAway = false) {
        let user = await sessionController.getUser();
        if (user == null) return null;

        let selectedAddress = null;

        if (!takeAway) {
            let addresses = user?.addresses;
            if (addresses == null || addresses?.length <= 0) return null;

            selectedAddress = addresses.find(address => address.id == addressId);
            if (selectedAddress == null) return null;
        }
        else {
            selectedAddress = get(branchStore)?.selected;
            selectedAddress.isBranch = true;
        }

        user.address = selectedAddress;
        sessionController.setUser(user);

        return true;
    }

    async function setAddressStorageFromDB() {
        const addresses = await getAddresses();
        if (addresses == null) return null;

        const user = await sessionController.getUser();
        if (user == null) return null;

        user.addresses = addresses;
        userStore.set(user);
    }

    return {
        createAddress,
        updateAddress,
        deleteAddress,
        getAddresses,
        setSelectedAddress,
        getSelectedAddress,
        validateAddress
    }
})();

export default addressController;