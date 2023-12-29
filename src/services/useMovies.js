import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "./../components/searchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(null);
  const lastSearch = useRef(search);

  const getMovies = useCallback(
    async ({ search }) => {
      if (search === lastSearch.current) return;

      try {
        setLoading(true);
        setErrorLoading(null);
        lastSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setErrorLoading(e.message);
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, errorLoading };
}

