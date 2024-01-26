import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import AppLayout from "../../Layout/AppLayout";
import { userAuthContext } from "../../context/userAuthContext";
import Pagination from "./Pagination"; // Import the Pagination component
import "../../styles/Detail-free.css";
import { BiBookmark } from "react-icons/bi";
// import { saveBookToUserDrive } from '../../utils/usersDriveUtils';
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
function DetailBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookSavedState, setIsBookSaved] = useState(false);
  const { user } = useContext(userAuthContext);
  const itemsPerPage = 3; // Adjust as needed
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const selectedBook = booksData.find((book) => book.id === bookId);

        if (user) {
          const userDriveRef = doc(db, 'savedBooks', user.uid);
          const userDriveSnapshot = await getDoc(userDriveRef);
  
          if (userDriveSnapshot.exists()) {
            const savedBooksData = userDriveSnapshot.data();
            const isBookSaved = savedBooksData && savedBooksData.hasOwnProperty(bookId);
  
            setIsBookSaved(isBookSaved);
          }
        }
  
        setBook(selectedBook);
        const similarBooksData = booksData
          .filter(
            (book) =>
              book.id !== selectedBook.id &&
              book.category === selectedBook.category
              
          )
          .slice(0, 9);
        setSimilarBooks(similarBooksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);
  if (!book) {
    return <div>Loading...</div>;
  }

  const handleRead = () => {
    // Assuming book.pdfURL is the URL to the PDF file
    const downloadLink = document.createElement("a");
    downloadLink.href = book.pdfURL;
    downloadLink.download = `${book.title}.pdf`; // Set the desired file name
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSimilarBooksPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDownload = async () => {
    try {
      // Assuming you have a 'books' collection in Firestore
      const bookDocRef = doc(db, "books", bookId);
  
      // Get the book document from Firestore
      const bookDocSnapshot = await getDoc(bookDocRef);
  
      if (bookDocSnapshot.exists()) {
        // Access the pdfURL field in the document data
        const pdfURL = bookDocSnapshot.data().pdfURL;
  
        // Create a download link and trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfURL;
        downloadLink.download = `${book.title}.pdf`; // Set the desired file name
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
  
        console.log("Download initiated successfully.");
      } else {
        console.error("Book document not found.");
      }
    } catch (error) {
      console.error("Error initiating download:", error);
    }
  };

  const handleSaveBook = async () => {
    try {
      if (user) {
        const savedBooksRef = doc(db, "savedBooks", user.uid);
        const savedBookData = {
          [bookId]: {
            title: book.title,
            author: book.author,
            yearOfPublish: book.yearOfPublish,
            category: book.category,
            isFree: book.isFree,
            pdfURL: book.pdfURL,
            coverURL: book.coverURL,
            description: book.description,
            id: bookId,
            timestamp: serverTimestamp(),
          },
        };

        // Check if the book is already saved
        const isAlreadySaved = isBookSavedState;

        // If the book is already saved, remove it
        if (isAlreadySaved) {
          const savedBooksSnapshot = await getDoc(savedBooksRef);
          const savedBooksData = savedBooksSnapshot.data();

          if (savedBooksData && savedBooksData.hasOwnProperty(bookId)) {
            delete savedBooksData[bookId];
            await setDoc(savedBooksRef, savedBooksData);
            setIsBookSaved(false);
            console.log("Book removed from saved books.");
          }
        } else {
          // If the book is not saved, add it
          await setDoc(savedBooksRef, savedBookData, { merge: true });
          setIsBookSaved(true);
          console.log("Book saved successfully!");
        }
      } else {
        console.log("User is not logged in. Cannot save/unsave book.");
      }
    } catch (error) {
      console.error("Error saving/unsaving book:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSimilarBooks = similarBooks.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <AppLayout>
      <Container>
        <Card className="detail-card-size">
          <Row>
            <Col md={6}>
              <Card.Img
                variant="top"
                src={book.coverURL}
                className="book-size-detail border-0"
              />
            </Col>
            <Col md={6}>
              <Card.Title className="title">{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted author-name">
                {book.author}
              </Card.Subtitle>
              <Card.Text className="description">{book.description}</Card.Text>
              <Card.Text>
                <h7 className="variable">Category:</h7>
                <span className="category">{book.category}</span>
              </Card.Text>
              <Card.Text className="year-of-publish">
                <h7 className="variable">Publish Date:</h7>
                <span className="category">{book.yearOfPublish}</span>
              </Card.Text>
              <div className="button-container">
                {book.isFree && user ? (
                  <>
                    <Button
                      variant="primary"
                      className="custom-button"
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="custom-button"
                      onClick={handleRead}
                    >
                      Read
                    </Button>
                  </>
                ) : book.isFree && !user ? (
                  <Button
                    variant="outline-secondary"
                    className="custom-button"
                    href={book?.previewURL}
                    target="_blank"
                  >
                    Preview
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      className="custom-button"
                      href={book?.pdfURL}
                      target="_blank"
                    >
                      Purchase
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="custom-button"
                      href={book?.previewURL}
                      target="_blank"
                    >
                      Preview
                    </Button>
                  </>
                )}
                {/* {user ? (
                  <Button
                    variant="outline-secondary"
                    className="custom-button"
                    onClick={handleDownload}
                  >
                    Read
                  </Button>
                ) : (
                  <Button
                    variant="outline-secondary"
                    className="custom-button"
                    href={book?.previewURL}
                    target="_blank"
                  >
                    Preview
                  </Button>
                )} */}
                {/* {book.isFree && ? (
                  <>
                    <Button variant="primary" className="custom-button" onClick={handleDownload}>
                      Download
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="custom-button"
                    >
                      Preview
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      className="custom-button"
                      href={book?.pdfURL}
                      target="_blank"
                    >
                      Purchase
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="custom-button"
                      href={book?.previewURL}
                      target="_blank"
                    >
                      Preview
                    </Button>
                  </>
                )} */}
              </div>
            </Col>
          </Row>
          <Button
            variant="link"
            className="save-icon position-absolute top-0 end-0"
            onClick={handleSaveBook}
            title={isBookSavedState ? "Book Saved" : "Save to My Drive"}
          >
            <BiBookmark
              size={48}
              color={isBookSavedState ? "green" : "inherit"}
            />
          </Button>
        </Card>

        <Row className="mt-4">
          <h3>Similar Books</h3>
          {currentSimilarBooks.map((similarBook) => (
            <Col key={similarBook.id} xs={4} className="mb-4">
              <Link
                to={`/book-details/${similarBook.id}`}
                className="custom-card-link"
              >
                <Card className="custom-card">
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={similarBook.coverURL}
                        className="book-size"
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="title">
                          {similarBook.title}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted author">
                          {similarBook.author}
                        </Card.Subtitle>
                        <Card.Text className="text-muted more-info">
                          <strong>{similarBook.category}</strong> -{" "}
                          {similarBook.yearOfPublish}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Similar Books Pagination */}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={similarBooks.length}
          onPageChange={handleSimilarBooksPageChange}
        />
      </Container>
    </AppLayout>
  );
}

export default DetailBook;
