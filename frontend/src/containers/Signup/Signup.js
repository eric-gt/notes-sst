import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useAppContext } from "../../lib/contextLib";
import { useFormFields } from "../../lib/hooksLib";
import "./Signup.css";
import { onError } from "../../lib/errorLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  const { email, password, confirmPassword, confirmationCode } = fields;

  function validateForm() {
    return email.length > 0 && password.length > 0 && confirmPasswords();
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  function confirmPasswords() {
    return password === confirmPassword;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({ password, username: email });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocustype="tel"
            onChange={handleFieldChange}
            value={confirmationCode}
          />
          <Form.Text muted>
            Please check your email for the confirmation code.
          </Form.Text>
        </Form.Group>
        <LoaderButton
          block="true"
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }
  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        {!confirmPasswords() && (
          <div>
            <p>Passwords Do Not Match</p>
          </div>
        )}

        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block="true"
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Sign Up
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
