import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SetApi from '../../../components/set-api/api-settings.js';
import Signup from './signup.js';
import Signin from './signin.js';
import Error from '../../../components/error.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function BasicAuth({ handler }) {

  const [api, setApi] = useState('');
  const [error, setError] = useState({});
  const classes = useStyles();

  const handleLogin = (data) => {
    console.log(data);
    if (data.error) {
      setError(data);
    }
    handler(data);
  };

  useEffect(() => {
    let a = localStorage.getItem('api') || '';
    setApi(a);
  }, [setApi]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon id="open-settings" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Settings</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
              <SetApi onSubmit={(a) => setApi(a)} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Signup api={api} handler={handleLogin} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Signin api={api} handler={handleLogin} />
        </Paper>
      </Grid>
      <Error if={error} />
    </Grid>
  );
}

export default BasicAuth;
