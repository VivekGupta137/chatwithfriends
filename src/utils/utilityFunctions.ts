export function formatTimeDifference(targetDate: Date) {
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    // Time units in milliseconds
    const units = {
        year: 31536000000,
        month: 2628000000,
        week: 604800000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000,
    };

    // Get absolute difference
    const absDiff = Math.abs(diffMs);

    // Find the largest appropriate unit
    for (const [unit, ms] of Object.entries(units)) {
        if (absDiff >= ms || unit === "second") {
            const value = Math.round(diffMs / ms);
            return formatter.format(value, unit as Intl.RelativeTimeFormatUnit);
        }
    }

    return "just now";
}

export const makeUrl = (url: string, params?: Record<string, string>) => {
    // sample url: /dashboard/:test_series_id/test/:test_item_id/gate/:test_attempt_id
    // sample params: { test_series_id: "123", test_item_id: "456", test_attempt_id: "789" }
    // expected result: /dashboard/123/test/456/gate/789

    // sample url: /educator/test-series/:test_series_id/edit
    // sample params: { test_series_id: "123" }
    // expected result: /educator/test-series/123/edit

    // the params keys will be like : testSeriesId, testItemId, testAttemptId
    // so first need to convert them to snake_case

    // if there are no params, return the url as it is
    if (!params) {
        return url;
    }

    // replace the params in the url
    let result = url;
    for (const [key, value] of Object.entries(params)) {
        // replace all occurrences of the key in the url
        // but keys need to converted to snake_case
        const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();

        result = result.replace(new RegExp(`:${snakeCaseKey}`, "g"), value);
    }
    // if the url still contains a colon, it means there are still some params left
    // so we need to throw an error
    const missingParams = result.match(/:[a-zA-Z_-]+/g);
    if (missingParams) {
        // need to inform which params are missing
        throw new Error(`Missing params: ${missingParams.join(", ")}`);
    }
    return result;
};

export const createId = (prefix: string): string => {
    const numChars = 4;
    const validChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    return (
        prefix +
        "-" +
        Array.from(
            { length: numChars },
            () => validChars[Math.floor(Math.random() * validChars.length)]
        ).join("")
    );
};
