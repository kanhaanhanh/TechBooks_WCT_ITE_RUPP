// Import the necessary functions
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/book-request-page2.css';
import SwitchPage from './SwitchPage';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import BookLayout from '../../Layout/BookLayout';

const BookRequestPage2 = () => {
  const [user, setUser] = useState({
    BookTitle: '',
    AuthorName: '',
    PublishDate: '',
    Reason: '',
  });

  const data = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getdata = async (e) => {
    e.preventDefault();
    const { BookTitle, AuthorName, PublishDate, Reason } = user;

    // Add validation for required fields
    if (!BookTitle || !AuthorName || !PublishDate || !Reason) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const bookRequestRef = await addDoc(collection(db, 'bookRequests'), {
        BookTitle,
        AuthorName,
        PublishDate,
        Reason,
      });

      console.log('Document written with ID: ', bookRequestRef.id);

      alert('Message Sent');

      // Reset form fields after successful submission
      setUser({
        BookTitle: '',
        AuthorName: '',
        PublishDate: '',
        Reason: '',
      });
    } catch (error) {
      console.error('Error writing document: ', error);
      alert('Error Occurred');
    }
  };

  return (
    <BookLayout>
      <Container>
      <h2 className="history-word">Book Request</h2>
      <Row>
        <Col md={4}>
          <Form className="choice">
            <SwitchPage />
          </Form>
        </Col>
        <Col md={8} className="under-header-middle">
          <Form method="POST">
            {/* Form inputs */}
            <Row className="form-flexbox">
              <Col md={12} className="form-row">
                <Form.Control
                  type="text"
                  name="BookTitle"
                  placeholder="Book title*"
                  className="form-control"
                  style={{ maxWidth: '70%', minWidth: '30%' }}
                  value={user.BookTitle}
                  onChange={data}
                  required
                />
              </Col>
            </Row>
            <Row className="form-flexbox">
              <Col md={12} className="form-row">
                <Form.Control
                  type="text"
                  name="AuthorName"
                  placeholder="Author name*"
                  className="form-control"
                  style={{ maxWidth: '70%', minWidth: '30%' }}
                  value={user.AuthorName}
                  onChange={data}
                  required
                />
              </Col>
              <Col md={12} className="form-row">
                <Form.Control
                  type="date"
                  name="PublishDate"
                  placeholder="Date of Published"
                  className="form-control"
                  style={{ maxWidth: '70%', minWidth: '30%' }}
                  value={user.PublishDate}
                  onChange={data}
                  required
                />
              </Col>
            </Row>
            <Row className="form-flexbox">
              <Col md={12} className="form-row">
                <Form.Control
                  type="text"
                  name="Reason"
                  placeholder="Reason*"
                  className="form-control"
                  style={{ maxWidth: '70%', minWidth: '30%' }}
                  value={user.Reason}
                  onChange={data}
                  required
                />
              </Col>
            </Row>
            <Row className="form-flexbox">
              <Col md={12} className="submit">
                <Button onClick={getdata} type="submit" style={{ maxWidth: '70%', minWidth: '30%' }}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
    </BookLayout>
  );
};

export default BookRequestPage2;
