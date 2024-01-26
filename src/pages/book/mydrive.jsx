import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppLayout from '../../Layout/AppLayout';
import { userAuthContext } from '../../context/userAuthContext';
import generateCard from '../../components/generateCard';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getFormattedDate } from '../../utils/dateUtils';

const MyDrive = () => {
  const { user } = useContext(userAuthContext);
  const [savedBooks, setSavedBooks] = useState([]);
  const formattedDate = getFormattedDate();

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        if (user) {
          const userDriveRef = doc(db, 'savedBooks', user.uid);
          const userDriveSnapshot = await getDoc(userDriveRef);

          if (userDriveSnapshot.exists()) {
            const savedBooksData = userDriveSnapshot.data();
            const books = Object.values(savedBooksData);
            setSavedBooks(books);
          }
        }
      } catch (error) {
        console.error('Error fetching saved books:', error);
      }
    };

    fetchSavedBooks();
  }, [user]);

  return (
    <AppLayout isUserLoggedIn={user != null}>
      <Container>
        <h2 className="history-word">My Drive</h2>
        <div className="book-history">
          <p className="date-time">
            <strong>{formattedDate}</strong>
          </p>
          <Row className="book-grid">
            {savedBooks.map((book) => generateCard(book))}
          </Row>
        </div>
        {/* Repeat the above structure for other date-time sections */}
      </Container>
    </AppLayout>
  );
};

export default MyDrive;
