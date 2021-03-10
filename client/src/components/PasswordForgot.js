import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { requestPasswordForgot, clearErrors } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PasswordForgot = ({ history }) => {
  const { error, message, loading } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (message) toast.success(message)
      

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, toast, dispatch, message]);

  const handlePasswordForgot = (e) => {
    e.preventDefault();
    dispatch(requestPasswordForgot(email));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Forgot Password
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            width: "100%", // Fix IE11 issue.
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handlePasswordForgot}
            fullWidth
            variant="contained"
            disabled={loading ? true : false}
            sx={{ mt: 3, mb: 2 }}
          >
            Restore
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default PasswordForgot;
