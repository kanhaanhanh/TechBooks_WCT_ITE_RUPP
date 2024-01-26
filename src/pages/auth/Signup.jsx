import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
import { Card, Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/signup_login_styles.css';
import Logo from '../../assets/new-logo.png';

const Signup = () => {
    const {signUp} = useUserAuth();
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        comfirmPassword: "",
    });
    const userhandler = (event) => {
        const {name, value} = event.target;
        console.log(name + ":::::::::::::" + value)
        setUser((perState) => ({...perState, [name]: value}));
    };
    const RegisterHandler = (e) => {
        e.preventDefault();
        const { email, password, comfirmPassword, firstName, lastName} = user;
        if (password !== comfirmPassword) {
            setInterval(() => {
                setError("");
            }, 5000);
            return setError("password does not match!");
        }
        if (error) {
            setInterval(() => {
                setError("");
            }, 5000);
            setError(error);
        }
        signUp(email, password, firstName, lastName);
    }

    return (
        <Container>
            <header>
                <Link className="techbook-logo" to="/" aria-label="Tech-Book">
                    <img src={Logo} alt="Tech-Book Logo" />
                </Link>
            </header>
            <main>
                <Row className="d-flex">
                    <Col md={6} className="ml-auto">
                        <Card className="position-absolute top-50 start-50 translate-middle flex-row">
                            <div className="img-right-sign_up d-none d-md-flex"></div>
                            <Card.Body className="card-body-sign-up">
                                <div className="logo-img">
                                    <img src={Logo} alt="Logo" />
                                </div>
                                <h3 className=" mt-1 text-center" style={{ color: 'blue' }}>
                                    Welcome to Tech-Book!
                                </h3>
                                <h5 className="text-center mt-4" style={{ marginBottom: '30px' }}>
                                    Create an account
                                </h5>
                                <Form className="form-box px-3" onSubmit={RegisterHandler}>
                                    <Row className="d-flex justify-content-between">
                                        <Col md={6}>
                                            <div className="form-input">
                                            <span><i className="fa fa-user"></i></span>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                onChange={userhandler}
                                                required
                                            />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-input">
                                            <span><i className="fa fa-user"></i></span>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                onChange={userhandler}
                                                required
                                            />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <div className="form-input">
                                            <span><i className="fa fa-envelope-o"></i></span>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                onChange={userhandler}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <div className="form-input">
                                            <span><i className="fa fa-key"></i></span>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={userhandler}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <div className="form-input">
                                            <span><i className="fa fa-key"></i></span>
                                            <Form.Control
                                                type="password"
                                                name="comfirmPassword"
                                                placeholder="Confirm Password"
                                                onChange={userhandler}
                                                required
                                            />
                                            <span className="error-message" id="error-message"></span>
                                        </div>
                                    </Form.Group>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <div className="d-grid gap-2">
                                        <Button type="submit" variant="primary" className="rounded-pill">
                                            Sign up
                                        </Button>
                                    </div>
                                    <div className="text-center mt-3">
                                        Already have an account? <Link to="/login" className="login-link">Log In</Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
        </Container>
    );
};

export default Signup;