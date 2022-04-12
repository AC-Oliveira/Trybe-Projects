import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading, MovieCard } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      movies: [],
    };
  }

  componentDidMount() {
    movieAPI.getMovies().then((movie) => (
      this.moviesMount(movie)
    ));
  }

  onMount() {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  }

  moviesMount(arr) {
    this.setState(() => ({
      movies: [...arr],
    }));
    this.onMount();
  }

  render() {
    const { isLoading, movies } = this.state;

    // Render Loading here if the request is still happening
    if (isLoading) return <div data-testid="movie-list"><Loading /></div>;
    return (
      <div data-testid="movie-list">
        {movies.map(
          (movie) => <MovieCard movie={ movie } key={ movie.title } />,
        )}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
