import { httpClient } from "../../utils/api";

const FORGE_BASE_URL = "/forge";

export const getPersonalizedDocumentByType = async (type, jobDescription) => {
    return await httpClient(`${FORGE_BASE_URL}/${type}`, 'POST', { jobDescription });
};