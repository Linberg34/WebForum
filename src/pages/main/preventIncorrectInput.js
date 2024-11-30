export function preventIncorrectInput(){
    document.getElementById('readTimeFrom').addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ''); 
        if (this.value < 0) {
            this.value = 0; 
        }
        if (!Number.isInteger(Number(this.value))) {
            this.value = Math.floor(this.value); 
        }
    });
    
    document.getElementById('readTimeTo').addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ''); 
        if (this.value < 0) {
            this.value = 0; 
        }
        if (!Number.isInteger(Number(this.value))) {
            this.value = Math.floor(this.value); 
        }
    });
}