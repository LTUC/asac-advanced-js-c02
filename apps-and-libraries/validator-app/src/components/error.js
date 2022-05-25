import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  container: {
    width: '300px',
  }
})

export default function Error(props) {

  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setVisible(false);
  };

  useEffect(() => {
    if (Object.keys(props.if).length) {
      setVisible(true);
    }
  }, [props.if]);

  return (
    <Snackbar
      className={classes.container}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={visible}
      autoHideDuration={6000}
      onClose={handleClose}
      message={`Error: ${props.if.error}`}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}