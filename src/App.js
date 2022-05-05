import React from 'react';
import RecipeAppProvider from './context/RecipeAppProvider';
import Routes from './Routes';

function App() {
  return (
    <RecipeAppProvider>
      <Routes />
    </RecipeAppProvider>
  );
}

export default App;
