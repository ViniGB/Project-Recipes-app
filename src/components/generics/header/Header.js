import React, { useEffect, useState, Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Search from './HeaderSearch';
import { getTestTitle, getSearchButton } from '../../../helpers/getTitle';
import { Disclosure, Transition } from '@headlessui/react';
import { CookingPot, MagnifyingGlass, User } from 'phosphor-react';

function Header() {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  useEffect(() => {
    const foundTitle = getTestTitle(location.pathname);
    const showSearchButton = getSearchButton(location.pathname);
    setTitle(foundTitle);
    setSearchButton(showSearchButton);
  }, [location]);

  return (
    <Disclosure as="nav" className="bg-brand-secondary">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <CookingPot size={50} className="text-brand-buttonText m-1" />
                  <h2
                    data-testid="page-title"
                    className="text-2xl font-semibold"
                  >
                    {title}
                  </h2>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {searchButton
                  && (
                    <Disclosure.Button
                      className="bg-transparent p-1 rounded-full text-brand-buttonText transition-colors hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black"
                    >
                      <MagnifyingGlass size={30} />
                    </Disclosure.Button>

                  )}
                <div className="ml-3 relative">
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    className="bg-transparent p-1 rounded-full text-brand-buttonText transition-colors hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-brand-background focus:ring-brand-highlight"
                  >
                    <User size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Search />
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}







export default Header;

