import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      status: 'loading',
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatedState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getGetMovie = async () => {
      const movie = await movieAPI.getMovie(id);
      this.updateState(movie, 'Manda Ver');
    };
    getGetMovie();
  }

  handleSubmit(updatedMovie) {
    const { shouldRedirect } = this.state;
    this.setState({
      movie: updatedMovie,
      shouldRedirect: !shouldRedirect,
    });
    movieAPI.updateMovie(updatedMovie);
  }

  updateState(movie, status) {
    this.setState({
      movie,
      status,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      // Redirect
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      // render Loading
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape(
    {
      isExact: PropTypes.bool.isRequired,
      params: PropTypes.shape(
        {
          id: PropTypes.string.isRequired,
        },
      ).isRequired,
    },
  ).isRequired,
};

export default EditMovie;
