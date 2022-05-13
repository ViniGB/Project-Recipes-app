import { Compass, ForkKnife, Martini } from 'phosphor-react';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();

  return (
    <footer
      className="fixed w-full bottom-0 max-w-container mx-auto text-center bg-brand-secondary"
      data-testid="footer"
    >
      <div className="max-w-7xl bottom-0 mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 pr-2">
          <div className="flex-1 flex items-stretch justify-between">
            <div className="">
              <button
                className="drink-btn"
                type="button"
                onClick={() => history.push('/drinks')}
              >
                <Martini size={50} />
              </button>
            </div>
            <div className="">
              <button
                className="explore-btn"
                type="button"
                onClick={() => history.push('/explore')}
              >
                <Compass size={50} />
              </button>
            </div>
            <div className="">
              <button
                className="meal-btn"
                type="button"
                onClick={() => history.push('/foods')}
              >
                <ForkKnife size={50} />
              </button>
            </div>
          </div >
      </div>
    </div>
        </footer>
  );
}

export default Footer;
