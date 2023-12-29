import "./App.css";
import { useState } from "react";
import { useSearch } from "./services/useSearch";
import { useMovies } from "./services/useMovies";
import { Movies } from "./components/Movies";
import debounce from "just-debounce-it";
import { useCallback } from "react";

export function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading, errorLoading } = useMovies({
    search,
    sort,
  });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),

    []
  );

  const handleSort = () => {
    setSort(!sort);
  };

  const handleInputChange = (event) => {
    const newSearch = event.target.value;

    setSearch(newSearch);
    // getMovies({search: newSearch});
    debouncedGetMovies(newSearch);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  return (
    <>
      <div className="page">
        <header>
          <h1 className="">List of movies</h1>

          <form onSubmit={handleSubmit} className="form">
            <input
              onChange={handleInputChange}
              value={search}
              name="search"
              className="rounded-md p-2"
              type="text"
              placeholder="Avengers, Batman, Avatar"
            />
            <input
              type="checkbox"
              onChange={handleSort}
              checked={sort}
              disabled={error}
            ></input>
            <button className="rounded-md p-2" type="submit">
              Search
            </button>

            {errorLoading && <p style={{ color: "red" }}>{errorLoading}</p>}
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </header>

        <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
      </div>
    </>
  );
}

export default App;
