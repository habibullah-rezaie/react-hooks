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

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize, deserialize} = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  },
) {
  function lazyInit() {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  }

  const [name, setName] = React.useState(lazyInit)

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    if (prevKeyRef.current !== key) {
      prevKeyRef.current = key
      window.localStorage.removeItem(key)
    }

    window.localStorage.setItem(key, serialize(name))
  }, [name, key, serialize])

  return [name, setName]
}
