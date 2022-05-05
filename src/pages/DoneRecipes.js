import React from 'react';
import Header from '../components/generics/header/Header';
import DoneAndFavoriteFilters from '../components/generics/Done&FavoriteFilters';
import DoneCards from '../components/generics/DoneCards';
// import Footer from '../components/Footer';

function DoneRecipes() {
  return (
    <div>
      <Header />
      <DoneAndFavoriteFilters />
      <DoneCards />
      {/* <Footer /> */}
    </div>
  );
}

export default DoneRecipes;
