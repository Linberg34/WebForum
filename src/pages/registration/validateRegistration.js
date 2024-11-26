import {
    validateFullName,
    validatePassword,
    validateEmail,
    validateBirthDate,
    validatePhone
} from '../../shared/validations/index.js';

export function validateRegistration(fullName, password, email, birthDate, phoneNumber) {
    
    const errors = [
        validateFullName(fullName),
        validateEmail(email),
        validatePassword(password),
        validateBirthDate(birthDate),
        validatePhone(phoneNumber)
    ].filter(error => error != null);

    return errors;
}
