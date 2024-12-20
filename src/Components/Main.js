import React, { useEffect, useState } from "react";
import {
  FetchPokemonApi,
  fetchPokemonId,
  fetchPokemonType,
  PokemonUrlFetchFromSelect,
} from "../Action/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoderStyle from "./LoderStyle";

const Main = () => {
  const pokemonData = useSelector((state) => state.PokemonData);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const Pokemontype = useSelector((state) => state.Pokemontype);
  const PokemonFetchtype = useSelector((state) => state.pokemonFetchtype);

  const [searchItem, setSearchItem] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isfilteredData, setISFilteredData] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FetchPokemonApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPokemonType());
  }, [dispatch]);

  useEffect(() => {
    setISFilteredData(true);
    setTimeout(() => {
      let filteredResult;

      if (selectedPokemonType && PokemonFetchtype.length) {
        filteredResult = PokemonFetchtype.filter((v) =>
          v.pokemon.name.toLowerCase().includes(searchItem.toLowerCase())
        );
      } else if (pokemonData?.results?.length) {
        filteredResult = pokemonData.results.filter((v) =>
          v.name.toLowerCase().includes(searchItem.toLowerCase())
        );
      } else {
        filteredResult = [];
      }

      setFilteredData(filteredResult);
      setISFilteredData(false);
    }, 1000);
  }, [pokemonData, PokemonFetchtype, searchItem, selectedPokemonType]);

  const handleDetailPage = (pokemonId) => {
    navigate(`/Details/${pokemonId}`);
    dispatch(fetchPokemonId(pokemonId));
  };

  const handleInputChange = (e) => setSearchItem(e.target.value);

  const handleTypeChange = (e) => {
    const selectedtype = e.target.value;
    setSelectedPokemonType(selectedtype);
    const pokemondatatypes = Pokemontype?.results?.find(
      (type) => type.name === selectedtype
    );
    if (pokemondatatypes) {
      dispatch(PokemonUrlFetchFromSelect(pokemondatatypes.url));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {loading ? (
        <LoderStyle />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchItem}
              onChange={handleInputChange}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <select
              value={selectedPokemonType}
              onChange={handleTypeChange}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Select Type</option>
              {Pokemontype?.results?.map((type, index) => (
                <option key={index} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {isfilteredData ? (
            <LoderStyle />
          ) : filteredData.length === 0 &&
            (searchItem || selectedPokemonType) ? (
            <p className="text-center text-lg text-gray-700">
              Data not found. Try a different search or type!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((item) => {
                const pokemon = item.pokemon || item;
                const pokemonId = pokemon.url?.split("/").slice(-2, -1)[0];
                return (
                  <div
                    key={pokemon.name}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 flex flex-col items-center transform"
                    onClick={() => handleDetailPage(pokemonId)}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                      alt={pokemon.name}
                      className="w-32 h-32 object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                      {pokemon.name}
                    </h3>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium uppercase tracking-wide px-4 py-2 rounded-full shadow-md transition-all">
                      Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Main;
