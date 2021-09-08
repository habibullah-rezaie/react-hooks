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
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setError(null);
    setPokemon(null);

    async function effect() {
      try {
        const newPokemon = await fetchPokemon(pokemonName);
        setPokemon(newPokemon);
      } catch (error) {
        setError(error);
      }
    }

    if (pokemonName) effect();
  }, [pokemonName]);

  if (error) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <img
          style={{
            maxWidth: '100%',
            maxHeight: '200px',
            marginLeft: '1.75rem',
            marginTop: '1.75rem',
          }}
          src={'/img/pokemon/pikachu-sad.png'}
          alt="Sad Pikachu"
          title="Sad Pikachu"
        />
      </div>
    );
  }
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
