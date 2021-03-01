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
import { Rating } from "@material-ui/lab";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";

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

export default function ImgMediaCard() {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  return (
    <Card className={classes.root} elevation={0} outlined>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8159f77b-b1ad-4906-9434-bd9120ab7cf7/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Symbiosis NIKE WOMEN'S NIKE AIR MAX 97 SHOE kolor CZARNY
            (921733-001)
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
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="h6" gutterBottom>
          {" "}
          $ 199.99
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" variant="outlined">
          View details
        </Button>
        <Button color="secondary" variant="outlined">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
