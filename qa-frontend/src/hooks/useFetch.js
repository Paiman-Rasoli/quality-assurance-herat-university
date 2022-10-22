import { useEffect, useState } from "react";

const API_URL = "http://localhost:1111/api/";

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (path) => {
    setLoading(true);
    try {
      const data = await fetch(API_URL + path, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAsImxldmVsIjp0cnVlLCJ1c2VybmFtZSI6Imhhcm9sZEBkZXYudG8ifSwiaWF0IjoxNjY1NzUyMjU0fQ.5v-S7f9bjFHE8prbSu1tdhZ380Xqa0a6t6a5hkCcRwg",
        },
      });
      const json = await data.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(path);
  }, [path]);

  function refetch() {
    fetchData(path);
  }

  return { data, error, loading, refetch };
};

export default useFetch;
