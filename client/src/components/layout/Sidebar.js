import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import DashboardCustomizeOutlinedIcon from "@material-ui/icons/DashboardCustomizeOutlined";
import StorageIcon from "@material-ui/icons/Storage";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import ClearAllOutlinedIcon from "@material-ui/icons/ClearAllOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxSizing: "border-box",
    marginTop: 90,
    paddingTop: 40,
  },
  drawerContainer: {
    overflow: "auto",
    paddingLeft: 28,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <List component="nav">
          <Link to="/admin/dashboard">
            <ListItem button>
              <ListItemIcon>
                <DashboardCustomizeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
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
              <Link to="/admin/products">
                <ListItem button style={{ paddingLeft: 30 }}>
                  <ListItemIcon>
                    <ClearAllOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="All" />
                </ListItem>
              </Link>
              <Link to="/admin/create">
                <ListItem button style={{ paddingLeft: 30 }}>
                  <ListItemIcon>
                    <AddToPhotosOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItem>
              </Link>
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
              <FavoriteOutlinedIcon />
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
  );
}
