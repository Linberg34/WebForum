import {
    validateEmail,
    validatePassword
} from '../../shared/validations/index.js';


export function checkData(email, password) {
    const errors = [];

    if (validateEmail(email)) {
        errors.push(validateEmail(email));
    }

    if (validatePassword(password)) {
        errors.push(validatePassword(password));
    }

    return errors;
}