import { generatePDFByTemplate } from "../pdfGeneratorEngine.js";

const generateCoverLetterPDF = async (coverLetterData) => {
    return await generatePDFByTemplate("coverletter", coverLetterData);
};

export { generateCoverLetterPDF };
