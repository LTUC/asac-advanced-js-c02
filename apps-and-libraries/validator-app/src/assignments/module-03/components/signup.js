import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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

function Signup({ api, handler }) {

  const classes = useStyles();

  const [data, setData] = useState({ username: '', password: '', role: 'user' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.username && data.password && data.role) {
      try {
        const response = await superagent.post(`${api}/signup`).send(data);
        response.type === 'application/json' ? handler(response.body) : handler(response.text);
      } catch (e) {
        handler({ error: e.response.body });
      }
    }
    else { handler('Missing Data'); }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Typography variant="h4" noWrap>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={handleSignUp}>
        <FormControl>
          <TextField id="signup-user" name="username" label="User Name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <TextField id="signup-pass" name="password" label="Password" type="password" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel shrink id="role-label">
            Role
          </InputLabel>
          <Select
            name="role"
            onChange={handleChange}
            labelId="role-label"
            value={data.role || 'user'}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="writer">Writer</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default Signup;
