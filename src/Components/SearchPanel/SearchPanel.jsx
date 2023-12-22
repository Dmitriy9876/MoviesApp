import { Component } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import './SearchPanel.css';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 'search', // предположим, что по умолчанию активна кнопка "Search"
    };

    // Создаем debounced версию метода onSearch, который передается в props
    this.debouncedOnSearch = debounce(this.props.onSearch, 1000);
  }

  setActiveButton = (buttonName) => {
    this.setState({ activeButton: buttonName });
  };

  // Метод для обработки изменения поля ввода
  handleSearchChange = (event) => {
    // Вызываем debounced метод onSearch
    this.debouncedOnSearch(event.target.value);
  };

  render() {
    const { activeButton } = this.state;
    return (
      <div className="search-panel">
        <div className="button-box">
          <button
            className={`search-btn ${activeButton === 'search' ? 'active' : ''}`}
            type="button"
            onClick={() => this.setActiveButton('search')}
          >
            Search
          </button>
          <button
            className={`rated-btn ${activeButton === 'rated' ? 'active' : ''}`}
            type="button"
            onClick={() => this.setActiveButton('rated')}
          >
            Rated
          </button>
        </div>
        <Input
          className="search-input"
          placeholder="Type to search..."
          onChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

export default SearchPanel;