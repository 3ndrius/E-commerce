import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { showOrderRequest, clearErrors } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const columns = [
  {
    field: "id",
    headerName: "Order ID",
    width: 300,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "numOfItems",
    headerName: "NumofItems",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 160,
  },
  {
    field: "amount",
    headerName: "Amount",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 150,
    cellClassName: (params) =>
      clsx("super-app", {
        positive: params.value.includes("Delivered"),
        negative: params.value.includes("Processing"),
      }),
  },
  {
    field: "taxPrice",
    headerName: "Tax",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 140,
  },
  {
    field: "shippingPrice",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    headerName: "Shipping",
    width: 130,
  },

  {
    field: "action",
    headerName: "Action",
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-theme--cell",
    width: 150,
    renderCell: (params) => (
      <Link to={`${params.value}`}>
        <Button variant="contained" color="primary" size="small">
          Open
        </Button>
      </Link>
    ),
  },
];

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--cell": {
      fontSize: "16px",
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
      fontSize: "18px",
    },
  },
});

export default function ShowOrders() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { orders, loading, error } = useSelector((state) => state.myOrder);

  let rows = [];
  orders.forEach((order) => {
    rows.push({
      id: order._id,
      numOfItems: order.orderItems?.length,
      amount: `$${order.totalPrice}`,
      status: order.orderStatus,
      taxPrice: `$${order.taxPrice}`,
      shippingPrice: order.shippingPrice,
      action: `/order/${order._id}`,
    });
  });

  React.useEffect(() => {
    dispatch(showOrderRequest());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" mt={6}>
        My orders:
      </Typography>
      <div
        style={{ height: 460, width: "100%", marginTop: "20px" }}
        className={classes.root}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Link to="/profile">
        <Button variant="contained" my={4} color="primary">
          Back to profile
        </Button>
      </Link>
    </Container>
  );
}
