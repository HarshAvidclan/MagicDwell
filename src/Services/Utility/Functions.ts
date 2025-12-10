import { LOCALHOSTWITHPORT } from "../API/URL/BaseURL";

export const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return "";
    const base = LOCALHOSTWITHPORT || "";
    return `${base}${imagePath}`;
};

export const formatPrice = (
    price: number | string,
    short: boolean = false
): string => {
    const num = Number(price);
    if (isNaN(num)) return "";

    const rupee = "₹ ";

    if (num >= 1_00_00_000) {
        // Crore
        return `${rupee}${(num / 1_00_00_000).toFixed(1)} ${short ? "Cr" : "Crore"}`;
    }
    else if (num >= 1_00_000) {
        // Lakh
        return `${rupee}${(num / 1_00_00_000).toFixed(1)} ${short ? "L" : "Lakh"}`;
    }
    else if (num >= 1_000) {
        // Thousand
        return `${rupee}${(num / 1_000).toFixed(1)} K`;
    }
    else {
        return `${rupee}${num}`;
    }
};


/**
 * Convert given area expressed in the unit identified by buildAreaId into square feet.
 * 1 => Sq. Ft. (factor 1)
 * 2 => Sq. Yd. (1 sq yd = 9 sq ft)
 * 3 => Sq. M.  (1 sq m = 10.7639 sq ft)
 */
export const areaToSqFt = (area: number, buildAreaId: number): number => {
    if (!area || area <= 0) return 0;
    switch (buildAreaId) {
        case 1: // Sq. Ft.
            return area;
        case 2: // Sq. Yd.
            return area * 9;
        case 3: // Sq. M.
            return area * 10.7639;
        default:
            return area;
    }
};

/** Format a number using en-IN locale with specified decimals (no currency symbol). */
const formatNumberIN = (value: number, decimals = 2) =>
    value.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

/** Format a rupee amount compactly in thousands with K suffix when >= 1000 (two decimals). */
const compactRupeeK = (amount: number, decimals = 2) => {
    if (Math.abs(amount) >= 1000) {
        const valK = amount / 1000;
        return `₹ ${formatNumberIN(valK, decimals)} K`;
    }
    // small amounts: show with no K and no unnecessary decimals
    const decimalsForSmall = decimals > 0 ? Math.max(0, Math.min(decimals, 2)) : 0;
    return `₹ ${formatNumberIN(amount, decimalsForSmall)}`;
};

/**
 * Format per-sqft price.
 *
 * price: total price (INR)
 * area: numeric area in the unit specified by buildAreaId
 * buildAreaId: 1 => sq.ft, 2 => sq.yd, 3 => sq.m
 *
 * Returns strings like:
 * - "₹ 4.33 K/sq.ft"
 * - "₹ 950 /sq.ft"
 */
export const formatPricePerSqft = (
    price: number,
    area: number,
    buildAreaId: number,
    decimalsForK = 2
): string => {
    if (!price || !area || area <= 0) return `₹ 0 /sq.ft`;

    const areaInSqFt = areaToSqFt(area, buildAreaId);
    if (areaInSqFt <= 0) return `₹ 0 /sq.ft`;

    const perSqFt = price / areaInSqFt; // rupees per sqft

    // Use K suffix when >= 1000, otherwise show integer or 2dp as appropriate
    if (perSqFt >= 1000) {
        // show as "₹ X.XX K/sq.ft"
        const valK = perSqFt / 1000;
        return `₹ ${formatNumberIN(valK, decimalsForK)} K/sq.ft`;
    }

    // if < 1000, show with no K. If it's fractional show 2 decimals, otherwise integer
    const hasFraction = perSqFt % 1 !== 0;
    const decimals = hasFraction ? 2 : 0;
    return `₹ ${formatNumberIN(Math.round(perSqFt * (10 ** decimals)) / (10 ** decimals), decimals)} /sq.ft`;
};

/**
 * Calculate EMI and format like: "EMI starts at ₹37.88 K"
 * Defaults: interestRate = 8.5% p.a., tenureYears = 20
 *
 * Note: returns a string with 2 decimal places for the K value if >= 1000.
 */
export const calculateEMIText = (
    price: number,
    interestRatePercent = 8.5,
    tenureYears = 20
): string => {
    if (!price || price <= 0) return `EMI starts at ₹0`;

    const monthlyInterest = interestRatePercent / 12 / 100;
    const tenureMonths = Math.round(tenureYears * 12);

    // standard EMI formula
    const pow = Math.pow(1 + monthlyInterest, tenureMonths);
    const emi =
        (price * monthlyInterest * pow) /
        (pow - 1);

    // Format EMI: show in K if >= 1000, with two decimals
    if (emi >= 1000) {
        const emiK = emi / 1000;
        return `EMI starts at ₹ ${emiK.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} K`;
    }

    // small emi: format with no K, show nearest rupee
    return `EMI starts at ₹ ${Math.round(emi).toLocaleString("en-IN")}`;
};

export const getPostedTime = (createdDate?: string | Date) => {
    if (!createdDate) return "";
    const created =
        createdDate instanceof Date ? createdDate : new Date(createdDate);
    const diffMs = new Date().getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
};
