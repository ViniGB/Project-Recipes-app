import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';

function Explore() {
  return (
    <div>
      <Header />
      <Link to="/explore/foods">
        <button
          type="button"
          data-testid="explore-foods"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
