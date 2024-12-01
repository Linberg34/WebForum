import { initDropDown } from "../profile/dropDown";
import { renderCommunities } from "./renderCommunities";
import { insertEmailToDropDown } from "../main/insertEmailToDropDown";

export async function initCommunitiesPage() {

    await renderCommunities();
    await insertEmailToDropDown();
    initDropDown();
}