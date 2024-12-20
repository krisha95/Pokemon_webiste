import {
  LOADING_DATA,
  POKEMON_DETAIL,
  POKEMON_FAIL,
  POKEMON_FETCH_TYPE,
  POKEMON_ID,
  POKEMON_SUCCESS,
  POKEMON_TYPE,
} from "../Constant/PokemonConst";

const initialState = {
  PokemonData: [],
  PokemoneDetails: [],
  Pokemontype: [],
  Loading: false,
  error: null,
  PokemonId: null,
  pokemonFetchtype: [],
};
const PokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEMON_SUCCESS:
      return {
        ...state,
        PokemonData: action.payload,
        error: null,
        Loading: false,
      };

    case POKEMON_DETAIL:
      return {
        ...state,
        PokemoneDetails: action.payload,
        error: null,
        Loading: false,
      };

    case POKEMON_ID:
      return {
        ...state,
        PokemonId: action.payload,
        error: null,
        Loading: false,
      };

    case POKEMON_TYPE:
      return {
        ...state,
        Pokemontype: action.payload,
        error: null,
        Loading: false,
      };

    case POKEMON_FETCH_TYPE:
      return {
        ...state,
        pokemonFetchtype: action.payload,
        error: null,
        Loading: false,
      };

    case POKEMON_FAIL:
      return {
        ...state,
        error: action.payload,
        Loading: false,
      };

    case LOADING_DATA:
      return {
        ...state,
        error: action.payload,
        Loading: true,
      };

    default:
      return state;
  }
};

export default PokemonReducer;
