import * as applyService from "../services/apply.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const autofill = asyncHandler(async (req, res) => {
    const { formFields, userProfile } = req.body;
    const mappedFields = await applyService.autofill(formFields, userProfile);

    return res.status(200).json(mappedFields);
});