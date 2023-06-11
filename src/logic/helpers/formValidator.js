// @ts-nocheck
const formValidator = (() => {
    const CI_REGEX = /^[0-9]{8}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const NUMBER = /^[0-9]+$/;

    function email(value) {
		return EMAIL_REGEX.test(value);
    }

    function ci(value) {
        return CI_REGEX.test(value);
    }

    function password(value, value2) {
        return value === value2;
    }

    function emptyValues(array) {
        return array.some(elem => elem === "");
    }

    function isNumber(value) {
        return NUMBER.test(value);
    }

    function clear(array) {
        return array.map(elem => elem = "");
    }

    return {
        email,
        ci,
        password,
        emptyValues,
        isNumber,
        clear
    }
})();

export default formValidator;