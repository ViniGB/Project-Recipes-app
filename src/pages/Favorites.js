import React from 'react';
import Header from '../components/generics/header/Header';
import DoneAndFavoriteFilters from '../components/generics/Done&FavoriteFilters';
import FavoriteCards from '../components/generics/FavoriteCards';

function Favorites() {
  return (
    <div>
      <Header />
      <DoneAndFavoriteFilters />
      <FavoriteCards />
    </div>
  );
}

export default Favorites;
