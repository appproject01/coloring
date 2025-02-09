import { useState, useEffect } from "react";
import { fetchApiUrl } from './apiUrl';

const useFetchSearchResults = (query, book, preloadedData = []) => {
    const [data, setData] = useState(preloadedData); // Initialize with preloadedData
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        // If preloadedData has length > 0, skip fetching
        if (preloadedData.length > 0) {
            return;
        }

        const { apiUrl, error } = fetchApiUrl();

        if (error) {
            setIsError(true);
            setErrorText(error);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);
            setErrorText("");

            try {
                const objectParam = '?o=drawing';
                const bookParam = book && book.length > 0 ? `&book=${book}` : "";
                const fullUrl = `${apiUrl}${objectParam}${bookParam}`;

                const response = await fetch(fullUrl);
                const apiData = await response.json();
                setData(apiData);
            } catch (error) {
                setIsError(true);
                setErrorText(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query, book]);

    return { data, isLoading, isError, errorText };
};

export default useFetchSearchResults;