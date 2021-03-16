import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  requestAddToCart,
  requestRemoveFromCart,
} from "../actions/cartActions";

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

export default function Cart({ history }) {
  const classes = useStyles();

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantity = (item, val) => {
    let newQuantity = item.quantity + val;
    dispatch(requestAddToCart(item.productId, newQuantity));
  };

  const handleCheckout = () => {
    history.push('/login?redirect=shipping')
  }

  const handleRemoveItem = (productId) => {
    dispatch(requestRemoveFromCart(productId));
    toast.info("Successfully removed product from cart")
  };

  return (
    <Container maxWidth="lg">
      <Grid container my={4}>
        <Grid item xs={12} mb={4}>
          <Typography variant="h3">Your cart:</Typography>
          <Divider />
        </Grid>

        <Grid my={1} container item spacing={1} xs={12} md={9}>
          {cartItems?.length <= 0 && (
            <Grid item xs={9}>
              No product
            </Grid>
          )}
          {cartItems?.length >= 0 &&
            cartItems.map((item) => {
              return (
                <React.Fragment key={item.productId}>
                  <Grid
                    container
                    item
                    spacing={1}
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
                        {item.name.substring(0, 40)}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h4" component="div">
                        ${item.price}
                      </Typography>
                    </Grid>

                    <Grid item xs>
                      <Box display="flex" flexDirection="row" spacing={2}>
                        <Button
                          variant="contained"
                          disabled={item.quantity > 1 ? false : true}
                          color="secondary"
                          onClick={() => handleQuantity(item, -1)}
                        >
                          -
                        </Button>
                        <Typography variant="h5" mx={2}>
                          {item.quantity}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={item.quantity < item.stock ? false : true}
                          onClick={() => handleQuantity(item, 1)}
                        >
                          +
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2} pr={4}>
                    <Divider/>
                  </Grid>
                </React.Fragment>
              );
            })}
        </Grid>

        <Grid item xs={12} md={3} alignItems="flex-start">
          <Typography mb={2} mx={2} variant="h4">
            Summary:
          </Typography>
          <Divider />
          <Typography my={2} mx={2} variant="h5">
            Subtotal: { cartItems.reduce((acc, val) => (acc + +val.quantity),0)}
          </Typography>
          <Typography variant="h5" mx={2} my={2}>
            {/* Total: $ {cartItems.map(item => item.quantity * item.price).reduce((acc, val) => (acc + +val), 0)} */}
            Total: $ {cartItems.reduce((acc, val) => (acc + +val.quantity * val.price), 0)}
          </Typography>
          <Button variant="contained" color="primary" px={2} fullWidth onClick={handleCheckout}>Checkout</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
