import React from 'react';
import Routes from './components/Routes';
import RecipeAppProvider from './context/RecipeAppProvider';

function App() {
  return (
    <RecipeAppProvider>
      <Routes />
    </RecipeAppProvider>
  );
}

export default App;
