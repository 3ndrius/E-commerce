import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { requestSaveShippingInfo } from "../actions/cartActions";

export default function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [customer, setCustomer] = React.useState({
    address: shippingInfo.address || "",
    city: shippingInfo.city || "",
    phoneNo: shippingInfo.phoneNo || "",
    zip: shippingInfo.zip || "",
    country: shippingInfo.country || "",
  });

  const dispatch = useDispatch();

  const handleCustomer = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const submitCustomer = (e) => {
    e.preventDefault();
    dispatch(requestSaveShippingInfo(customer));
  };

  return (
    <Container>
      <React.Fragment>
        <Typography variant="h4" py={4}>
          Shipping address
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              onChange={handleCustomer}
              value={customer.address}
              label="Address"
              fullWidth
              autoComplete="shipping address-line"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              onChange={handleCustomer}
              value={customer.city}
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNo"
              name="phoneNo"
              label="Phone Number"
              value={customer.phoneNo}
              onChange={handleCustomer}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              onChange={handleCustomer}
              value={customer.zip}
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              onChange={handleCustomer}
              value={customer.country}
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={submitCustomer}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </Container>
  );
}
