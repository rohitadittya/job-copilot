import { httpClient } from "../../utils/api";

const INSIGHTS_BASE_URL = "/insights";

export const getInsights = async (jobDescription) => {
    return await httpClient(INSIGHTS_BASE_URL, "POST", {
        jobDescription
    });
};