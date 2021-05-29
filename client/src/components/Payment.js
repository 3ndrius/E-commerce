import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CheckoutSteps from "./layout/CheckoutSteps";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "../helpers/apiCall";
import { orderCreateRequest, clearErrors } from "../actions/orderActions";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const options = {
  style: {
    base: {
      fontSize: "20px",
    },
  },
};

export default function Payment({ history }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [load, setLoad] = React.useState(false)
  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  
  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo?.itemsPrice,
    taxPrice: orderInfo?.taxPrice,
    shippingPrice: orderInfo?.deliveryPrice,
    totalPrice: orderInfo?.totalPrice,
  };
  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };
  const handlePaymentProcess = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await apiCall.post("payment/process", paymentData, config);

      const client_secret = res.data.client_secret;

      if (!stripe || !elements) {
        setLoad(false);
        return;
        
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setLoad(false)
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          dispatch(orderCreateRequest(order))
          history.push("/success");
        } else {
          toast.error("The error ocurr during payment processing!");
        }
      }
    } catch (error) {
      setLoad(false)
      toast.error(error.response.data.message);
    }
  };

  const { error, loading } = useSelector((state) => state.newOrder);

  React.useEffect(() => {
    error && toast.error(error);
    dispatch(clearErrors());
  }, [dispatch, error, loading]);

  return (
    <React.Fragment>
      <CheckoutSteps stepNo={2} />
      <Container maxWidth="sm">
        <Typography variant="h5" my={4}>
          Payment method
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              options={options}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="expDate">Expiry date</label>

            <CardExpiryElement
              required
              id="expDate"
              options={options}
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="cvc">CvC Number</label>
            <CardCvcElement
              required
              id="cvv"
              label="CVV Card number"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              options={options}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              disabled={load}
              onClick={handlePaymentProcess}
            >
              Proceed Pay - ${orderInfo.totalPrice}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
