export function preventIncorrectInput(){
    if(document.getElementById('readTimeFrom')){
        document.getElementById('readTimeFrom').addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); 
            if (this.value < 0) {
                this.value = 0; 
            }
            if (!Number.isInteger(Number(this.value))) {
                this.value = Math.floor(this.value); 
            }
        });
    }
    if(document.getElementById('readTimeTo')){
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

    if(document.getElementById('pageSizeSelect')){
        document.getElementById('pageSizeSelect').addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); 
            if (this.value < 0) {
                this.value = 0; 
            }
            if (!Number.isInteger(Number(this.value))) {
                this.value = Math.floor(this.value); 
            }
            if (this.value ===""){
                this.value = 5;
            }
        });
    }
}