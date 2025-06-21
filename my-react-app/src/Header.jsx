function Header({ tipoContenido, setTipoContenido }) {
  return (
    <header className="header">
      <h1>🎬 MovieFlix</h1>
      <select
        value={tipoContenido}
        onChange={(e) => setTipoContenido(e.target.value)}
      >
        <option value="movie">Películas</option>
        <option value="tv_series">Series</option>
      </select>
    </header>
  );
}

export default Header;
