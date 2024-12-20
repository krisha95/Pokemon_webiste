import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPokemonDetail } from "../Action/Action";
import { NavLink } from "react-router-dom";
import LoderStyle from "./LoderStyle";

const PokemonDetails = () => {
  const PokemoneDetails = useSelector((state) => state.PokemoneDetails);
  const PokemoneId = useSelector((state) => state.PokemonId);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const PokemoneID = window.location.href.split("/").pop();
  useEffect(() => {
    dispatch(FetchPokemonDetail(PokemoneID));
  }, [dispatch, PokemoneID]);

  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const getTypeColor = (type) => typeColors[type] || "#68A090";

  const PokemoneBase = PokemoneDetails?.stats
    ?.map((stat, index) => stat.stat.name)
    .toString();

  const pokemonabilities = PokemoneDetails?.abilities
    ?.map((ability, index) => ability.ability.name)
    .toString();

  const pokemonMove = PokemoneDetails?.moves
    ?.slice(0, 5)
    .map((move, index) => move.move.name)
    .toString();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="flex items-center gap-2">
          <NavLink to={"/"} className="text-blue-500">
            &lt; Back
          </NavLink>
          <span className="text-lg font-semibold capitalize">
            {PokemoneDetails?.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
        {loading ? (
          <p className="text-center text-lg text-red-600">
            Error occurred, please try again!
          </p>
        ) : error ? (
          <LoderStyle />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
              <div
                className="flex flex-col items-center text-white p-5 overflow-hidden"
                style={{
                  backgroundColor: getTypeColor(
                    PokemoneDetails?.types?.[0]?.type?.name
                  ),
                }}
              >
                <div className="w-36 h-36 overflow-hidde">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      PokemoneId || PokemoneID
                    }.png`}
                    alt={PokemoneDetails?.name || "Pokemon"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold capitalize mt-3">
                  {PokemoneDetails?.name || "Unknown Pokémon"}
                </h1>
                <div className="flex gap-2 flex-wrap mt-2">
                  {PokemoneDetails?.types?.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full text-sm capitalize"
                      style={{ backgroundColor: getTypeColor(type.type.name) }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Base Stats
                  </h2>
                  <p>{PokemoneBase}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Abilities
                  </h2>
                  <p>{pokemonabilities}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Moves (Top 5)
                  </h2>
                  <div className="flex gap-2 flex-wrap">{pokemonMove}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PokemonDetails;
