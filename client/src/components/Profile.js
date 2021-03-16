import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: theme.spacing(2),
  },
  desc: {
    width: 200,
  },
  
  paper: {
    padding: 10,
    textAlign: "flex-start",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="div" my={2}>
        Profile:
      </Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={6}>
          <Avatar
            style={{ height: "300px", width: "300px" }}
            alt={`profile-img`}
            src={user && user.avatar.url}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Box display="flex" mb={1}>
              <Typography className={classes.desc} variant="h4">
                Name:
              </Typography>
              <Typography variant="h4"><b>{user && user.name}</b></Typography>
            </Box>
            <Box display="flex" mb={1}>
              <Typography className={classes.desc} variant="h4">
                Email:
              </Typography>
              <Typography variant="h4"><b>{user && user.email}</b></Typography>
            </Box>
            <Box display="flex"mb={1}>
              <Typography className={classes.desc} variant="h4">
                CreatedAt:
              </Typography>
              <Typography variant="h4">
                <b>{user && user.createdAt.substring(0, 10)}</b>
              </Typography>
            </Box>
            <Box display="flex"mb={1}>
              <Typography className={classes.desc} variant="h4">
                UserRole:
              </Typography>
              <Typography variant="h4"> <b>{user && user.role}</b></Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} my={2}>
          <Link to="/profile/update">
            <Button color="primary" variant="contained">
              Update profil
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} my={2}>
          <Link to="/orders">
            {" "}
            <Button variant="contained" mr={2} color="primary">
              My orders
            </Button>
          </Link>
          <Link to="/profile/password">
            <Button color="primary" variant="contained">
              Update password
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
