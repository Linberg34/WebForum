import{initDropDown} from '../profile/dropDown.js';
import { formPostData } from './formPostData.js';
import { loadDataFromApi } from './loadDataFromApi.js';
export async function initCreatePostPage() {
    await initDropDown();
    await loadDataFromApi();
    formPostData();
}