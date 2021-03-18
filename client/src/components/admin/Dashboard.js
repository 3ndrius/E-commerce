import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../layout/Sidebar';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
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
    boxSizing: 'border-box',
    marginTop: 90,
    paddingTop: 40,   
  },
  drawerContainer: {
    overflow: 'auto',
    paddingLeft:28,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
    <Sidebar />
      <main className={classes.content}>
        <Typography variant="h3" pb={4}>
        Dashboard
        </Typography>
       <Grid container>
         <Grid item xs={12}> ddd</Grid>
         <Grid item xs={12}> ddd</Grid>
         <Grid item xs={12}> ddd</Grid>
       </Grid>
      </main>
    </div>
  );
}