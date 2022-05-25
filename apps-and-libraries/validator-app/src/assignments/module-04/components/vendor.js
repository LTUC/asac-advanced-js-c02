import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Queue from '../lib/queue.js';

const useStyles = makeStyles((theme) => ({
  caps: {
    height: '250px',
    overflow: 'auto',
    listStyleType: 'none',
  },
}));

export default ({ companyID, title, queue }) => {

  const classes = useStyles();
  let [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const q = new Queue(companyID, queue);
    let addDelivery = payload => {
      console.log('ad', payload);
      setDeliveries(d => [...d, payload]);
    };
    q.subscribe('delivered', addDelivery);
    q.trigger('getall', 'delivered');
  }, [companyID, queue]);

  return (
    <div>
      <h2>{title}</h2>
      <ul id={`${title}-vendor`} className={classes.caps}>
        {deliveries.map((delivery, idx) => (
          <li key={idx}>Scanned/Delivered: {delivery.code}</li>
        ))}
      </ul>
    </div>
  );
};
