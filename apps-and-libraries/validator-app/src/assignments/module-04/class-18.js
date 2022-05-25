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
import Events from './lib/events.js';

const companyID = '1-206-flowers';

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
  const [pickups, setPickups] = useState([]);
  const [transit, setTransit] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const pickupOrder = async (e) => {
    e.preventDefault();
    e.persist(); // allows .reset()
    try {
      let formData = new FormData(e.target);
      let object = {};
      for (var key of formData.keys()) {
        object[key] = formData.get(key);
      }

      const URL = `${api}/pickup`;
      await superagent.post(URL).send(object);
      e.target.reset();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!caps) { return; }

    let addPickup = payload => {
      setPickups(d => [...d, payload]);
    };

    let addTransit = payload => {
      setPickups(d => d.filter(item => item.orderID !== payload.orderID));
      setTransit(d => [...d, payload]);
    };

    let addDelivery = payload => {
      setTransit(d => d.filter(item => item.orderID !== payload.orderID));
      setDeliveries(d => [...d, payload]);
    };

    const events = new Events(companyID, caps);

    events.subscribe('in-transit', addTransit);
    events.subscribe('delivered', addDelivery);
    events.subscribe('pickup', addPickup);
  }, [caps]);

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
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>Queued</h2>
            <ul id='queued' className={classes.caps}>
              {pickups.map(item => (
                <li key={item.orderID}>{item.customer}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>In Transit</h2>
            <ul id="in-transit" className={classes.caps}>
              {transit.map(item => (
                <li key={item.orderID}>{item.customer}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>Delivered</h2>
            <ul id="delivered" className={classes.caps}>
              {deliveries.map(item => (
                <li key={item.orderID}>{item.customer}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Add Order For Shipping</Typography>
            <form onSubmit={pickupOrder}>
              <input name="orderID" placeholder="Order ID" />
              <input name="customer" placeholder="Customer Name" />
              <input name="address" placeholder="Address" />
              <input name="store" type="hidden" value={companyID} />
              <button type="submit">Pickup This Order</button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
