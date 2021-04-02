import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom'
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { singleOrderRequest, clearErrors } from "../actions/orderActions";
import Meta from '../components/layout/Meta'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function OrderDetails({ history, match }) {
  const id = match.params.id;
  const dispatch = useDispatch();
  const classes =useStyles();

  const { order, loading, error } = useSelector((state) => state.singleOrder);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(singleOrderRequest(id));
  }, [error, dispatch]);

  return (
    <React.Fragment>
 <Meta title="Order Details" />
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container my={4}>
          <Grid item xs={12} mr={2} mb={4}>
            <Typography variant="h4" component="div" pb={2}>
              Order Summary:
            </Typography>
            <Divider />
            <Typography variant="h6" mt={2}>
              Name: <b>{order?.user.name}</b>
            </Typography>
            <Typography variant="h6">
              Phone: <b>{order?.shippingInfo.phoneNo}</b>
            </Typography>
            <Typography variant="h6">
              Address: <b>{order?.shippingInfo.address}</b>
            </Typography>
            <Typography variant="h6">Amount: <b>{order?.totalPrice} </b></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography mb={2} variant="h4">
             Status Summary:
            </Typography>
            <Divider />
            <Box display="flex" mt={2}>
              <Typography variant="h5">OrderId:</Typography>
              <Typography variant="h5"># {order?._id}</Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h5" component="div">
                Status:
              </Typography>
              <Typography
                variant="h5"
                style={{
                  color:
                    order?.paymentInfo.status.toLowerCase() === "succeeded" ? "green" : "red",
                }}
              >
                {order?.paymentInfo.status.toLowerCase() === "succeeded"
                  ? "Paid"
                  : "Not paid yet"}
              </Typography>
            </Box>

            <Box display="flex">
              <Typography variant="h5">Order Status:</Typography>
              <Typography
                variant="h5"
                style={{
                  color: order?.orderStatus === "Delivered" ? "green" : "red",
                }}
              >
                {order?.orderStatus}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h4" component="div" py={2}>
            Product summary:
          </Typography>
          <Divider />
           {order && order?.orderItems.length >= 0 &&
            order?.orderItems.map((item) => {
              return (
                <React.Fragment key={item.productId} py={2}>
                  <Grid
                  pt={2}
                    container
                    item
                    spacing={6}
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt="complex"
                          src={item.image}
                        />
                      </ButtonBase>
                    </Grid>

                    <Grid item xs>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name.substring(0, 50)}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" component="div">
                        {item.quantity} x ${item.price} =
                        <b> ${item.price * item.quantity}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2} pr={4}>
                    <Divider />
                  </Grid>
                </React.Fragment>
              );
            })}
        </Grid>
        <Grid py={6}>
          <Link to={'/orders'}><Button color="primary" variant="contained">Back to orders</Button></Link>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
