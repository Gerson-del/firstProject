import { useState, useEffect } from "react";

function ContainerEpisodio({ temporadas, setSeasonAndEpisode }) {
  const [currentSeason, setCurrentSeason] = useState(temporadas[0]);

  useEffect(() => {
    setCurrentSeason(temporadas[0]); // actualiza si cambian las props
  }, [temporadas]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedSeason = temporadas.find(
      (t) => t.temporada.toString() === selectedValue
    );
    setCurrentSeason(selectedSeason);
  };

  const handleClickEpisodio = (episodioNum) => {
    setSeasonAndEpisode(currentSeason.temporada, episodioNum);
  };

  if (!currentSeason) return null;

  return (
    <>
      <select value={currentSeason.temporada} onChange={handleChange}>
        {temporadas.map((temporada) => (
          <option key={temporada.temporada} value={temporada.temporada}>
            Temporada {temporada.temporada}
          </option>
        ))}
      </select>
      <div className="episodiosContainer">
        {currentSeason.episodios.map((episodio) => (
          <div
            key={episodio.id}
            onClick={() => handleClickEpisodio(episodio.episode_number)}
            style={{ cursor: "pointer" }}
          >
            <img src={episodio.thumbnail_url} alt={episodio.name} />
            <p>{episodio.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContainerEpisodio;
