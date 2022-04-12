import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MovieList, MovieDetails, NewMovie, EditMovie, NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MovieList />
        </Route>

        <Route exact path="/movies/new">
          <NewMovie />
        </Route>

        <Route
          exact
          path="/movies/:id"
          render={ (props) => (
            <MovieDetails { ...props } />
          ) }
        />

        <Route
          exact
          path="/movies/:id/edit"
          render={
            (props) => (
              <EditMovie { ...props } />)
          }
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
