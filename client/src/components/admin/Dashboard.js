import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DashboardCustomizeOutlinedIcon from '@material-ui/icons/DashboardCustomizeOutlined';
import StorageIcon from '@material-ui/icons/Storage';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

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
const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.drawerContainer}>
          <List 
            component="nav" >
      <ListItem button>
        <ListItemIcon>
          <DashboardCustomizeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button style={{paddingLeft: 30}}>
            <ListItemIcon>
              <ClearAllOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem button style={{paddingLeft: 30}} >
            <ListItemIcon>
              <AddToPhotosOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
        </List>
      </Collapse>
       <ListItem button>
        <ListItemIcon>
          <SupervisorAccountOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
       <ListItem button>
        <ListItemIcon>
          <FavoriteOutlinedIcon  />
        </ListItemIcon>
        <ListItemText primary="Liked" />
      </ListItem>
       <ListItem button>
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
      
    </List>
        </div>
      </Drawer>
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