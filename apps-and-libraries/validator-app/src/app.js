import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LoginIcon from '@material-ui/icons/ExitToApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

import API from './assignments/module-02/storefront.js';
import BasicAuth from './assignments/module-03/class-11-basic-auth.js';
import OAuth from './assignments/module-03/class-12-oauth.js';
import BearerAuth from './assignments/module-03/class-13-bearer-auth.js';
import Authorization from './assignments/module-03/class-14-authorization.js';
import CAPS18 from './assignments/module-04/class-18.js';
import CAPS19Scanner from './assignments/module-04/class-19-scanner.js';
import CAPS19Dashboard from './assignments/module-04/class-19-dashboard.js';

import "./app.scss";

const drawerWidth = 275;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listHeader: {
    margin: '1rem auto 0 1rem',
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  links: {
    textDecoration: 'none',
    color: 'darkslategrey',
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Code 401 Javascript Assignment Runner
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <ListSubheader className={classes.listHeader}>
              Module 2 (API)
            </ListSubheader>
            <List>
              <Link className={classes.links} to="/storefront">
                <ListItem button>
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText primary="Storefront" />
                </ListItem>
              </Link>
            </List>
            <Divider />

            <ListSubheader className={classes.listHeader}>
              Module 3 (AUTH)
            </ListSubheader>
            <List>
              <Link className={classes.links} to="/basic-auth">
                <ListItem button>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Basic Auth" />
                </ListItem>
              </Link>

              <Link className={classes.links} to="/oauth">
                <ListItem button>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText primary="OAuth" />
                </ListItem>
              </Link>

              <Link className={classes.links} to="/bearer-auth">
                <ListItem button>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bearer Auth" />
                </ListItem>
              </Link>

              <Link className={classes.links} to="/authorization">
                <ListItem button>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Authorization/ACL" />
                </ListItem>
              </Link>
            </List>
            <Divider />

            <ListSubheader className={classes.listHeader}>
              Module 4 (Realtime)
            </ListSubheader>
            <List>
              <Link className={classes.links} to="/caps-vendor">
                <ListItem button>
                  <ListItemIcon>
                    <LocalFloristIcon />
                  </ListItemIcon>
                  <ListItemText primary="18-CAPS Vendor" />
                </ListItem>
              </Link>

              <Link className={classes.links} to="/caps-scanner">
                <ListItem button>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText primary="19-CAPS Driver" />
                </ListItem>
              </Link>

              <Link className={classes.links} to="/caps-dashboard">
                <ListItem button>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText primary="19-CAPS Dashboard" />
                </ListItem>
              </Link>

            </List>
            <Divider />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Route exact path="/storefront">
            <API />
          </Route>
          <Route exact path="/basic-auth">
            <BasicAuth />
          </Route>
          <Route exact path="/bearer-auth">
            <BearerAuth />
          </Route>
          <Route exact path="/oauth">
            <OAuth />
          </Route>
          <Route exact path="/authorization">
            <Authorization />
          </Route>
          <Route exact path="/caps-vendor">
            <CAPS18 />
          </Route>
          <Route exact path="/caps-scanner">
            <CAPS19Scanner />
          </Route>
          <Route exact path="/caps-dashboard">
            <CAPS19Dashboard />
          </Route>
        </main>
      </div>
    </Router>
  );
}
