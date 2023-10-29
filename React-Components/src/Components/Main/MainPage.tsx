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
    // Add other properties from the API response as needed
  }>;
}

class MainPage extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      films: [],
    };
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((outcome) =>
        this.setState(() => {
          return { films: outcome.results };
        })
      );
  }

  render() {
    return (
      <>
        <div>
          <Navbar className="navbar top-section">
            <InputGroup className="mb-3 search">
              <Form.Control placeholder="Search" type="text" />
              <Button variant="success" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Navbar>
          <Row className="row">
            <Col className="col">
              <div>
                <h1>Star Wars Films</h1>
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
                        <Card.Title className="card-title_1">
                          {' '}
                          {film.title}
                        </Card.Title>
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
