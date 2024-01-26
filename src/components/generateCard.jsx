
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const generateCard = (book) => (
  <Col xs={12} sm={6} md={4} className="mb-4" key={book.id}>
    
    <Link to={`/book-details/${book.id}`} className="link-text">
      <Card className="custom-card">
        <Row noGutters>
          <Col xs={4}>
            <Card.Img variant="top" src={book.coverURL} className="book-size" />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
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

export default generateCard;
