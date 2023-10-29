import { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
import './MainPage.css';

interface IState {
  films: [];
}

class MainPage extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      films: [],
    };
  }
  componentDidMount() {
    fetch('https://swapi.dev/api/films/?format=json')
      .then((response) => response.json())
      .then((results) => this.setState(() => {
        return { films: results };
      }, () => {
        console.log(this.state)
      }));
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
              1 of 1fffffffffffffffffffffffffffffffffffffff
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MainPage;
