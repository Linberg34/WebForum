import {
    validateFullName,
    validatePassword,
    validateEmail,
    validateBirthDate,
    validatePhone,
    applyPhoneMask
} from '../../../shared/validations/index.js';

const phoneInput = document.getElementById('phone');
applyPhoneMask(phoneInput);


// document.getElementById('regForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const fullName = document.getElementById('fullName').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const birthDate = document.getElementById('birthDate').value.trim();
//     const gender = document.getElementById('gender').value;
//     const phoneNumber = document.getElementById('phone').value.trim();

//     const errors = [
//         validateFullName(fullName),
//         validatePassword(password),
//         validateEmail(email),
//         validateBirthDate(birthDate),
//         validatePhoneNumber(phoneNumber)
//     ].filter(error => error !== null);

//     if (errors.length > 0) {
//         alert(errors.join('\n'));
//         return;
//     }

//     const formData = { fullName, password, email, birthDate, gender, phoneNumber };
//     fetch('http://localhost/registration/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//     })
//         .then(response => {
//             if (!response.ok) throw new Error('Ошибка при регистрации.');
//             return response.json();
//         })
//         .then(data => {
//             alert(`Регистрация успешна! Ваш TOKEN: ${data.token}`);
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//             alert('Не удалось завершить регистрацию.');
//         });
// });
