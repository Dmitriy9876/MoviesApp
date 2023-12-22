import PropTypes from 'prop-types';
import MovieCard from '../MovieCard';
import './MovieList.css';

function  MovieList({ movieList }) {
  const leftMovieList = movieList.map((movieItem) => (
        <MovieCard 
          key={movieItem.id}
          movieTitle={movieItem.original_title}
          releaseDate={movieItem.release_date}
          genres={movieItem.genres}
          description={movieItem.overview}
          imgPath={movieItem.poster_path}
        />
    ));

  return (

    <ul className='movieList'>
        {leftMovieList}
    </ul>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    original_title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    overview: PropTypes.string,
    poster_path: PropTypes.string.isRequired,
  })).isRequired,
};

export default MovieList;