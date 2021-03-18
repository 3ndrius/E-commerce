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
import { Rating } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  requestSingleProduct,
  clearReviewStatus,
} from "../actions/productActions";
import Divider from "@material-ui/core/Divider";
import { toast } from "react-toastify";
import Loader from "./layout/Loader";
import { requestAddToCart } from "../actions/cartActions";
import ReviewDialog from "./layout/ReviewDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // marginTop: 30,
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
    maxHeight: "600px",
    objectFit:"cover",
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
  const { review } = useSelector((state) => state.submitReview);
  const dispatch = useDispatch();
  const [currentQuantity, setCurrentQuantity] = React.useState(1);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleAddItem = () => {
    dispatch(requestAddToCart(id, currentQuantity));
    toast.success("Product successfuly added to cart");
  };

  React.useEffect(() => {
    if (error) toast.error(error);
    dispatch(requestSingleProduct(id));
    if (review === true) {
      toast.success("Review added successfully");
      dispatch(clearReviewStatus());
    }
  }, [dispatch, toast, error, review]);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={4} my={4}>
          <Grid item md={6} align="end">
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={product && product.images[0].url}
              />
            </ButtonBase>
          </Grid>

          <Grid container item md={6} spacing={3} pr={6}>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="h3">{product?.name}</Typography>
              <Typography variant="paragraph" pt={1}>
                <FavoriteBorderIcon />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="paragraph">
                {product && product.description}
              </Typography>
            </Grid>

            <Grid item xs={12} display="flex" alignItems="flex-start">
              <Box
                component="fieldset"
                borderColor="transparent"
                className={classes.rate}
                paddingRight={2}
              >
                <Rating
                  name="simple-controlled"
                  value={product && product.ratings}
                  readOnly
                />
              </Box>
              <Typography variant="h6" component="div">
                ({product && product.numOfReviews}) Reviews
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="h6">
                Seller: {product && product.seller}
              </Typography>
              <Typography variant="h6">
                Category: {product && product.category}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">$ {product && product.price}</Typography>
            </Grid>

            <Grid item xs={2}>
              <Button
                color="secondary"
                variant="contained"
                disabled={currentQuantity > 1 ? false : true}
                onClick={() => setCurrentQuantity(currentQuantity - 1)}
              >
                -
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h5">{currentQuantity}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color="primary"
                variant="contained"
                disabled={currentQuantity >= product?.stock ? true : false}
                onClick={() => setCurrentQuantity(currentQuantity + 1)}
              >
                +
              </Button>
            </Grid>

            <Grid item xs={7}>
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                disabled={product?.stock > 0 ? false : true}
                onClick={handleAddItem}
              >
                Add to cart
              </Button>
            </Grid>

            <Grid item xs={12}>
              {product && product.stock > 1 ? (
                <Typography color="primary" variant="paragraph">
                  InStock
                </Typography>
              ) : (
                <Typography color="secondary">OutStock</Typography>
              )}
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
            {isAuthenticated && (
              <Grid xs={12} item>
                <ReviewDialog productId={product?._id} />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Grid xs={12} item>
          <Typography variant="h4" component="div">
            Reviews:
          </Typography>
          <Divider />
        </Grid>
        {product && product.reviews?.length < 1 ? (
          <Typography variant="h6" py={4}>No reviews posted yet!</Typography>
        ) : (
          product &&
          product.reviews?.map((item) => {
            return (
              <Grid item xs={12} my={2} key={item._id}>
                <Box mb={1}>
                  <Typography ml={1} variant="paragraph">
                    Author:
                  </Typography>
                  <Typography variant="paragraph">{item.name}</Typography>
                </Box>
                <Box
                  component="fieldset"
                  borderColor="transparent"
                  className={classes.rate}
                >
                  <Rating
                    name="simple-controlled"
                    value={item.ratings}
                    readOnly
                  />
                </Box>
                <Box>
                  <Typography variant="h6" ml={1}>
                    {item.comment}
                  </Typography>
                </Box>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}
