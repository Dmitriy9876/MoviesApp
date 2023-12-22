import PropTypes from 'prop-types';
import { format } from 'date-fns';
import TrimText from '../../services/TrimText';
import './MovieCard.css';

function MovieCard({ movieTitle, genres, description, releaseDate, imgPath }) {

  // if (!imgPath) return null;
  
  const safeGenres = genres || [];

  const genresElement = safeGenres.map(genreItem => (
    <li key={genreItem.id} className='genresList__item'>{genreItem.name}</li>
  ));

  const formattedDate = format(new Date(releaseDate), 'MMMM d, yyyy');
  
  const shortDesc = TrimText(description, 200);
  
  const imgSrc = `http://image.tmdb.org/t/p/w500${imgPath}`;

  return (
    <li className='movieCard'>
      <img className="movieImg" src={imgSrc} alt={movieTitle} />
      <div>
        <h5 className='movieTitle'>{movieTitle}</h5>
        <span className='releaseDate'>{formattedDate}</span>
        <ul className='genresList'>
          {genresElement}
        </ul>
        <p className='description'>{shortDesc}</p>
      </div>
    </li>
  );
}

MovieCard.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  description: PropTypes.string,
  releaseDate: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
};

MovieCard.defaultProps = {
  description: '',
  genres: [],
};

export default MovieCard;