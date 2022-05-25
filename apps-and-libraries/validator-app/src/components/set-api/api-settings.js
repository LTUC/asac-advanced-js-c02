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

  const [api, setApi] = useState('');

  const _handleChange = e => {
    setApi(e.target.value);
  };

  const _handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('api', api);
    props.onSubmit(api);
  };

  useEffect(() => {
    const url = localStorage.getItem('api');
    if (url) {
      setApi(url);
    }
  }, []);

  return (
    <>
      <Typography variant="body2" color="textSecondary">
        Enter the full URL to your API server's base path, without a trailing /
      </Typography>
      <Typography variant="body2" color="textSecondary">
        '/' i.e. http://localhost:3000/api/v1
      </Typography>
      <form className={classes.form} onSubmit={_handleSubmit}>
        <TextField
          id="base-api-url"
          className={classes.input}
          onChange={_handleChange}
          value={api}
          label="Base API URL"
        />
        <Button variant="outlined" size="small" color="primary" type="submit">
          Set API URL
        </Button>
      </form>
    </>
  );
};
