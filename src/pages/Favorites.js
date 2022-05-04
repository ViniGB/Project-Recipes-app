import React from 'react';
import Header from '../components/Header';
import DoneAndFavoriteFilters from '../components/Done&FavoriteFilters';
import FavoriteCards from '../components/FavoriteCards';

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
