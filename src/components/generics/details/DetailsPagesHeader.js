import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchDrinkById, fetchFoodById } from '../../../services/detailsPagesAPIs';
import DetailsHeaderButtons from './DetailsHeaderButtons';

function DetailsPagesHeader() {
  const [detailsData, setDetailsData] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
  const currId = id;

  useEffect(() => {
    if (pathname.includes('foods')) {
      fetchFoodById(currId).then((dataById) => setDetailsData(dataById));
    }
    if (pathname.includes('drinks')) {
      fetchDrinkById(currId).then((dataById) => setDetailsData(dataById));
    }
  }, [currId, pathname]);

  return (detailsData.length === 1
    ? (
      <>
        <div className="sm:overflow-hidden">
          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-xl lg:px-8">
            <img
              className="rounded-lg w-full h-full object-center object-cover"
              src={pathname.includes('foods')
                ? detailsData[0].strMealThumb
                : detailsData[0].strDrinkThumb}
              data-testid="recipe-photo"
              alt="recipe-img"
            />

            <div className="grid grid-cols-2">
              <h1
                data-testid="recipe-title"
                className="ml-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
              >
                {pathname.includes('foods')
                  ? detailsData[0].strMeal
                  : detailsData[0].strDrink}
              </h1>
              <div className="flex flex-1 justify-end">
                <DetailsHeaderButtons />
              </div>
              <span
                data-testid="recipe-category"
                className='ml-2'
              >
                {pathname.includes('foods')
                  ? `Category: ${detailsData[0].strCategory}`
                  : `Category: ${detailsData[0].strAlcoholic}`}
              </span>
            </div>
          </div>
        </div>
      </>)
    : null);
}

export default DetailsPagesHeader;
