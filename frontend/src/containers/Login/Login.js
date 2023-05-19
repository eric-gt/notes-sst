import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../lib/contextLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { onError } from "../../lib/errorLib";
import { useFormFields } from "../../lib/hooksLib";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const { email, password } = fields;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
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
        <LoaderButton
          block="true"
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
