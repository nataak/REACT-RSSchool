import { Component } from 'react';

import Button from 'react-bootstrap/Button';

import './MainPage.css';

interface IState {
  films: Array<{
    episode_id: number;
    title: string;
    director: string;
    release_date: string;
  }>;
  searchTerm: string;
  hasError: boolean;
}

class MainPage extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      films: [],
      searchTerm: localStorage.getItem('searchTerm') || '',
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchTerm);
  }

  fetchData(searchTerm: string) {
    const apiUrl = searchTerm
      ? `https://swapi.dev/api/films/?search=${searchTerm.trim()}`
      : 'https://swapi.dev/api/films/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((outcome) => {
        this.setState(() => {
          return { films: outcome.results };
        });
      });
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm.trim());
    this.fetchData(searchTerm.trim());
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught:', error);
    console.error('Error info:', info);
    this.setState({ hasError: true });
  }

  throwError = () => {
    throw new Error('This is a test error.');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error Occurred</h1>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </div>
      );
    }

    return (
      <>
        <div>
          <nav className="top-section">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.handleSearchChange}
              />
              <button onClick={this.handleSearch}>Search</button>
            </div>
          </nav>
          <div className="row">
            <div className="col">
              <div>
                <h1>Star Wars Films</h1>
                <button onClick={this.throwError}>Throw Error</button>
                <div className="cards-container">
                  {this.state.films.map((film) => (
                    <div className="card" key={film.episode_id}>
                      <div className="card-header">
                        Director: {film.director}
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">{film.title}</h2>
                        <p>Release Date: {film.release_date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
