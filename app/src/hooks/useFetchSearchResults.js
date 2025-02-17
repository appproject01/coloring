import { useState, useEffect } from "react";
import { fetchApiUrl } from './apiUrl';

const useFetchSearchResults = (query, book, limit = 20) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {

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

                const bookForQuery = book === "all" ? "" : book.replace(/_/g, " ");
                const objectParam = '?o=drawing';
                const limitParam = `&limit=${limit}`;
                const bookParam = bookForQuery && bookForQuery.length > 0 ? `&book=${bookForQuery}` : "";
                const queryParam = query && query.length > 0 ? `&query=${query}` : "";
                const fullUrl = `${apiUrl}${objectParam}${bookParam}${queryParam}${limitParam}`;

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
    }, [query, book, limit]);

    return { data, isLoading, isError, errorText };
};

export default useFetchSearchResults;