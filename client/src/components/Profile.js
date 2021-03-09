import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: theme.spacing(3),
  },
 
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function Profile() {
  const classes = useStyles();
    const { user } = useSelector(state => state.auth);

  return (
    <Container>
      <Typography variant="h5"component="div" my={2}>
      Profile:
    </Typography>
      <Divider className={classes.divider}  />
      <Grid container spacing={3} my={4}>
        <Grid item xs={12} md={6}>
            <Avatar style={{height:'300px', width:'300px'}}
        alt={`profile-img`}
        src={user && user.avatar.url}
      />
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper className={classes.paper}>
              <Typography variant="h3">{user && user.name}</Typography>
              <Typography variant="h3">{user && user.email}</Typography>
              <Typography variant="h4">{user && user.createdAt.substring(0,10)}</Typography>
              <Typography variant="h4">Account: {user && user.role}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} my={2}>
          <Link to="/profile/update" ><Button color="primary" variant="contained">Update profil</Button></Link>
        </Grid>
        <Grid item xs={6} my={2}>
         {( user && user.role !== 'admin') &&  <Button variant="contained" mr={2} color="primary">My orders</Button>}
         <Button color="primary" variant="contained">Update password</Button>
        </Grid>
      </Grid>
    </Container>
  );
}