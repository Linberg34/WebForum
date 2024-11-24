// import IMask from 'imask';

export function applyPhoneMask(inputElement) {
    const maskOptions = {
        mask: '+7 (000) 000-00-00', 
        lazy: false
    };

    return IMask(inputElement, maskOptions); 
}
