// ForgotPassword.jsx
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/ForgotPassword.css"; // Import styles from the CSS module
import Logo from "../../assets/new-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState({
    success: null,
    error: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;

    try {
      await sendPasswordResetEmail(auth, emailVal);
      setResetStatus({ success: true, error: null });
    } catch (err) {
      setResetStatus({ success: false, error: err.message });
    }
  };

  const handleTryagain = () => {
    setResetStatus({ success: null, error: null });
  };

  return (
    <main>
      <div
        className={
          "flex-row mx-auto position-absolute top-50 start-50 translate-middle card-body-forgot-password"
        }
      >
        <div className="logo-img">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {resetStatus.success && (
          <div variant="success">
            Check your email for password reset instructions if this email is
            connected to a TechBooks account, you'll be able to reset your
            password. Didn't get the email? Try these tips from our{" "}
            <Link to="/help">Help Center!</Link>
          </div>
        )}

        {resetStatus.error && (
          <Alert variant="danger">{resetStatus.error}</Alert>
        )}

        {!resetStatus.success && (
          <div>
            <h3 className="mt-1 text-center" style={{ color: "blue" }}>
              Forgot Password
            </h3>
            <h5 className="text-center mt-4" style={{ marginBottom: "30px" }}>
              Enter your email to reset your password.
            </h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className={`${"form-input"} form-input`}>
                  <span>
                    <i className="fa fa-envelope-o"></i>
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <div className="d-grid gap-2 ">
                <Button
                  type="submit"
                  variant="primary"
                  className={`rounded-pill ${"rounded-pill"}`}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </div>
        )}

        {resetStatus.success && (
          <div className="text-center mt-3">
            <Button
              variant="outline-danger"
              onClick={handleTryagain}
              className="me-2 btn"
            >
              Try Again
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="me-2"
            >
              Back to Login
            </Button>
          </div>
        )}

        {resetStatus.error && (
          <div className="text-center mt-3">
            <Button variant="link" onClick={handleTryagain}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
