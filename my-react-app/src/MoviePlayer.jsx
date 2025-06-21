function MoviePlayer({ imdbId, tipoContenido, season = 1, episode = 1 }) {
  const url =
    tipoContenido === "movie"
      ? `https://vidsrc.xyz/embed/movie?imdb=${imdbId}&autoplay=1`
      : `https://vidsrc.xyz/embed/tv?imdb=${imdbId}&season=${season}&episode=${episode}&autoplay=1`;

  return (
    <iframe
      src={url}
      width="100%"
      height="500px"
      allowFullScreen
      frameBorder="0"
      title="Reproductor"
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        border: "none",
      }}
    ></iframe>
  );
}

export default MoviePlayer;
