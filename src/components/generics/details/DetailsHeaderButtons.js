import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import handleUrlCopy from '../../../helpers/detailsHeaderHelpers';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import RecipeContext from '../../../context/RecipeAppContext';
import {
  setFavoriteRecipe,
  addOrRemoveLocalStorageRecipe,
  setFavoriteIconColor,
} from '../../../helpers/setFavoriteRecipe';
import { ShareNetwork } from 'phosphor-react';
import { Dialog, Transition } from '@headlessui/react'


function DetailsHeaderButtons() {
  const [favIcon, setFavIcon] = useState(whiteHeartIcon);
  const { dataById } = useContext(RecipeContext);
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
  const currId = id;
  const favoriteRecipe = setFavoriteRecipe(pathname, currId, dataById);
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const checkIfIdIsFavorited = favoriteRecipes
        .some((recipe) => Number(recipe.id) === Number(currId));
      if (checkIfIdIsFavorited) {
        setFavIcon(blackHeartIcon);
      }
    }
  }, [currId, favIcon, favoriteRecipe]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteIconColor(favIcon, setFavIcon);
    addOrRemoveLocalStorageRecipe(favoriteRecipes, favoriteRecipe, favIcon, currId);
  };

  return (
    <>
      <button
        type="button"
        className="share-btn"
        onClick={() => handleUrlCopy(pathname, currId, setIsOpen)}
      >
        <ShareNetwork size={32} />
      </button>
      <button
        type="button"
        className="bg-transparent p-1 rounded-full text-brand-buttonText"
        onClick={handleFavoriteClick}
      >
        <img
          className="favorite-icon"
          data-testid="favorite-btn"
          src={favIcon}
          alt="favorite-icon"
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:w-48 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Link copied!
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DetailsHeaderButtons;
