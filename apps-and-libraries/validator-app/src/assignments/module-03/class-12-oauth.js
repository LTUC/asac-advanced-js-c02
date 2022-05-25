import React, {useState, useEffect} from 'react';

import {When} from 'react-if';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Paper from '@material-ui/core/Paper';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function OAuth(props) {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [link, setLink] = useState('');
  const [output, setOutput] = useState('');

  const createLink = (e) => {
    e.preventDefault();
    if ( data.clientId  ) {
      let URL = 'https://github.com/login/oauth/authorize';
      let options = {
        client_id: data.clientId,
        scope: 'read:user',
        state: 'somerandomwords',
      };

      let querystring = Object.keys(options).map((key) => {
        return `${key}=` + encodeURIComponent(options[key]);
      }).join('&');

      setLink(`${URL}?${querystring}`);

    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect( () => {
    let params = new URLSearchParams(document.location.search.substring(1));
    let token = params.get('token');
    if ( token ) { setOutput(token); }
  }, []);

  return (
    <>
      <Typography variant="h4">OAuth</Typography>
      <Typography className={classes.divider}>
        This assumes that you've already set up your GitHub OAuth application at github.com and have a running server that's connected properly. Enter your GitHub OAuth Client "secret", and then authorize GitHub using the button. The "Output" section will show you the response received from your server.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h5" noWrap>
          OAuth Settings (GitHub)
            </Typography>
            <form className={classes.form} onSubmit={createLink}>
              <FormControl>
                <TextField name="clientId" label="Client ID" onChange={handleChange} />
              </FormControl>
              <FormControl>
                <Button type="submit" variant="contained" color="primary">
              Create OAuth Link
                </Button>
              </FormControl>
              <When condition={link}>
                <FormControl>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<GitHubIcon />}
                    href={link}
                  >
                  Authorize
                  </Button>
                </FormControl>
              </When>
            </form>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h5"> Server Response </Typography>
            <pre className={classes.output}>
              {output}
            </pre>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default OAuth;
