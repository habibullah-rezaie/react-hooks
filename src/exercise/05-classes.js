// useRef and useEffect: DOM interaction
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/05-classes.js

import * as React from 'react';
import VanillaTilt from 'vanilla-tilt';

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

function Tilt({children}) {
  const tiltRef = React.useRef(null);

  React.useEffect(() => {
    const tiltNode = tiltRef.current;

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    return () => tiltNode.vanillaTilt.destroy();
  }, []);

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  );
}

export default App;
