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
import Loader from "./layout/Loader";
import { toast } from "react-toastify";
import Box from "@material-ui/core/Box";
import Pagination from "react-js-pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 30,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  box: {
    margin: 50,
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(requestAllProduct(pageNumber));
  };

  const { products, loading, productsCount, resPerPage, error } = useSelector(
    (state) => state.products
  );
  React.useEffect(() => {
    if (error) return toast.error(error);
    dispatch(requestAllProduct(currentPage || 1));
  }, [dispatch, toast, error]);

  return (
    <div className={classes.root}>
      <Meta title="Best store" />
      <Container className={classes.container}>
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
            })}
          {loading && <Loader />}
        </Grid>
        {productsCount >= resPerPage && (
          <Box className={classes.box}>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={handlePageChange}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="pagination-nav"
              linkClass="pagination-link"
              activeClass="pagination-active"
            />
          </Box>
        )}
      </Container>
    </div>
  );
}
