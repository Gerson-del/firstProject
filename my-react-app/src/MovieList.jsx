import MovieCard from "./MovieCard";

function MovieList({ peliculas, onSeleccionar }) {
  return (
    <div className="movie-list">
      {peliculas.map((peli) => (
        <MovieCard key={peli.id} peli={peli} onClick={onSeleccionar} />
      ))}
    </div>
  );
}

export default MovieList;
