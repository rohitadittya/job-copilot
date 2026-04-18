import { fieldMapper } from "../utils/mapper/autofillMapper.js";

export const autofill = async (formFields, userProfile) => {
    const mappedFields = fieldMapper(formFields, userProfile);
    return mappedFields;
};