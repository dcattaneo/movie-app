export const Movies = ({ movies }) => {
  return (
    <>
      {movies && (
        <ul className="movies">
          {movies.map((movie) => {
            return (
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <h4>{movie.year}</h4>
                <img src={movie.image} alt={movie.title} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
