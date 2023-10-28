import { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row } from 'react-bootstrap';
import './MainPage.css';

class MainPage extends Component {
  render() {
    return(
      <><Navbar
        className="navbar"
      >
        <InputGroup className="mb-3 search">
          <Form.Control
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2" />
          <Button variant="success" id="button-addon2">
            Button
          </Button>
        </InputGroup>
      </Navbar>
          <Row className='row'>
            <Col className='col'>1 of 1fffffffffffffffffffffffffffffffffffffff</Col>
          </Row>
        </>
    );
  }
}

export default MainPage;
