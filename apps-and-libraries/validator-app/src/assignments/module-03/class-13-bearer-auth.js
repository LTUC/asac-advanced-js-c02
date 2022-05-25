import React, { useState } from 'react';

import superagent from 'superagent';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { When } from 'react-if';

import Login from './components/login.js';

const useStyles = makeStyles((theme) => ({
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
}));

function BearerAuth(props) {

  const [output, setOutput] = useState('');
  const [token, setToken] = useState('');
  const classes = useStyles();

  const handleLogin = (response) => {
    response.token ? setToken(response.token) : setToken(response);
  };

  const getSecretStuff = async (e) => {
    e.preventDefault();
    try {
      let api = localStorage.getItem('api');
      let response = await superagent.get(`${api}/secret`).set('Authorization', `Bearer ${token}`);
      console.log('rb', response.body);
      setOutput(response.text || response.body || 'no output');
    } catch (e) {
      setOutput(JSON.stringify(e.response.body, null, 2));
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Bearer Authentication</Typography>
      <Typography className={classes.divider}>
        After identifying the URL to your auth server, use the forms below to use your <strong>/signup</strong> and <strong>/signin</strong> routes. Once you are logged in, your server will have hopefully sent a "token" ... the "Get The Secret Stuff" button will then use that token to hit your <strong>/secret</strong> route on your server with that token. The "Output" section beneath will show you the response received from your server.
      </Typography>
      <Login handler={handleLogin} />
      <Divider className={classes.divider} />
      <When condition={token}>
        <Button type="submit" variant="contained" color="primary" onClick={getSecretStuff}>
          Get the Secret Stuff!
        </Button>
      </When>
      <pre className={classes.output}>{output}</pre>
    </div>
  );
}

export default BearerAuth;
