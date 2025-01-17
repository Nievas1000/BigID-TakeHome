import { useEffect, useState } from "react";
import api from "../utils/api";

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(endpoint)
            .then((response) => {
                setData(response.data.data);
                setError(null);
            })
            .catch((error) => {
                console.error(`Error fetching data:`, error);
                setError(`Failed to fetch data. Please try again later.`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetch;