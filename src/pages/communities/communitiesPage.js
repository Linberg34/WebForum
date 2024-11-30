import { initDropDown } from "../profile/dropDown";
import { renderCommunities } from "./renderCommunities";

export async function initCommunitiesPage() {

    await renderCommunities();
    await initDropDown();
}