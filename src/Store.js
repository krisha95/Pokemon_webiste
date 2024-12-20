import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  
import PokemonReducer from './Reducer/PokemonReducer';

const store = createStore(PokemonReducer, applyMiddleware(thunk));

export default store;
