import { useEffect } from "react";
import { useState } from "react";
import SearchBar from "./searchBar";
import MovieList from "./MovieList";
import MovieModal from "./MovieModal";
import Modal from "./modal";
import Header from "./Header";
import ContainerEpisodio from "./ContainerEpisodio";
import { object } from "prop-types";

function MovieSearchApp() {
  const [busqueda, setBusqueda] = useState("");
  const [resPelicula, setResPelicula] = useState([]);
  const [detalles, setDetalles] = useState(null);
  const [peliculaSeleccionadaId, setPeliculaSeleccionadaId] = useState(null);
  const [err, setErr] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoModal, setContenidoModal] = useState(null);
  const [tipoContenido, setTipoContenido] = useState("movie");
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [temporadas, setTemporadas] = useState([]);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  useEffect(() => {
    console.log("Tipo de contenido cambió:", tipoContenido);
    setBusquedaRealizada(false); // Oculta <h2> al cambiar
  }, [tipoContenido]);

  const buscarPeliculas = async () => {
    setErr(null);
    setDetalles(null);
    setPeliculaSeleccionadaId(null);
    setBusquedaRealizada(true);

    const response = await fetch(
      `https://api.watchmode.com/v1/search/?apiKey=JKwUJnsdh6lSNysu5u0qSuYAQrHQfOcczN6h4Hlj&search_field=name&search_value=${encodeURIComponent(
        busqueda
      )}`
    );

    const data = await response.json();
    const movieList = data.title_results || [];
    console.log(movieList);
    const peliculas = movieList.filter(
      (item) => item.type === tipoContenido && item.id != null
    );

    const peliculasConPoster = await Promise.all(
      peliculas.map(async (peli) => {
        try {
          const detallesRes = await fetch(
            `https://api.watchmode.com/v1/title/${peli.id}/details/?apiKey=JKwUJnsdh6lSNysu5u0qSuYAQrHQfOcczN6h4Hlj`
          );

          const detallesData = await detallesRes.json();

          return {
            ...peli,
            poster: detallesData.poster,
            imdb_id: detallesData.imdb_id,
          };
        } catch (err) {
          return peli;
        }
      })
    );

    const peliculaConPosterYPlayer = peliculasConPoster.filter(
      (peli) => peli.imdb_id != null
    );
    setResPelicula(peliculaConPosterYPlayer);
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
      console.log(data);
      setContenidoModal(data);
      setModalAbierto(true);
      setDetalles(data);

      if (tipoContenido === "tv_series") {
        const responseEpisodios = await fetch(
          `https://api.watchmode.com/v1/title/${id}/episodes/?apiKey=JKwUJnsdh6lSNysu5u0qSuYAQrHQfOcczN6h4Hlj`
        );

        const dataEpisodios = await responseEpisodios.json();

        console.log(dataEpisodios);

        let episodiosPorTemp = Object.groupBy(
          dataEpisodios,
          ({ season_number }) => season_number
        );

        let temporadas = Object.entries(episodiosPorTemp)
          .map(([key, value]) => ({
            temporada: key,
            episodios: value.sort(
              (a, b) => a.episode_number - b.episode_number
            ),
          }))
          .sort((a, b) => a.temporada - b.temporada);

        setTemporadas(temporadas);
      }

      return data;
    } catch (error) {
      setErr("Error al obtener detalles de la película.");
    }
  };

  return (
    <div className="app-container">
      <Header
        tipoContenido={tipoContenido}
        setTipoContenido={setTipoContenido}
      />

      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        onBuscar={buscarPeliculas}
      />

      {busquedaRealizada && (
        <h2>
          Todas tus {tipoContenido == "movie" ? "peliculas" : "tv_series"}{" "}
          disponibles
        </h2>
      )}

      {err && <p style={{ color: "red" }}>{err}</p>}

      <MovieList
        peliculas={resPelicula}
        onSeleccionar={obtenerDetallesPeliculas}
      />

      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        {contenidoModal && (
          <>
            <MovieModal
              contenido={contenidoModal}
              tipoContenido={tipoContenido}
              season={season}
              episode={episode}
            />

            <ContainerEpisodio
              temporadas={temporadas}
              setSeasonAndEpisode={(s, e) => {
                setSeason(Number(s));
                setEpisode(Number(e));
              }}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default MovieSearchApp;
