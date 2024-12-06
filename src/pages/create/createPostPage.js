import{initDropDown} from '../profile/dropDown.js';
import { formPostData } from './formPostData.js';
import { loadDataFromApi } from './loadDataFromApi.js';
import { renderAddresses } from './renderAddresses.js';
export async function initCreatePostPage() {
    const addressContainer = document.getElementById("adressContainer");
    
    await renderAddresses(addressContainer);

    await initDropDown();
    await loadDataFromApi();
    formPostData();
    
}