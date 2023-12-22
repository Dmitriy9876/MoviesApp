import { Component } from 'react';
import { Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import MovieDBapi from '../../services/MovieDBapi';
import MovieList from '../MovieList';
import SearchPanel from '../SearchPanel';
import PaginationComponent from "../Pagination";
import Loader from '../Loader';
import './App.css';

class App extends Component {

  state = {
    movieList: [],
    loading: false,
    searchTerm: '',
    error: null,
    currentPage: 1, // Текущая страница для пагинации
    totalResults: 0, // Общее количество результатов для пагинации
  };

  componentDidMount() {
    this.fetchAndSetMovies();
  }

  componentDidUpdate(prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      window.scrollTo(0, 0);
    }
  }

  movieDBApi = new MovieDBapi();

  fetchAndSetMovies = async (searchTerm = '', page = 1) => {
    this.setState({ loading: true, error: null });
  
    try {
      let data;
      if (searchTerm) {
        data = await this.movieDBApi.searchMovies(searchTerm, page);
      } else {
        data = await this.movieDBApi.getPopularMovies(page);
      }
  
      // Отфильтровываем фильмы без imgPath
      const validMovies = data.results.filter(movie => movie.poster_path);
  
      // Выбираем первые шесть фильмов из отфильтрованных результатов
      const moviesToShow = validMovies.slice(0, 6);
  
      this.setState({
        movieList: moviesToShow,
        loading: false,
        totalResults: data.total_results,
        currentPage: page,
      });
  
      if (moviesToShow.length === 0) {
        this.setState({ error: 'No movies found.' });
      }
    } catch (error) {
      this.setState({ error: 'Error fetching movies!', loading: false });
    }
  };
 

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
    this.fetchAndSetMovies(searchTerm);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.fetchAndSetMovies(this.state.searchTerm, page);
  };

  render() {
    const { movieList, loading, error, currentPage, totalResults } = this.state;
    const errorAlert = error && <Alert message="Ошибка!" description={error} type="error" showIcon closable />;

    return (
      <div className="app">
        <Offline>
          <Alert message="Нет подключения к интернету" type="warning" showIcon closable />
        </Offline>
        <Online>
          <SearchPanel onSearch={this.handleSearch} />
          {loading && <Loader />}
          {error && errorAlert}
          {!loading && !error && <MovieList movieList={movieList} />}
          {!loading && !error && <PaginationComponent
            current={currentPage}
            total={totalResults}
            onChange={this.handlePageChange}
          />}
        </Online>
      </div>
    );
  }
}

export default App;