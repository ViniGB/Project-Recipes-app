import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredientFoods from './pages/ExploreIngredientFoods';
import ExploreIngredientDrinks from './pages/ExploreIngredientDrinks';
import ExploreNationality from './pages/ExploreNationality';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/explore/drinks/nationalities">
          <NotFound />
        </Route>
        <Route path="/explore/foods/nationalities">
          <ExploreNationality />
        </Route>
        <Route path="/explore/drinks/ingredients">
          <ExploreIngredientDrinks />
        </Route>
        <Route path="/explore/foods/ingredients">
          <ExploreIngredientFoods />
        </Route>
        <Route path="/explore/foods">
          <ExploreFoods />
        </Route>
        <Route path="/explore/drinks">
          <ExploreDrinks />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/foods/:id/in-progress">
          <FoodInProgress />
        </Route>
        <Route path="/foods/:id">
          <FoodDetails />
        </Route>
        <Route path="/foods">
          <Foods />
        </Route>
        <Route path="/drinks/:id/in-progress">
          <DrinkInProgress />
        </Route>
        <Route path="/drinks/:id">
          <DrinkDetails />
        </Route>
        <Route path="/drinks">
          <Drinks />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/done-recipes">
          <DoneRecipes />
        </Route>
        <Route path="/favorite-recipes">
          <Favorites />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
