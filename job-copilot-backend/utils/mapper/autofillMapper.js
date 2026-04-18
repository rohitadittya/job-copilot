import { FIELD_REGEX_MAP } from "./mapperConstants.js";

export const fieldMapper = (formFields, userProfile) => {

    return formFields.map(field => {
        const label = field.label.toLowerCase();

        for (const { key, regex } of FIELD_REGEX_MAP) {
            if (regex.test(label)) {
                return {
                    ...field,
                    value: userProfile[key] || ""
                };
            }
        }

        return { ...field, value: "" };
    });
};