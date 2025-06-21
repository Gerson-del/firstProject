import MoviePlayer from "./MoviePlayer";

function MovieModal({ contenido, tipoContenido, season = 1, episode = 1 }) {
  return (
    <>
      <MoviePlayer
        imdbId={contenido.imdb_id}
        tipoContenido={tipoContenido}
        season={season}
        episode={episode}
      />

      {contenido.poster && (
        <img
          src={contenido.poster}
          alt="Poster"
          style={{
            width: "300px",
            borderRadius: "30px",
            padding: "20px",
          }}
        />
      )}

      <h2>{contenido.title}</h2>
      <p>{contenido.plot_overview}</p>
      <p>Duración: {contenido.runtime_minutes} min</p>
      <p>Género: {contenido.genre_names?.join(", ")}</p>
      <p>Clasificación: {contenido.us_rating}</p>
      <p>imdb_id : {contenido.imdb_id}</p>
    </>
  );
}

export default MovieModal;
