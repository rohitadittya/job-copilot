import { httpClient } from "../../utils/api";

const APPLY_BASE_URL = "/apply";

export const autofill = async (formFields, userProfile) => {
    return await httpClient(APPLY_BASE_URL, 'POST', { formFields, userProfile });
};