import React from 'react';
import Header from '../components/Header';
import DoneAndFavoriteFilters from '../components/Done&FavoriteFilters';
import DoneCards from '../components/DoneCards';
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
