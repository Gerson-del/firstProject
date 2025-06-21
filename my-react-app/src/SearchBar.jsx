function SearchBar({ busqueda, setBusqueda, onBuscar }) {
  return (
    <div className="search-section">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Busca una película..."
      />
      <button onClick={onBuscar}>Buscar</button>
    </div>
  );
}

export default SearchBar;
