import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Box from "@material-ui/core/Box";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Rating } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { requestSingleProduct } from "../actions/productActions";
import { toast } from "react-toastify";
import Loader from "./layout/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  container: {
    margin: "auto",
  },
  image: {
    width: "auto",
    height: "100%",
  },
  img: {
    objectFit: "cover",
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid gray",
  },
  rate: {
    padding: 0,
    margin: 0,
  },
}));

export default function SingleProduct(props) {
  const classes = useStyles();
  const { id } = props.match?.params;
  const { product, loading, error } = useSelector((state) => state.product);
  const [value, setValue] = React.useState(2);
  const dispatch = useDispatch();
  const [ currentQuantity, setCurrentQuantity ] = React.useState(1)


  React.useEffect(() => {
    if (error) toast.error(error);
    dispatch(requestSingleProduct(id));
  }, [dispatch, toast, error]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <Container className={classes.container}>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={product && product.images[0].url}
                />
              </ButtonBase>
            </Grid>

            <Grid container item spacing={2} md={6}>
              <Grid item xs={9}>
                <Typography variant="h3">{product?.name}</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={1}>
                <Typography variant="paragraph">
                  <FavoriteBorderIcon />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="paragraph">
                  {product && product.description}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  component="fieldset"
                  mb={3}
                  borderColor="transparent"
                  className={classes.rate}
                >
                  <Rating
                    name="simple-controlled"
                    value={product && product.ratings}
                    onChange={(event, newValue) => {
                      console.log(event, newValue, "ratings");
                      setValue(newValue);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                ({product && product.numOfReviews}) Reviews
              </Grid>
              <Grid item xs={6}>
                <Typography variant="paragraph">
                  Seller: {product && product.seller}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="paragraph">
                  Category: {product && product.category}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  $ {product && product.price}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button color="secondary" variant="contained" disabled={currentQuantity > 1 ? false : true} onClick={() => setCurrentQuantity(currentQuantity -1)}>
                  -
                </Button>
                </Grid>
                <Grid item xs={1}>
                <Typography variant="h5">
                  {currentQuantity}
                </Typography>
                </Grid>
                <Grid item xs={2}>
                <Button color="primary" variant="contained" disabled={currentQuantity >= product?.stock ? true : false}   onClick={() => setCurrentQuantity(currentQuantity + 1)}>
                 + 
                </Button>
              </Grid>

              <Grid item xs={7}>
                <Button color="secondary" fullWidth variant="contained">
                  Buy
                </Button>
              </Grid>

              <Grid item xs={12}>
                 {product && product.stock > 1 ? <Typography color="primary" variant="paragraph">InStock</Typography> : <Typography color="secondary">OutStock</Typography> }
              </Grid>
              <Grid item xs={4}>
                <Link to="/">
                  {" "}
                  <Button color="secondary" variant="outlined">
                    Go back
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
