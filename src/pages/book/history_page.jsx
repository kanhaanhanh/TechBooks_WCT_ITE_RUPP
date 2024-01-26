import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import "../../styles/history_page.css";
import AppLayout from "../../Layout/AppLayout";

const BookHistory = () => {
  return (
    <AppLayout>
      <Container>
        <h2 className="history-word">
          <u>Hi</u>story
        </h2>

        <div className="book-history">
          <p className="date-time">
            <strong>Today</strong>
          </p>
          <Row className="book-grid">
            {/* Repeat the following block for each book review */}
            <Col md={4} className="book-review col-sm-12">
              <Image
                src="../../assets/book-covers.jpg"
                alt="Image description"
                fluid
              />
              <div>
                <p className="book-title">Machine Learning A Probabilistic</p>
                <p className="book-author">
                  Perspective Author- <br />
                  Kevin P.Murphy
                </p>
                <p className="book-stats">
                  Artificial Intelligence-1098 page-2012-25MB-English
                </p>
              </div>
            </Col>
            <Col md={4} className="book-review col-sm-12">
              <Image
                src="../../assets/book-covers.jpg"
                alt="Image description"
                fluid
              />
              <div>
                <p className="book-title">Machine Learning A Probabilistic</p>
                <p className="book-author">
                  Perspective Author- <br />
                  Kevin P.Murphy
                </p>
                <p className="book-stats">
                  Artificial Intelligence-1098 page-2012-25MB-English
                </p>
              </div>
            </Col>
            <Col md={4} className="book-review col-sm-12">
              <Image
                src="../../assets/book-covers.jpg"
                alt="Image description"
                fluid
              />
              <div>
                <p className="book-title">Machine Learning A Probabilistic</p>
                <p className="book-author">
                  Perspective Author- <br />
                  Kevin P.Murphy
                </p>
                <p className="book-stats">
                  Artificial Intelligence-1098 page-2012-25MB-English
                </p>
              </div>
            </Col>
            {/* Repeat the above block for each book review */}
          </Row>
        </div>

        {/* Repeat the above structure for other date-time sections */}
      </Container>
    </AppLayout>
  );
};

export default BookHistory;
