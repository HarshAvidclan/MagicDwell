import { LOCALHOSTWITHPORT } from "../API/URL/BaseURL";

export const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return "";
    const base = LOCALHOSTWITHPORT || "";
    return `${base}${imagePath}`;
};