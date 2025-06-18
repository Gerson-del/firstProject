import { use, useState } from "react";
import Modal from "./modal";

function MovieSearchApp() {
  const [busqueda, setBusqueda] = useState("");
  const [resPelicula, setResPelicula] = useState(null);
  const [detalles, setDetalles] = useState(null);
  const [peliculaSeleccionadaId, setPeliculaSeleccionadaId] = useState(null);
  const [err, setErr] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoModal, setContenidoModal] = useState(null);

  const buscarPeliculas = async () => {
    setErr(null);
    setDetalles(null);
    setPeliculaSeleccionadaId(null);

    const response = await fetch(
      `https://api.watchmode.com/v1/search/?apiKey=JKwUJnsdh6lSNysu5u0qSuYAQrHQfOcczN6h4Hlj&search_field=name&search_value=${encodeURIComponent(
        busqueda
      )}`
    );

    const data = await response.json();
    const movieList = data.title_results || [];
    const peliculas = movieList.filter((item) => item.type === "movie");

    setResPelicula(peliculas);
  };

  const obtenerDetallesPeliculas = async (id) => {
    setErr(null);
    setDetalles(null);
    setPeliculaSeleccionadaId(id);

    try {
      const response = await fetch(
        `https://api.watchmode.com/v1/title/${id}/details/?apiKey=JKwUJnsdh6lSNysu5u0qSuYAQrHQfOcczN6h4Hlj`
      );
      const data = await response.json();
      setContenidoModal(data);
      setModalAbierto(true);
      setDetalles(data);
    } catch (error) {
      setErr("Error al obtener detalles de la película.");
    }
  };

  return (
    <div className="app-container">
      <div className="search-section">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Busca una película..."
        />
        <button onClick={buscarPeliculas}>Buscar</button>
      </div>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <div className="movie-list">
        {resPelicula &&
          resPelicula.map((peli) => (
            <div
              className="movie-item"
              key={peli.id}
              onClick={() => obtenerDetallesPeliculas(peli.id)}
            >
              <p>
                <strong>{peli.name}</strong> ({peli.year})
              </p>
            </div>
          ))}
      </div>

      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        {contenidoModal && (
          <>
            {contenidoModal.poster && (
              <img
                src={contenidoModal.poster}
                alt="Poster"
                style={{ width: "300px", borderRadius: "20px" }}
              />
            )}
            <h2>{contenidoModal.title}</h2>
            <p>{contenidoModal.plot_overview}</p>
            <p>Duración: {contenidoModal.runtime_minutes} min</p>
            <p>Género: {contenidoModal.genre_names?.join(", ")}</p>
            <p>Clasificación: {contenidoModal.us_rating}</p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default MovieSearchApp;
