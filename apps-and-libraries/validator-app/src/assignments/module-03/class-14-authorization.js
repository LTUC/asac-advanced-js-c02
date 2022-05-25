import React, { useState } from 'react';

import superagent from 'superagent';
import jwt_decode from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import { If, Then, Else } from 'react-if';

import Login from './components/login.js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  divider: {
    margin: '1em',
  },
  output: {
    maxWidth: '600px',
    padding: '2em',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  buttons: {
    width: '75%',
    margin: '1em',
    alignSelf: 'center',
  },
}));

function Authorization(props) {

  const [user, setUser] = useState({});
  const [output, setOutput] = useState('');
  const [token, setToken] = useState('');
  const classes = useStyles();

  const handleLogin = (response) => {
    if (typeof (response) === 'object') {
      response.user && setUser(response.user);
      response.token && setToken(response.token);
    } else if (typeof (response) === 'string' && jwt_decode(response)) {
      setToken(response);
      setUser(jwt_decode(response) || {});
    }
  };

  const api = async (e, route, method) => {
    e.preventDefault();
    try {
      let api = localStorage.getItem('api');
      let response = await superagent(method, `${api}/${route}`).set('Authorization', `Bearer ${token}`);
      console.log(response);
      setOutput(response.text || response.body || 'no output');
    } catch (e) {
      console.log('out');
      setOutput(JSON.stringify(e.response.body, null, 2));
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Authorizaton / ACL</Typography>
      <Typography className={classes.divider}>
        After identifying the URL to your auth server, use the forms below to use your <strong>/signup</strong> and <strong>/signin</strong> routes. Once you are logged in, your server will have hopefully sent a "token" ... A series of buttons will then use that token to hit your <strong>/add, /change, /remove, /read</strong> routes on your server with that token. The "Output" section beneath will show you the response received from your server.
      </Typography>
      <Login handler={handleLogin} />
      <Divider className={classes.divider} />
      <If condition={token}>
        <Then>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs>
                <ButtonGroup
                  className={classes.buttons}
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical outlined primary button group"
                >
                  <Button type="submit" onClick={(e) => api(e, 'read', 'get')}>Read</Button>
                  <Button type="submit" onClick={(e) => api(e, 'add', 'post')}>Add</Button>
                  <Button type="submit" onClick={(e) => api(e, 'change', 'put')}>Change</Button>
                  <Button type="submit" onClick={(e) => api(e, 'remove', 'delete')}>Remove</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs>
                <Typography variant="h5">
                  User:
                </Typography>
                <div><strong>Username</strong>: {user.username || 'No Username provided in response'}</div>
                <div><strong>Full Name</strong>: {user.fullname || 'No Name provided in response'}</div>
                <div><strong>Email</strong>: {user.email || 'No email provided in response'}</div>
              </Grid>
              <Grid item xs>
                <pre className={classes.output}>
                  {output}
                </pre>
              </Grid>
            </Grid>
          </div>
        </Then>
        <Else>
          <pre className={classes.output}>
            {output}
          </pre>
        </Else>
      </If>

    </div>
  );
}

export default Authorization;
