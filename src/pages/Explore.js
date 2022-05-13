import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';

function Explore() {
  return (
    <>
      <Header />
      <div className="flex flex-1 items-center justify-center max-w-7xl mx-auto m-2">
        <div className="max-w-2xl mx-auto">
          <div className="m-7 pt-16 flex flex-1 justify-center items-center flex-col gap-9">
            <Link to="/explore/foods">
              <button
                type="button"
                data-testid="explore-foods"
                className="py-10 px-28 border border-transparent text-xl m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
              >
                Explore Foods
              </button>
            </Link>
            <Link to="/explore/drinks">
              <button
                type="button"
                data-testid="explore-drinks"
                className="py-10 px-28 border border-transparent text-xl m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
              >
                Explore Drinks
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
