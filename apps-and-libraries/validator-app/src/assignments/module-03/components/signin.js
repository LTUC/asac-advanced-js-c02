import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import superagent from 'superagent';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Signin({ api, handler }) {

  const classes = useStyles();

  const [data, setData] = useState({});

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (data.username && data.password) {
      try {
        const response = await superagent.post(`${api}/signin`).auth(data.username, data.password);
        response.type === 'application/json' ? handler(response.body) : handler(response.text);
      } catch (e) {
        e.response ? handler({ error: e.response.body }) : handler({ error: e });
      }
    }
    else { handler({ error: 'Missing Username or Password' }); }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography variant="h4" noWrap>
        Sign In
      </Typography>
      <form className={classes.form} onSubmit={handleSignIn}>
        <FormControl>
          <TextField id="signin-user" name="username" label="User Name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <TextField id="signin-pass" name="password" label="Password" type="password" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default Signin;
