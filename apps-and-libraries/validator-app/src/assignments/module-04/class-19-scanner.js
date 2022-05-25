import React, { useState, useEffect } from 'react';

import superagent from 'superagent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import APIForm from '../../components/set-api/api-settings.js';
import CAPSForm from '../../components/set-api/caps-settings.js';

import Vendor from './components/vendor.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  caps: {
    height: '250px',
    overflow: 'auto',
    listStyleType: 'none',
  },
}));


export default props => {

  const classes = useStyles();

  const [api, setApi] = useState('');
  const [caps, setCaps] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    e.persist(); // allows .reset()
    try {
      let formData = new FormData(e.target);
      let form = {};
      for (var key of formData.keys()) {
        form[key] = formData.get(key);
      }

      let path = Object.keys(form).sort().reverse().map(key => form[key]).join('/');
      let url = `${api}/delivery/${path}`;

      await superagent.post(url);
      e.target.reset();

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const a = localStorage.getItem('api');
    const c = localStorage.getItem('caps');
    setApi(a);
    setCaps(c);
  }, [setApi, setCaps]);

  return (
    <div className={classes.root}>
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
              <Grid item xs={6}>
                <APIForm onSubmit={(a) => setApi(a)} />
              </Grid>
              <Grid item xs={6}>
                <CAPSForm onSubmit={(c) => setCaps(c)} />
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Driver Delivery Log</Typography>
            <form onSubmit={submitForm}>
              <select name="store">
                <option value="">Vendor</option>
                <option value="1-206-flowers">1-206-flowers</option>
                <option value="acme-widgets">acme-widgets</option>
              </select>
              <input name="orderID" placeholder="Order ID" />
              <button type="submit">Scan It</button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Vendor companyID="1-206-flowers" title="Flower Log" queue={caps} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Vendor companyID="acme-widgets" title="Widget Delivery Log" queue={caps} />
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
};
