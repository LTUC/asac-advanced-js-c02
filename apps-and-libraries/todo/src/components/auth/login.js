import React, { useContext } from 'react';
import { If, Then, Else } from 'react-if';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useForm from '../../hooks/form.js';
import { LoginContext } from './context.js';

const Login = (props) => {

  const { handleChange, handleSubmit } = useForm(handleLogin);
  const context = useContext(LoginContext);

  function handleLogin(user) {
    context.login(user.username, user.password);
  }

  return (
    <>
      <If condition={context.loggedIn}>
        <Then>
          <Button variant="danger" onClick={context.logout}>Log Out</Button>
        </Then>
        <Else>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control onChange={handleChange} size="sm" name="username" type="text" placeholder="Username" />
              </Col>
              <Col>
                <Form.Control onChange={handleChange} size="sm" name="password" type="password" />
              </Col>
              <Col>
                <Button type="submit" variant="dark" size="sm">Login</Button>
              </Col>
            </Row>
          </Form>
        </Else>
      </If>
    </>
  );
};

export default Login;
