import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Rating } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: "500px",
    minWidth: "280px",
    marginBottom: 20,
    backgroundColor: "#f00",
  },
  rate: {
    padding: 0,
    margin: 0,
  },

});

export default function ImgMediaCard({ product }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  return (
    <Card className={classes.root} elevation={0} outlined="true" >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image={product && product.images[0].url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          className={classes.rate}
        >
          <Rating
            name="simple-controlled"
            value={product.ratings}
            onChange={(event, newValue) => {
              console.log(event, newValue, "ratings");
              setValue(newValue);
            }}
          />
        </Box>
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="h6" gutterBottom>
          {" "}
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
       <Link to={`/products/${product._id}`} >
         <Button color="secondary" variant="outlined">
          View details
        </Button>
         </Link>
        <Button color="secondary" variant="outlined">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
