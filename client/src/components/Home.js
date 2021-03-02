import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import Button from "@material-ui/core/Button";
import Meta from "./layout/Meta";
import { useDispatch, useSelector } from "react-redux";
import { requestAllProduct } from "../actions/productActions";
import Loader from './layout/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 30,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export default function Home() {
  const classes = useStyles();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAllProduct());
  }, [dispatch]);
  const { products, loading, productCount, error } = useSelector(
    (state) => state.products
  );
  console.log(products);

  return (
    <div className={classes.root}>
      <Meta title="Best store" />
      <Container>
        <Typography
          className={classes.title}
          variant="h3"
          spacing="3"
          component="h2"
        >
          Latest Product:
        </Typography>

        <Grid container spacing={2}>
          {products &&
            products.map((product) => {
              return (
                <Grid item sm={6} md={4} key={product._id}>
                  <Product product={product} />
                </Grid>
              );
            })
             
          }
          {loading && <Loader />}
        </Grid>
      </Container>
    </div>
  );
}
