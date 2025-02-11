import { useState, useEffect } from "react";
import { fetchApiUrl } from './apiUrl';

const useFetchSolution = (id) => {
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
                const objectParam = '?o=drawing';
                const idParam = `&id=${id}`;
                const fullUrl = `${apiUrl}${objectParam}${idParam}`;

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
    }, [id]);

    return { data, isLoading, isError, errorText };
};

export { useFetchSolution };