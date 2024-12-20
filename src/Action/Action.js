import {
  LOADING_DATA,
  POKEMON_DETAIL,
  POKEMON_FAIL,
  POKEMON_FETCH_TYPE,
  POKEMON_ID,
  POKEMON_SUCCESS,
  POKEMON_TYPE,
} from "../Constant/PokemonConst";

export const fetchPokemon = (Pokemon) => ({
  type: POKEMON_SUCCESS,
  payload: Pokemon,
});

export const failPokemon = (error) => ({
  type: POKEMON_FAIL,
  payload: error,
});

export const setLoading = (Loading) => ({
  type: LOADING_DATA,
  payload: Loading,
});

export const PokemonDetail = (PokemoneDetails) => ({
  type: POKEMON_DETAIL,
  payload: PokemoneDetails,
});

export const PokemonIds = (PokemonId) => ({
  type: POKEMON_ID,
  payload: PokemonId,
});

export const PokemonType = (pokemontype) => ({
  type: POKEMON_TYPE,
  payload: pokemontype,
});

export const PokemonTypeFetch = (pokemonFetchtype) => ({
  type: POKEMON_FETCH_TYPE,
  payload: pokemonFetchtype,
});

// export function FetchPokemonApi() {
//   return async (dispatch, getState) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await fetch("https://pokeapi.co/api/v2/pokemon");
//       const data = await response.json();

//       dispatch(fetchPokemon(data));
//     } catch (error) {
//       dispatch(failPokemon(error));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// }

export function FetchPokemonApi() {
  const payload = {
    abc: "1212",
  };
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json", 
        },
     
      });
      const data = await response.json();
      dispatch(fetchPokemon(data));
    } catch (error) {
      console.log("error", error);

      dispatch(failPokemon(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function PokemonUrlFetchFromSelect(url) {
  console.log("url", url);

  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch(PokemonTypeFetch(data.pokemon));
    } catch (error) {
      dispatch(failPokemon(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function FetchPokemonDetail(PokemoneId) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${PokemoneId}`
      );
      const data = await response.json();
      dispatch(PokemonDetail(data));
      dispatch(failPokemon(data));
    } catch (error) {
      dispatch(failPokemon(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function fetchPokemonId(pokemonId) {
  return async (dispatch, getState) => {
    dispatch(PokemonIds(pokemonId));
  };
}

export function fetchPokemonType() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      const data = await response.json();
      dispatch(PokemonType(data));
    } catch (error) {
      dispatch(failPokemon(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
