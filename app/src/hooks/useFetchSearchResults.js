import { useState, useEffect } from "react";
import { fetchApiUrl } from './apiUrl';

const useFetchSearchResults = (query, project, book, limit = 20) => {
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
                const objectParam = `?o=${project}`;
                const limitParam = `&limit=${limit}`;
                const bookParam = bookForQuery && bookForQuery.length > 0 ? `&book=${bookForQuery}` : "";
                const queryParam = query && query.length > 0 ? `&query=${query}` : "";
                const fullUrl = `${apiUrl}${objectParam}${bookParam}${queryParam}${limitParam}`;

                const response = await fetch(fullUrl);
                const apiData = await response.json();
                let remappedData = apiData;

                if (project == "sudoku" || project == "searchpuzzle") {
                    remappedData = remapLegacyKeys(apiData);
                }

                setData(remappedData);
            } catch (error) {
                setIsError(true);
                setErrorText(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [query, project, book, limit]);

    return { data, isLoading, isError, errorText };
};



function remapLegacyKeys(data) {
    const remappedData = data.map((item) => {
        const newObj = { ...item, id: item['Problem ID'], name: item['Problem Name'], book: item['Book'] };
        return newObj;
    });
    return remappedData;
}

export default useFetchSearchResults;