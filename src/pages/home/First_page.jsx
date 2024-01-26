import { useState, useContext } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import Pagination from "./Pagination";
import AppLayout from "../../Layout/AppLayout";
import { BookContext } from "../../context/bookContext";
import categoryData from "../../utils/categoryData";

function Home() {
  const { books, category, searchBook } = useContext(BookContext);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9; // Adjust as needed
  // const cardStyle = {
  //   width: "400px",
  //   height: "200px",
  // };
  const generateCard = (book) => (
    <Col xs={12} sm={6} md={4} className="mb-4" key={book.id}>
      <Link to={`/book-details/${book.id}`} className="link-text">
        <Card className="custom-card">
          <Row noGutters>
            <Col xs={4}>
              <Card.Img
                variant="top"
                src={book.coverURL}
                className="book-size"
                alt={`Cover for ${book.title}`}
              />
            </Col>
            <Col xs={8}>
              <Card.Body>
                <Card.Title style={{overflow:"hidden",textOverflow: "ellipsis"}}>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author}
                </Card.Subtitle>
                <Card.Text className="text-muted more-info">
                  {book.category} - {book.yearOfPublish} 
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentBooks;
  let bookCate;
  let bookSearch;
  if (category != "all") {
    bookCate = categoryData(books, category, "all");
    currentBooks = bookCate.slice(indexOfFirstItem, indexOfLastItem);
  } else if (searchBook !== "all") {
    bookSearch = categoryData(books, "all", searchBook);
    currentBooks = bookSearch.slice(indexOfFirstItem, indexOfLastItem);
  } else {
    currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
  }

  return (
    <AppLayout>
      <Container>
        <h3>Technology always update, upgrade your skill now</h3>
        <p>The Newest technology </p>
        <Row className="mt-4" spacing={2}>
          {currentBooks.map((book) => generateCard(book))}
        </Row>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={
            category != "all"
              ? bookCate.length
              : searchBook != "all"
              ? bookSearch.length
              : books.length
          }
          onPageChange={setCurrentPage}
        />
      </Container>
    </AppLayout>
  );
}

export default Home;
