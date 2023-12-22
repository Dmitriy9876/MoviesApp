export default class MovieDBapi {
  baseApi = 'https://api.themoviedb.org/3';
  
  token = 'ad8adbb06e53c3f9318605818058225c';

  async getResource(url) {
    const res = await fetch(`${this.baseApi}${url}&api_key=${this.token}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  getMovie(id) {
    return this.getResource(`/movie/${id}?`);
  }

  getPopularMovies(page) {
    return this.getResource(`/movie/popular?language=en-US&page=${page}`);
  }
  
  searchMovies(query, page) {
    return this.getResource(`/search/movie?query=${query}&language=en-US&page=${page}`);
  }
}

// https://api.themoviedb.org/3/movie/11?api_key=ad8adbb06e53c3f9318605818058225c