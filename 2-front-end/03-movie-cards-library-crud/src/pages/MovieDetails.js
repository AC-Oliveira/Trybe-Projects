import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movie: null,
    };
    this.movieDel = this.movieDel.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id)
      .then((movie) => this.movieMount(movie));
  }

  movieMount(movie) {
    const { isLoading } = this.state;
    this.setState({
      movie,
      isLoading: !isLoading,
    });
  }

  movieDel() {
    const { match: { params: { id } } } = this.props;
    movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state

    const { isLoading } = this.state;

    if (isLoading) return <Loading />;

    const { movie:
      { id, title, storyline, imagePath, genre, rating, subtitle } } = this.state;
    return (
      <div data-testid="movie-details">
        <h1>{`Title: ${title}`}</h1>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        {/* https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs */}
        <button type="button">
          <Link to="../">
            VOLTAR
          </Link>
        </button>
        <button type="button">
          <Link to={ `${id}/edit` }>
            EDITAR
          </Link>
        </button>
        <button type="button" onClick={ this.movieDel }>
          <Link to="../">
            DELETAR
          </Link>
        </button>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape(
    {
      isExact: PropTypes.bool.isRequired,
      params: PropTypes.shape(
        { id: PropTypes.string.isRequired },
      ).isRequired,
    },
  ).isRequired,

  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default MovieDetails;
