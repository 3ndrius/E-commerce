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
// import Loader from "./layout/Loader";
import { toast } from "react-toastify";
import Box from "@material-ui/core/Box";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1820,
    paddingTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    padingLeft: "1%",
    paddingRight: "1%",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  box: {
    margin: 50,
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
  },
  slide: {
    maxWidth: "100%",
    paddingTop: 20,
    paddingLeft: "15%",
    paddingRight: "15%",
    height: 100,
  },
  sidebar: {
    height: 150,
  },
  itemText: {
    padding:"2px 0 0 15px",
    cursor:"pointer"
  },
  loading: {
    position: "fixed",
    top: "50%",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex:999,
  }

}));

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 1000,
    label: "$1000",
  },
];

function valuetext(value) {
  return `$${value}`;
}

export default function Home({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 10000]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [category, setCategory] = React.useState("");
  const categories = [
    "Electronic",
    "Camera",
    "Laptop",
    "Computers",
    "Books",
    "Clothes/Shoes",
    "Sports",
    "Outdoors",
    "Home",
  ];

  const { products, loading, productsCount, resPerPage, error, filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword || "";
  React.useEffect(() => {
    if (error) return toast.error(error);
    dispatch(requestAllProduct(currentPage, keyword, price, category));
  }, [dispatch, toast, error, keyword, price, currentPage, category]);

  let count = productsCount;
  if(keyword) count = filteredProductsCount;
  return (
    <div className={classes.root}>
      <Meta title="Best store" />
      <Grid className={classes.container} container alignItems="center">
         {loading && <div className={classes.loading}> 
            <Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={500} //3 secs
      />
         </div> }
         {products?.length < 1 && !loading && <Grid item sm={12} align="center">No products...</Grid>}
        {keyword ? (
          <Grid container spacing={12}>
            <Grid item xs={12} md={3} lg={2} >
              <div className={classes.slide}>
                <Typography id="track-inverted-range-slider" gutterBottom>
                  Price range:
                </Typography>
                <Slider
                  defaultValue={[100, 500]}
                  aria-labelledby="discrete-slider-custom"
                  step={10}
                  marks={marks}
                  getAriaValueText={valuetext}
                  min={0}
                  max={1500}
                  onChange={(e) => setPrice(e.target.value)}
                  valueLabelDisplay="auto"
                />
              </div>
             
             <List className={classes.list}>
                {categories.map((cat, index) => {
                return (
                <ListItem key={index} id={cat} className={classes.item}>
                  <ListItemText className={classes.itemText} primary={cat}  onClick={() => setCategory(cat)}/>
                </ListItem>
    
              )
              })}
             </List>
            </Grid>
            <Grid item container xs={12} md={9} lg={10}>
              {products &&
                products.map((product) => {
                  return (
                    <Grid
                      item
                      sm={12}
                      md={6}
                      lg={4}
                      align="center"
                      key={product._id}
                    >
                      <Product product={product} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid> 
        ) : (
          <Grid item container xs={12} align="center">
            {products &&
              products.map((product) => {
                return (
                  <Grid
                    item
                    sm={12}
                    md={6}
                    lg={4}
                    key={product._id}
                    align="center"
                  >
                    <Product product={product} />
                  </Grid>
                );
              })}
          </Grid>
        )}
       
        {resPerPage <= count  && (
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
      </Grid>
    </div>
  );
}
