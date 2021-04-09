import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../layout/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { adminAllProductsRequest, deleteProductRequest, clearErrors } from "../../actions/productActions";
import clsx from "clsx";
let handleDeleteProduct;
const columns = [
  {
    field: "id",
    headerName: "ProductId",
    width: 250,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 160,
  },
  {
    field: "description",
    headerName: "Description",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 500,
  },
  {
    field: "stock",
    headerName: "Stock",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 100,
    cellClassName: (params) =>
      clsx("super-app", {
        positive: params.value > 1,
        negative: params.value < 1,
      }),
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 130,
  },

  {
    field: "edit",
    headerName: "Edit",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 120,
    renderCell: (params) => (
      <Link to={`${params.value}`}>
        <Button variant="contained" color="primary" size="small">
         Edit
        </Button>
      </Link>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 120,
    renderCell: (params) => (
        <Button variant="contained" onClick={() => handleDeleteProduct(params.value)} color="secondary" size="small">
         Delete 
        </Button>
    ),
  },
];

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--cell": {
    },
    "& .super-app.positive": {
      color: "rgba(62, 117, 89, 0.8)",
      fontWeight: "600",
    },
    "& .super-app.negative": {
      color: "#C00214",
      fontWeight: "600",
    },
    "& .super-app-theme--header": {
      fontSize: "16px",
    },
  },
  content: {
    flexGrow: 1,
    padding: "20px 40px",
  },
});

const drawerWidth = 260;

export default function ProductsList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { products, loading, error, message } = useSelector((state) => state.products);
  let rows = [];
  products &&
    products.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category,
        edit: `/admin/products/${product._id}`,
        delete:product._id,
      });
    });
     handleDeleteProduct = (id) => {
      dispatch(deleteProductRequest(id));
    }

  React.useEffect(() => {
    dispatch(adminAllProductsRequest());
    if(message) toast.success(message);
    dispatch(clearErrors())
  }, [dispatch, toast, message]);

  return (
    <div >
      <Grid container mt={2}>
        <CssBaseline />
        <Sidebar />
        <main className={classes.content}>
          <Typography variant="h3" pb={4}>
            Products:
          </Typography>
          <Grid item xs={12}>
            <div
              style={{ height: 570, width: "100%"}}
              className={classes.root}
            >
              <DataGrid
                rows={rows}
                loading={loading}
                columns={columns}
                pageSize={8}
                checkboxSelection
              />
            </div>
          </Grid>
        </main>
      </Grid>
    </div>
  );
}
