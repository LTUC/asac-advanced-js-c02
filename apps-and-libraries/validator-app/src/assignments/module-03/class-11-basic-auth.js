import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import Login from './components/login.js';
import { Typography } from '@material-ui/core';

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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function BasicAuth(props) {

  const [json, setJson] = useState('');

  const classes = useStyles();

  const handleLogin = (response) => {
    setJson(JSON.stringify(response, null, 2));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Basic Authentication</Typography>

      <Typography className={classes.divider}>
        After identifying the URL to your auth server, use the forms below to use your <strong>/signup</strong> and <strong>/signin</strong> routes. The "Output" section will show you the response received from your server.
      </Typography>
      <Login handler={handleLogin} />
      <Divider className={classes.divider} />
      <Paper elevation={0} variant="outlined" square>
        <pre className={classes.output}>{json}</pre>
      </Paper>
    </div>
  );
}

export default BasicAuth;
