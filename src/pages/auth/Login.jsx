import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/signup_login_styles.css";
import Logo from "../../assets/new-logo.png";

const Login = () => {
  useEffect(() => {
    document.body.classList.add("login-signup-body");

    // Additional login page specific styles or logic
    return () => {
      document.body.classList.remove("login-signup-body");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  // Set initial value of rememberMe based on local storage
  const initialRememberMe = localStorage.getItem("rememberMe") === "true";
  const [rememberMe, setRememberMe] = useState(initialRememberMe);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");

    if (storedEmail && rememberMe) {
      setEmail(storedEmail);
    }
  }, [rememberMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const LogIn = await logIn(email, password);

      // Remember the email if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      if (LogIn === "admin") {
        console.log("Admin login!");
        navigate("/Admin");
      } else {
        console.log("User login!");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    navigate("/Forgot-Password");
  };

  // Update local storage when rememberMe changes
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe.toString());
  }, [rememberMe]);

  return (
    <Container>
      <header>
        <Link className="techbook-logo" to="/" aria-label="Tech-Book">
          <img src={Logo} alt="Tech-Book Logo" />
        </Link>
      </header>
      <main>
        <div className="card flex-row mx-auto position-absolute top-50 start-50 translate-middle">
          <div className="img-right-sign_up d-none d-md-flex"></div>
          <Card.Body className="card-body-log-in">
            <div className="logo-img">
              <img src={Logo} alt="Logo" />
            </div>
            <h3 className=" mt-1 text-center" style={{ color: "blue" }}>
              Welcome to Tech-Book!
            </h3>
            <h5 className="text-center mt-4" style={{ marginBottom: "30px" }}>
              Login into your account!
            </h5>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="form-box px-3" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="form-input">
                  <span>
                    <i className="fa fa-envelope-o"></i>
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div className="form-input">
                  <span>
                    <i className="fa fa-key"></i>
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>
              <Row className="mb-3">
                <Col xs={6}>
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                </Col>
                <Col xs={6} className="text-end">
                  <div onClick={handleReset} className="forget-link">
                    Forget Password
                  </div>
                </Col>
              </Row>
              <div className="d-grid gap-2 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-pill"
                >
                  Log in
                </Button>
              </div>
              <div className="text-center mt-3">
                Don&sbquo;t have an account? <Link to="/signup">Sign up</Link>
              </div>
            </Form>
          </Card.Body>
        </div>
      </main>
    </Container>
  );
};

export default Login;
