import { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Col, Row } from 'react-bootstrap';
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
          <Navbar className="navbar top-section">
            <InputGroup className="mb-3 search">
              <Form.Control
                placeholder="Search"
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleSearchChange}
              />
              <Button variant="success" id="button-addon2" onClick={this.handleSearch}>
                Search
              </Button>
            </InputGroup>
          </Navbar>
          <Row className="row">
            <Col className="col">
              <div>
                <h1>Star Wars Films</h1>
                <Button variant="danger" onClick={this.throwError}>
                  Throw Error
                </Button>
                <div className="cards-container">
                  {this.state.films.map((film) => (
                    <Card
                      className="card"
                      border="success"
                      style={{ width: '18rem' }}
                      key={film.episode_id}
                    >
                      <Card.Header>Director: {film.director}</Card.Header>
                      <Card.Body>
                        <Card.Title className="card-title_1">{film.title}</Card.Title>
                        <Card.Text>Release Date: {film.release_date}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MainPage;
