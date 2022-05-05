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
      <div>
        <img
          className="recipe-img"
          src={ pathname.includes('foods')
            ? detailsData[0].strMealThumb
            : detailsData[0].strDrinkThumb }
          data-testid="recipe-photo"
          alt="recipe-img"
        />

        <div className="details-page">
          <h2 data-testid="recipe-title">
            { pathname.includes('foods')
              ? detailsData[0].strMeal
              : detailsData[0].strDrink }
          </h2>

          <DetailsHeaderButtons />

          <span data-testid="recipe-category">
            { pathname.includes('foods')
              ? detailsData[0].strCategory
              : detailsData[0].strAlcoholic }
          </span>
        </div>
      </div>)
    : null);
}

export default DetailsPagesHeader;
