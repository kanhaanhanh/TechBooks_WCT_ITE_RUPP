// Import the necessary functions
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/book-request-page2.css';
import SwitchPage from './SwitchPage';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import BookLayout from '../../Layout/BookLayout';

const BookRequestPage1 = () => {
  const [user, setUser] = useState(
    {
      BookLink: '', Reason: ''
    }
  )
  let name, value
  console.log(user)
  const data = (e) =>
  {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]: value});
  }
  const getdata = async (e) =>
  {
    const {BookLink, Reason} = user;
    e.preventDefault();
     // Add validation for required fields
    if (!BookLink || !Reason) {
      alert('Please fill in all required fields');
      return;
    }

    // Additional validation for URL
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlPattern.test(BookLink)) {
      alert('Please enter a valid URL');
      return;
    }

    try {
      const bookRequestRef = await addDoc(collection(db, 'bookRequests'), {
        BookLink,
        Reason,
      });

      console.log('Document written with ID: ', bookRequestRef.id);

      alert('Message Sent');

      // Reset form fields after successful submission
      setUser({
        BookLink: '',
        Reason: '',
      });
    } catch (error) {
      console.error('Error writing document: ', error);
      alert('Error Occurred');
    }
  };
  return (
  <BookLayout>  <Container>
  <h2 className="history-word">Book Request</h2>
  <Row>
    <Col md={4}>
      <Form className="choice">
        <SwitchPage/>
      </Form>
    </Col>

    <Col md={8} className="under-header-middle">
      <Form method = "POST">
        <Row className="form-flexbox">
          <Col md={12} className="form-row">
            <Form.Control
              type="url"
              name="BookLink"
              placeholder="Link to the book"
              className="form-control form-control-lg"
              style={{maxWidth: '70%', minWidth: '30%' }}
              value={user.BookLink}
              onChange={data}
              required
              pattern="https?://.+"
            />
          </Col>
        </Row>
        <Row className="form-flexbox">
          <Col md={12} className="form-row">
            <Form.Control
              type="text"
              name="Reason"
              placeholder="Reason"
              className="form-control"
              style={{ maxWidth: '70%', minWidth: '30%' }} 
              value={user.Reason}
              onChange={data}
              required
            />
          </Col>
        </Row>
        <Row className="form-flexbox">
          <Col md={12} className="form-row">
            <Button onClick={getdata} type="submit" style={{ maxWidth: '70%', minWidth: '30%' }}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
</Container></BookLayout>
  );
};

export default BookRequestPage1;