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
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  });

  React.useEffect(() => {
    if (pokemonName) {
      setState({status: 'pending'});

      fetchPokemon(pokemonName)
        .then(newPokemon => {
          setState({pokemon: newPokemon, status: 'resolved'});
        })
        .catch(error => {
          setState({error, status: 'rejected'});
        });
    }
  }, [pokemonName]);

  switch (state.status) {
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;

    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />;

    case 'rejected':
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
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

    // case: 'idle'
    default:
      return 'Submit a pokemon';
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
