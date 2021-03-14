import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

export default function OrderDetails({ history }) {
 

  return (
    <React.Fragment>
      <CheckoutSteps stepNo={1} />
    <Container maxWidth="lg">

      <Grid container my={4}>
        <Grid item xs={12} my={4}>
          <Divider />
        </Grid>

        <Grid container item spacing={1} xs={12} md={8}>
          <Grid item xs={12} mr={2} mb={4}>
            <Typography variant="h4" component="div" pb={2}>
              Order Details
            </Typography>

            <Typography variant="h6">
Detail 1
            </Typography>
            <Typography variant="h6">
              detail2
            </Typography>
            <Typography variant="h6">
              detal 3
            </Typography>
          </Grid>
          <Grid item xs={12} mr={4} pb={2}>
            <Typography variant="h5">Your cart</Typography>
            <Divider />
          </Grid>
          {/* {cartItems.length >= 0 &&
            cartItems.map((item) => {
              return (
                <React.Fragment key={item.productId}>
                  <Grid
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
            })} */}
        </Grid>

        <Grid item xs={12} md={4} px={3}>
          <Typography mb={2} mx={2} variant="h4">
            Summary:
          </Typography>
          <Divider />
          <Box m={2} display="flex" justifyContent="space-between">
            <Typography variant="h5">Subtotal:</Typography>{" "}
            <Typography variant="h5">
              count
            </Typography>
          </Box>
          <Box m={2} display="flex" justifyContent="space-between">
            <Typography variant="h5" component="div">
              Delivery:
            </Typography>
            <Typography variant="h5">
              del
            </Typography>
          </Box>

          <Box m={2} display="flex" justifyContent="space-between">
            <Typography variant="h5">
              Tax:
            </Typography>
            <Typography variant="h5">
              tax
            </Typography>
          </Box>
          <Divider />

          <Box m={2} display="flex" justifyContent="space-between" alignItems="flex-end">
            <Typography variant="h4" >
              Total:
            </Typography>
            <Typography variant="h5">
              tot
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
          Back 
          </Button>
        </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}

