export const FIELD_REGEX_MAP = [
    { key: "firstName", regex: /\b(first\s*name|given\s*name|fname|firstname|first)\b/i },
    { key: "lastName", regex: /\b(last\s*name|surname|lname|lastname|last)\b/i },
    { key: "fullName", regex: /\b(full\s*name|name)\b/i },

    { key: "email", regex: /\b(email|e-mail)\b/i },
    { key: "phone", regex: /\b(phone|mobile|contact\s*number|tel|telephone)\b/i },

    { key: "address", regex: /\b(address|street)\b/i },
    { key: "city", regex: /\bcity\b/i },
    { key: "state", regex: /\b(state|province|region)\b/i },
    { key: "zip", regex: /\b(zip|postal\s*code|pincode)\b/i },
    { key: "country", regex: /\bcountry\b/i },

    { key: "linkedin", regex: /\b(linkedin)\b/i },
    { key: "github", regex: /\b(github)\b/i },
    { key: "portfolio", regex: /\b(portfolio|website|personal\s*site)\b/i },

    { key: "resume", regex: /\b(resume|cv)\b/i },
    { key: "coverLetter", regex: /\b(cover\s*letter)\b/i },

    { key: "workExperience", regex: /\b(work\s*experience|experience|employment)\b/i },
    { key: "education", regex: /\b(education|degree|university|college)\b/i },
    { key: "skills", regex: /\b(skills?|technologies)\b/i },
    { key: "projects", regex: /\b(projects?)\b/i },
    { key: "certifications", regex: /\b(certifications?|licenses?)\b/i },
    { key: "languages", regex: /\b(languages?)\b/i },
    { key: "references", regex: /\b(references?)\b/i },

    { key: "additionalInformation", regex: /\b(additional\s*information|extra\s*info|notes?)\b/i }
];