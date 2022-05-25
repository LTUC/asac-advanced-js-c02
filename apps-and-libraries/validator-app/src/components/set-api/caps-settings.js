import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
  input: {
    width: '50%',
  },
}));

export default props => {
  const classes = useStyles();

  const [caps, setCaps] = useState('');

  const _handleChange = e => {
    setCaps(e.target.value);
  };

  const _handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('caps', caps);
    props.onSubmit(caps);
  };

  useEffect(() => {
    const url = localStorage.getItem('caps');
    if (url) {
      setCaps(url);
    }
  }, []);

  return (
    <>
      <Typography variant="body2" color="textSecondary">
        Enter the full URL to your CAPS server, including the namespace
      </Typography>

      <Typography variant="body2" color="textSecondary">
        '/' i.e. http://localhost:3000/caps
      </Typography>

      <form className={classes.form} onSubmit={_handleSubmit}>
        <TextField
          id="caps-url"
          className={classes.input}
          onChange={_handleChange}
          value={caps}
          label="CAPS URL"
        />
        <Button variant="outlined" size="small" color="primary" type="submit">
          Set CAPS URL
        </Button>
      </form>
    </>
  );
};
