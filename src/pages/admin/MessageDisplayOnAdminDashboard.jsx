import AdminLayout from "../../Layout/AdminLayout";
import "../../styles/AdminSomethingDisplay.css"
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MessageDisplayOnAdminDashboard = () => {

  const [bookRequests, setBookRequests] = useState([]);

  useEffect(() => {
    const fetchBookRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookRequests'));
        const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookRequests(requests);
      } catch (error) {
        console.error('Error fetching book requests: ', error);
      }
    };

    fetchBookRequests();
  }, []);

  return (
    <AdminLayout>
      <div>MessageDisplayOnAdminDashboard</div>
      <Container>
        <h2 className="history-word">Book Requests List</h2>
        <Row>
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author Name</th>
                  <th>Publish Date</th>
                  <th>Book Link</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {bookRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.BookTitle}</td>
                    <td>{request.AuthorName}</td>
                    <td>{request.PublishDate}</td>
                    <td>{request.BookLink}</td>
                    <td>{request.Reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default MessageDisplayOnAdminDashboard;
