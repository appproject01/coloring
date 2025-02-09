export const fetchApiUrl = () => {
    try {
        const apiUrl = import.meta.env.VITE_BE_API_URL;
        if (!apiUrl) {
            throw new Error("variable VITE_BE_API_URL is not defined");
        }
        if (apiUrl == "") {
            throw new Error("variable VITE_BE_API_URL is blank");
        }

        return { apiUrl, error: null };
    } catch (error) {
        return { apiUrl: null, error: `Environment error: ${error.message}` };
    }
};
