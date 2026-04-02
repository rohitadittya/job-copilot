import { generatePDFByTemplate } from "../pdfGeneratorEngine.js";

const generateResumePDF = async (resumeData) => {
    return await generatePDFByTemplate("resume", resumeData);
};

export { generateResumePDF };
