import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css'; // Import your custom styles

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <Navbar style={{ backgroundColor: 'transparent', border: 'none' }}>
              <Nav>
                <Nav.Link href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></Nav.Link>
                <Nav.Link href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></Nav.Link>
                <Nav.Link href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></Nav.Link>
                <Nav.Link href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedin} /></Nav.Link>
                <Nav.Link href="#" className="social-icon"><FontAwesomeIcon icon={faGithub} /></Nav.Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <hr/>
        <h5>About Us</h5>
        <hr />
        <p className="text-center">© 2023 Tech-Book</p>
      </Container>
    </footer>
  );
}

export default Footer;
