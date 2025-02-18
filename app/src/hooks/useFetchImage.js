import { useState, useEffect } from "react";
import { fetchApiUrl } from './apiUrl';

const useFetchImage = (id) => {
    const [data, setData] = useState();
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
                const objectParam = '?o=image';
                const idParam = `&id=${id}`;
                const fullUrl = `${apiUrl}${objectParam}${idParam}`;

                const response = await fetch(fullUrl);
                const apiData = await response.json();
                if (apiData.error && apiData.error.length > 0) {
                    throw new Error(apiData.error);
                }
                setData(apiData);
            } catch (error) {
                setIsError(true);
                setErrorText(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { data, isLoading, isError, errorText };
};

export { useFetchImage };