import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Handlebars.registerHelper("splitLines", (text) => text.split("\n"));

let browser = null;

const getBrowser = async () => {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    }
    return browser;
};

const generatePDF = async (htmlContent) => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "domcontentloaded"
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await page.close();
    return pdfBuffer;
};

const compileTemplate = async (templateName, data) => {
    const templatePath = path.join(__dirname, "templates", `${templateName}.hbs`);
    if (!fs.existsSync(templatePath)) {
        throw new CoreError("Template not found", 500);
    }

    const template = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
};

const generatePDFByTemplate = async (templateName, data) => {
    const htmlContent = await compileTemplate(templateName, data);
    if (!htmlContent) {
        throw new CoreError("Failed to generate HTML content", 500);
    }

    return await generatePDF(htmlContent);
};

export { generatePDFByTemplate };
