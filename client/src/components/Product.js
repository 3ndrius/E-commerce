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
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: "580px",
    minWidth: "280px",
    height:550,
    marginBottom: 20,
    backgroundColor: "#f00",
  },
  rate: {
    padding: 0,
    margin: 0,
  },
  cardContent: {
    height:200,
    border:"1px solid blue"
  }

});

export default function ImgMediaCard({ product }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  return (
    <Card className={classes.root} elevation={0} outlined="true" mt={2} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="280"
          style={{objectFit: "contain"}}
          image={product && product.images[0].url}
          title={product.name}
        />
        <CardContent align="start">
          <Typography variant="h5" component="h2">
            {product.name.substring(0, 30)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions align="start">
        <Box
          component="fieldset"
          mb={1}
          borderColor="transparent"
          className={classes.rate}
        >
          <Rating
            name="simple-controlled"
            value={product && product.ratings}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </CardActions>
      <CardContent align="start">
        <Typography variant="h5" component="h6">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions >
       <Link to={`/product/${product._id}`} pr={1}>
         <Button color="primary" variant="contained">
          View details
        </Button>
         </Link>
        <Button color="primary" variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
