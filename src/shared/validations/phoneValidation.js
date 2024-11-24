export function validatePhone(phone) {
    if(!phone) return null;
    
    const isValid = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
    return isValid ? null : 'Введите номер телефона в формате +7 (xxx) xxx-xx-xx.';
}