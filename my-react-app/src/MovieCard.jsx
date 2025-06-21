function MovieCard({ peli, onClick }) {
  return (
    <div
      className="movie-item"
      onClick={() => onClick(peli.id)}
      style={{
        backgroundImage: `url(${
          peli.poster || "/src/assets/defaultPoster1.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "200px",
        height: "300px",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <p className="movie-title">
        {peli.name} ({peli.year})
      </p>
    </div>
  );
}

export default MovieCard;
