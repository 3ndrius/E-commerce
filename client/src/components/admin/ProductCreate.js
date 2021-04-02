import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../layout/Sidebar";
import Meta from '../layout/Meta';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {},
  },
  content: {
    flexGrow: 1,
    padding: "20px 40px",
  },
  input: {
    display: "none",
  },
}));

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

function ProductCreate() {
  const classes = useStyles();

  const [category, setCategory] = React.useState("Computers");
  const [price, setPrice] = React.useState(0);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [seller, setSeller] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [imagesPrev, setImagesPrev] = React.useState([]);

  const handleUploadImage = () => {

    setImages([])
    setImagesPrev([])
    const rader = new FileReader();
    rader.onload = () => {
      if (rader.readyState === 2) {
        setImages(rader.result);
      }
    };
    reader.readAsDataURL(file);
 
  };

  const handleCreateProduct = () => {
    console.log("click");
    const formData = new formData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("stock", stock);
    formData.set("seller", seller);
    formData.set("category", category);
    formData.set("price", price);
    // images.forEach((image) => {
    //   formData.append("images", image);
    // });
  };

  return (
    <div>
      <Grid container mt={2}>
        <CssBaseline />
        <Meta title="Product Create" />
        <Sidebar />
        <main className={classes.content}>
          <Typography variant="h3" pb={4}>
            Create:
          </Typography>
          <Grid item xs={12} lg={8}>
            <FormControl fullWidth="true">
              <InputLabel htmlFor="name">Product Name</InputLabel>
              <Input
                id="name"
                aria-describedby="name-input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth="true">
              <TextField
                id="description"
                variant="standard"
                label="Description"
                rows="3"
                multiline="true"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth="true">
              <InputLabel htmlFor="stock">Stock</InputLabel>
              <Input
                id="stock"
                aria-describedby="name-input-field"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth="true">
              <InputLabel htmlFor="seller">Seller</InputLabel>
              <Input
                id="seller"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                aria-describedby="name-input-field"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth="true" className={classes.root}>
              <TextField
                id="category"
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                helperText="Please select your product category"
                variant="standard"
              >
                {categories.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <FormControl fullWidth="true">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={handleUploadImage}
                >
                  Upload
                </Button>
              </label>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8} mt={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth="true"
              onClick={handleCreateProduct}
            >
              Create product
            </Button>
          </Grid>
        </main>
      </Grid>
    </div>
  );
}

export default ProductCreate;
