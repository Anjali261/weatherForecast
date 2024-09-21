import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <div className="App">
      <Suspense >
        <h1 style={{textAlign:"center" , padding:"1rem" , backgroundImage : "linear-gradient(to right, red , yellow)"}}>Weather App</h1>
        <HomePage />
      </Suspense>
    </div>
  );
}

export default App;
