import { renderAuthors } from "./renderAuthorsList";
import {initDropDown} from '../profile/dropDown.js';
export async function initAuthorsPage() {
    await initDropDown();
    renderAuthors();

}