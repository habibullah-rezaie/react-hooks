// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Habibullah" />
}

export default App

function useLocalStorageState(key, defaultValue = '') {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, name)
  }, [name, key])

  return [name, setName]
}
