import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Cannot find an empty movie");
      return;
    }

    if (search.length < 3) {
      setError("Search must be at least 3 characters");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
