// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon';

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    async function effect() {
      if (!pokemonName) return;

      setPokemon(null);
      const newPokemon = await fetchPokemon(pokemonName);

      setPokemon(newPokemon);
    }

    effect();
  }, [pokemonName]);

  if (!pokemonName) {
    return 'Submit a pokemon';
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
